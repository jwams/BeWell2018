import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Login } from '../../home/Login/login/login';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { Events } from 'ionic-angular';

// Import for Translation Service
import { TranslationService } from '../../../assets/services/translationService';
import { DailyEntry } from '../../WellnessTracker/DailyEntry/dailyEntry';

@Component({
    selector: 'page-resinfo',
    templateUrl: 'resinfo.html'
})
export class ResInfo {
	
	@ViewChild(Content) content: Content;
	
    public resImg;
    public resEmail;
//    public resTitle;
    
    // The actual content of the page, fetched via translationService.ts
    private pageElements: Object;
	
    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;

	private languageFlag: string = "en";

    private userID: string;
	
	private languageFlagValue: string;
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        private storage: Storage,
        private translationService: TranslationService,
		public toastCtrl: ToastController) 
    {}
	
	ionViewWillEnter() {
		this.authenticate();
        this.configuration();	
    }
	
	changeLanguage() {
		
		if(this.languageFlag == "en") {
			this.languageFlag = "fr";
		} else if(this.languageFlag == "fr") {
			this.languageFlag = "en";
		}
		
        this.storage.set("languageFlag", this.languageFlag).then((value) => {
            //this.events.publish('languageFlag:changed', this.languageFlag);
            this.pageElements = this.translationService.load(this.navParams.get('pageName'), this.languageFlag);
			this.presentToast();
        });	
    }
	
	presentToast() {
		
		let message = "";
		
		if(this.languageFlag == "en") {
			message = "Language changed to English";
		} else if(this.languageFlag == "fr") {
			message = "Langue changée au français";
		}
		
		const toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			cssClass: "toastClass",
			dismissOnPageChange: true
		});
		
		toast.present();
	}
    
    authenticate() {		
		// Fetch our login flag and check it's value, if it's null, the user is not logged in so redirect them to the login screen
		this.storage.get("userID").then((value) => {
				if(value == null) {
	//                this.navCtrl.setRoot(Login);
				}
				this.userID = value;
		});
    }
    
    configuration() {
		
        // Fetch the content from our language translation service
		var languageFlag = this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				this.languageFlagValue = value;
				this.pageElements = this.translationService.load(this.navParams.get('pageName'), value);		
				this.pageElementsLoaded = true;
				this.content.resize();
				console.log(this.pageElements);
				this.languageFlag = value;
			} 
			else {
				console.log("No language flag set");
			}			
		});
    }
	
	addData() {
		this.navCtrl.push(DailyEntry);
    }
	
	//POP a page off the menu stack
    goBack() {
        this.navCtrl.pop();
    }
    
}
