// ------------------------- Major imports for all pages ------------------------- //

// Component Imports
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

// Local Storage Import
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

// SQLite3 Imports
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Import for Translation Service
import { TranslationService } from '../../assets/services/translationService';

// ------------------------- Page Imports ------------------------- //

import { WellnessTracker } from '../WellnessTracker/wellnesstracker';
import { Login } from './Login/login/login';
import { SignOut } from './Login/signout/signout';
import { DailyEntry } from '../WellnessTracker/DailyEntry/dailyEntry'; // home.html
import { CheckinLog } from '../WellnessTracker/CheckinLog/checkinLog'; // home.html
import { Resources } from '../Resources/resources'; // home.html


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
	
    wellnesstracker = WellnessTracker; 
    resources = Resources;
    dailyentry = DailyEntry;
    checkinlog = CheckinLog;
	signout = SignOut;

    // The actual content of the page, fetched via translationService.ts
    private pageElements: Object;
	
    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;   

    private userID: string;
	
	// Our Database Object
	private openDatabase: SQLiteObject;
	
	// Language Flag, defaults to English but overwritten on pageload
	private languageFlag: string = "en";

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private storage: Storage, private translationService: TranslationService, private sqlite: SQLite) {}
	
	// Method is ran whenever the app's view is changed to this page's view
	ionViewWillEnter() {
		this.authenticate();
        this.configuration();	
    }

	// Check to see if the user has logged in (If their userID exists or not)
    authenticate() {		
	
		// Fetch our login flag and check it's value, if it's null, the user is not logged in so redirect them to the login screen
        this.storage.get("userID").then((value) => {
            if(value == null) {
				this.navCtrl.setRoot(Login);
            }
		});
    }
    
	// Fetch the page's content and set the language flag
    configuration() {
		
        // Fetch the current language flag set in storage, once complete, call the translation service to load the correct page content in the chosen language 
		var languageFlag = this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				// Load the page's content
                this.pageElements = this.translationService.load("home.html", value);
				
				// Once the content has been loaded, set our page loaded flag to true
				this.pageElementsLoaded = true;
				
				this.languageFlag = value;
            } 
            else {
                console.log("No language flag set");
            }			
		});
    }
	
	// Displays a toast saying "Language changed to English/French", called by this.changeLanguage()
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
	
	// Called by clicking the change language globe in the top right corner, changes the current language of the page and fetches updated content
	changeLanguage() {
		
		if(this.languageFlag == "en") {
			this.languageFlag = "fr";
		} else if(this.languageFlag == "fr") {
			this.languageFlag = "en";
		}
		
        this.storage.set("languageFlag", this.languageFlag).then((value) => {
            this.pageElements = this.translationService.load("home.html", this.languageFlag);
			this.presentToast();
        });	
    }
}




















