// ------------------------- Mandatory imports for all pages ------------------------- //

// Component Imports
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Alert Imports
import { AlertController } from 'ionic-angular';

// SQLite3 Imports
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

// Local Storage Imports
import { Storage } from '@ionic/storage';

// Import for Translation Service
import { TranslationService } from './../../../assets/services/translationService';

import * as CryptoJS from 'crypto-js';

// ------------------------- Page Specific Imports ------------------------- //
// Page Imports
import { Login } from '../../home/Login/login/login';
import { CheckinLog } from '../CheckinLog/checkinLog';

// Moment (Date framework) Import
import * as moment from 'moment';

//@IonicPage()
@Component({
    selector: 'page-dailyEntry',
    templateUrl: 'dailyEntry.html'
})
export class DailyEntry {
	
    // ------------------------- Mandatory variables for all pages ------------------------- //

    // The actual content of the page, fetched via translationService.ts
    private pageElements: Object;

    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;

    private userID: string;

    private openDatabase: SQLiteObject;
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";
	
	private submitFlag: boolean = true;
	
	// ------------------------- Page Specific Variables ------------------------- //
	
	data = { 
		dateTime: moment().format(), 
		date: moment().format(), 
		moodScore: 0, 
		dietScore: 0, 
		sleepScore: 0, 
		entryNote: ""
	};
	
	private totalScore: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private toast: Toast, private storage: Storage, private translationService: TranslationService, public alertCtrl: AlertController) {
        this.authenticate();
        this.configuration();
    }

    configuration() {

        var languageFlag = this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				if(value == "en") {
					moment().locale('en');
				} else if(value == "fr") {
					moment().locale('fr');
				}
                this.pageElements = this.translationService.load("dailyEntry.html", value);
                this.pageElementsLoaded = true;
                console.log("this.data.date: " + this.data.date);
                console.log("this.date.dateTime: " + this.data.dateTime);
                console.log(this.pageElements);
                this.initDB();
            } else {
                // Handle null language flag
            }
        });
    }
	
	greaterThan(x, y) {
		return x > y;
	}
	
	decrypt(value) {
		console.log("Decrypting: " + value);
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	encrypt(value) {
		console.log("Encrypting: " + value + " into: " +  CryptoJS.AES.encrypt(value.toString(), this.key).toString());
		return CryptoJS.AES.encrypt(value.toString(), this.key).toString();
	}

    authenticate() {
        this.storage.get("userID").then((value) => {
            if(value == null) {
                this.navCtrl.setRoot(Login);
            }
            this.userID = value;
        });	
    }

    updateScores(selectedValue: any) {
        this.totalScore = Math.floor((this.data.moodScore + this.data.sleepScore + this.data.dietScore)/3);
		this.canSubmit();
    }
    
	canSubmit() {
		console.log("Can submit HIT");
		if(this.greaterThan(this.data.moodScore, 0) && this.greaterThan(this.data.sleepScore, 0) && this.greaterThan(this.data.dietScore, 0)) {
			this.submitFlag = false;
		} else {
			this.submitFlag = true;
		}
		
		
	}

    initDB() {
        console.log("TJDE:", this.userID +".db" );
        this.sqlite.create({
            name: this.userID +".db",
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS wellness(rowid INTEGER PRIMARY KEY, userID TEXT, date TEXT, moodScore TEXT, dietScore TEXT, sleepScore TEXT)', {} as any)
            .then(res => {
                console.log('Executed Create Table Wellness Query');
                this.openDatabase = db;
            }).catch(e => console.log(e));
        })
    }

    saveData() {
        
        if(this.openDatabase != undefined) {
            try {
				var fullDate = this.data.date.substring(0, this.data.date.indexOf("T")) + "T" + this.data.dateTime.substring((this.data.dateTime.indexOf("T")+1));
				
				console.log("HIT1");
				console.log("UserID: " + this.userID);
				console.log("fullDate: " + fullDate);
				console.log("moodScore: " + this.encrypt(this.data.moodScore));
				console.log("dietScore: " + this.encrypt(this.data.dietScore));
				console.log("sleepScore: " + this.encrypt(this.data.sleepScore));
				
				this.openDatabase.executeSql('INSERT INTO wellness(userID, date, moodScore, dietScore, sleepScore) VALUES(?,?,?,?,?)',
				[
					this.userID, 
					fullDate, 
					this.encrypt(this.data.moodScore), 
					this.encrypt(this.data.dietScore), 
					this.encrypt(this.data.sleepScore)
				]).then(res => {this.navCtrl.pop()});
			} catch(e) {
				console.log("ERROR: " + e);
			}
		}
    }

    // Shows alert based on the title, subtitle, and button text supplied
    showAlert(titleText, subtitleText, buttonText) {
        console.log(this.navCtrl);
        let alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: [buttonText]
        });
        alert.present(alert);
    }

    //POP a page off the menu stack        
    goBack() {
        this.navCtrl.pop();
    }
}