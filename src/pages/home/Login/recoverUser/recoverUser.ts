// ------------------------- Mandatory imports for all pages ------------------------- //

// Import for localStorage
import { Storage } from '@ionic/storage';

// Import for Translation Service
import { TranslationService } from './../../../../assets/services/translationService';

// Import for SQLite3
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Component Imports
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as PH from "password-hash";

import * as CryptoJS from 'crypto-js';

// ------------------------- Page Specific Imports ------------------------- //

// Alert Imports
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-recoverUser',
    templateUrl: 'recoverUser.html'
})

export class RecoverUser {
	
    // ------------------------- Mandatory variables for all pages ------------------------- //

    // The actual content of the page, fetched via translationService.ts
    private pageElements: any;

    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;

    // Stores our SQLite3 table data
    private userRecords: any = [];

    // Our persistent connection to our DB which is set in initDB()
    private openDatabase: SQLiteObject;
	
	private languageFlag: string = "en";

    // ------------------------- Page Specific Variables ------------------------- //

    // Our references to our view
    private firstName: String;
    private securityQuestion: String;
    private securityAnswer: String;
    private pin: String = "";
    private userFoundID: String;
    private hashedPassword: any;

    // Our phase and input validation flags
    private phase1: boolean;
    private phase2: boolean;
    private phase3: boolean;
	
    private incorrectInput: boolean;
    private inputNotFound: boolean;
    private invalidPin: boolean;
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";
	
    constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage, private translationService: TranslationService, public alertCtrl: AlertController) {}
	
	ionViewWillEnter() {
        this.configuration();
    }
	
    configuration() {

        // Fetch the current language flag set in storage, once complete, call the translation service to load the correct page content in the chosen language 
		this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				// Load the page's content
                this.pageElements = this.translationService.load("recoverUser.html", value);
				
				// Once the content has been loaded, set our page loaded flag to true
				this.pageElementsLoaded = true;
				
				this.languageFlag = value;
            } 
            else {
                console.log("No language flag set");
            }			
		});

        // Set our initial flags
        this.phase1 = true;
        this.phase2 = false;
        this.phase3 = false;

        // Initialize our input validation flags
        this.incorrectInput = false;
        this.inputNotFound = false;
        this.invalidPin = false;

        // Initialize our DB
        this.initDB();
    }
	
	// Returns the decrypted version of value: any
	decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	// Returns the encrypted string version of value: any
	encrypt(value) {
		return CryptoJS.AES.encrypt(value.toString(), this.key).toString();
	}

    // Phase 1: Grab first name and check to see if it exists in our DB
    submitPhase1() {

        var nameFound = false;

        for(var i = 0; i < this.userRecords.length; i++) {
			
			// If we found a name
            if(this.firstName == this.userRecords[i].firstName) {
                this.phase1 = false;
                this.phase2 = true;
				
                nameFound = true;
				
                this.userFoundID = this.userRecords[i].rowid;
                this.securityQuestion = this.userRecords[i].securityQuestion;
            }
        }

        if(!nameFound) {
            this.showAlert(this.pageElements.nameNotFoundText, this.pageElements.cantFindNameText, this.pageElements.tryAgainText);
        }
    }

    // Phase 2: User has been found, now ask them their security question
    submitPhase2() {
        var answerFound = false;

        for(var i = 0; i < this.userRecords.length; i++) {
            if(this.securityAnswer == this.userRecords[i].securityAnswer) {
                this.phase2 = false;
                this.phase3 = true;
                answerFound = true;
            }
        }

        if(!answerFound) {
            this.showAlert(this.pageElements.incorrectAnswerText, this.pageElements.wrongAnswerText, this.pageElements.tryAgainText);
        }
    }

    // Phase 3: User got the security question right, allow them to enter a new pin, once entered, update the user in the DB
    submitPhase3() {
        if(this.pin.length < 4 || this.pin.length > 50) {
            this.showAlert(this.pageElements.invalidPinText, this.pageElements.invalidPinLengthText, this.pageElements.alrightText);
        } else {
            this.openDatabase.executeSql('UPDATE users SET pin = ? WHERE rowid= ?', [this.encrypt(this.pin), this.userFoundID]).then(res => {
                this.navCtrl.pop();
            }).catch(e => console.log(e));
        }
    }

    // Initializes our DB, and fetchs all user records storing them in userRecords[]
    initDB() {
        this.sqlite.create({
            name: 'users_CSC.db',
            location: 'default'
        }).then((db: SQLiteObject) => {

            this.openDatabase = db;

            db.executeSql('CREATE TABLE IF NOT EXISTS users(rowid INTEGER PRIMARY KEY, firstName TEXT, pin TEXT, securityQuestion TEXT, securityAnswer TEXT)', {} as any)
            .then(res => console.log('Executed SQL'))
            .catch(e => console.log(e));

            db.executeSql('SELECT * FROM users ORDER BY rowid DESC', {} as any).then(res => {
                this.userRecords = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.userRecords.push({rowid:res.rows.item(i).rowid, firstName:this.decrypt(res.rows.item(i).firstName), pin:this.decrypt(res.rows.item(i).pin), securityQuestion:this.decrypt(res.rows.item(i).securityQuestion), securityAnswer:this.decrypt(res.rows.item(i).securityAnswer)})
                }
                console.log("User Records:");
                console.log(this.userRecords);
            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
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
}
