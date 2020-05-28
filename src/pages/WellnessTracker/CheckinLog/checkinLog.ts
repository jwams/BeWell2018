// ------------------------- Mandatory imports for all pages ------------------------- //
// Component Imports
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

// Local Storage Import
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

// SQLite3 Imports
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';  //services for SQLite FEB 2018

// Import for Translation Service
import { TranslationService } from './../../../assets/services/translationService';

import * as CryptoJS from 'crypto-js';

import * as moment from 'moment';
import 'moment/locale/fr';

// ------------------------- Page Specific Imports ------------------------- //

// Page Imports
import { DailyEntry } from '../DailyEntry/dailyEntry';
import { CheckinLogInfo } from '../CheckinLogInfo/checkinLogInfo';
import { Login } from '../../home/Login/login/login';

@Component({
    selector: 'page-checkinLog',
    templateUrl: 'checkinLog.html'
})

export class CheckinLog {
	
    // ------------------------- Mandatory variables for all pages ------------------------- //

    // Stores our SQLite3 table data
    private userRecords: any = [];
	private showHideArray: any;

    // Our persistent connection to our DB which is set in initDB()
    private openDatabase: SQLiteObject;

    // The actual content of the page, fetched via translationService.ts
    private pageElements: Object;

    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;
	private languageFlag: string = "en";
	
	private date: String = new Date("Fri Apr 3 15:48:21 2018 GMT").toISOString();
	
    private userID: string;
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";	

    // ------------------------- Page Specific Variables ------------------------- //
	

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private storage: Storage, private translationService: TranslationService) { }
	
    // Runs instead of the constructor because we need to handle when this page is popped to (When a page is popped to, the constructor won't run)
    ionViewWillEnter() {
		this.authenticate();
        this.configuration();	
    }

    authenticate() {

        // Fetch our login flag and check it's value, if it's null, the user is not logged in so redirect them to the login screen
        this.storage.get("userID").then((value) => {
            if(value == null) {
                this.navCtrl.setRoot(Login);
            }
            this.userID = value;
        });
    }
	
	formatDate(date) {
		console.log("date: " + date);
		return moment(date).format("MMMM DD, YYYY");
	}
	
	// String to Int
	parseNumber(string) {
		return Number(string);
	}
	
	// Returns the sum of moodScore + sleepScore + dietScore
	totalScore(moodScore, sleepScore, dietScore) {
		return this.parseNumber(moodScore) + this.parseNumber(sleepScore) + this.parseNumber(dietScore);
	}

    configuration() {
		
	    // Fetch the content from our language translation service
        var languageFlag = this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				if(value == "en") {
					moment.locale("en");
					this.languageFlag = "en";
				} else if(value == "fr") {
					moment.locale("fr");
					this.languageFlag = "fr";
				}
				
                this.initDB();
				this.pageElements = this.translationService.load("checkinLog.html", value);
                this.pageElementsLoaded = true;
				console.log(this.pageElements);
            } else {
                console.log("No language flag set");
            }			
        });
		
		
    }
	
	decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	encrypt(value) {
		return CryptoJS.AES.encrypt(value, this.key).toString();
	}
	
	// Shows/Hides the element selected, this function also hides all the rest of the open logs
	showHideElement(index) {
		// Save the state of the selected log, i.e shown or hidden
		var elementState = this.showHideArray[index];
		
		// Set all logs to hide, we do this so only one log can be open at a time
		for(var i = 0; i < this.showHideArray.length; i++) this.showHideArray[i] = false;
		
		// Take the state we saved earlier, and reverse it
		this.showHideArray[index] = !elementState;
	}

    initDB() {
        this.sqlite.create({
                name: this.userID + ".db",
                location: 'default'
        }).then((db: SQLiteObject) => {

            db.executeSql('CREATE TABLE IF NOT EXISTS wellness(rowid INTEGER PRIMARY KEY, userID TEXT, date TEXT, moodScore TEXT, dietScore TEXT, sleepScore TEXT)', {} as any)
                .then(res => {
                        this.openDatabase = db;
                        console.log('Executed SQL');
                        this.getData();
                }).catch(e => console.log(e));			
        }).catch(e => console.log(e));
    }

    getData() {
        this.openDatabase.executeSql('SELECT * FROM wellness ORDER BY date DESC', {} as any).then(res => {
            this.userRecords = [];
            for(var i=0; i<res.rows.length; i++) {
				this.userRecords.push({rowid:res.rows.item(i).rowid, date:res.rows.item(i).date, moodScore: this.decrypt(res.rows.item(i).moodScore), dietScore: this.decrypt(res.rows.item(i).dietScore), sleepScore: this.decrypt(res.rows.item(i).sleepScore)})
            }
			console.log("this.userRecords.length: " + this.userRecords.length);
			this.showHideArray = Array(this.userRecords.length).fill(false);
			
            console.log("User Records:");
            console.log(this.userRecords);
        }).catch(e => console.log(e));
    }

    addData() {
        this.navCtrl.push(DailyEntry);
    }

    //POP a page off the menu stack
    goBack() {
        this.navCtrl.pop();
    }
	
	changeLanguage() {
		
		if(this.languageFlag == "en") {
			this.languageFlag = "fr";
		} else if(this.languageFlag == "fr") {
			this.languageFlag = "en";
		}
		
        this.storage.set("languageFlag", this.languageFlag).then((value) => {
            //this.events.publish('languageFlag:changed', this.languageFlag);
            this.pageElements = this.translationService.load("checkinLog.html", this.languageFlag);
        });	
    }
}

