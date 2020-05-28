// ------------------------- Major imports for all pages ------------------------- //

// Component Imports
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Import for localStorage
import { Storage } from '@ionic/storage';

// Alert Imports
import { AlertController } from 'ionic-angular';

// Import for SQLite3
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Import for Translation Service
import { TranslationService } from './../../../../assets/services/translationService';

import * as PH from "password-hash";

import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'page-newUser',
    templateUrl: 'newUser.html'
})

export class NewUser {
    
    // Our persistent connection to our DB which is set in initDB();
    private openDatabase: SQLiteObject;

    // Our references to our view
    private firstName: String;
    private pin: String;
    private securityQuestion: String;
    private securityAnswer: String;

    // Our user input validation flags
    private firstNameFound: boolean;
    private invalidName: boolean;
    private invalidPin: boolean;
    private invalidSecurityQuestion: boolean;
    private invalidSecurityAnswer: boolean;

    // Stores our SQLite3 table data
    private userRecords: any = [];
	
    // The actual content of the page, fetched via translationService.ts
    private pageElements: any;

    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;
	
	private languageFlag: string = "en";
    
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";
	
	private userID: String;
	
    constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage, private translationService: TranslationService, public alertCtrl: AlertController) {
        
		// Initialize our view variables
        this.firstName = "";
        this.pin = "";
        this.securityQuestion = "";
        this.securityAnswer = "";

        // Initialize our input validation flags
        this.firstNameFound = false;
        this.invalidPin= false;
        this.invalidSecurityQuestion = false;
        this.invalidSecurityAnswer = false;

        // Initialize our DB
        this.initDB();
    }
	
	configuration() {
		
        // Fetch the current language flag set in storage, once complete, call the translation service to load the correct page content in the chosen language 
		this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				// Load the page's content
                this.pageElements = this.translationService.load("newUser.html", value);
				
				// Once the content has been loaded, set our page loaded flag to true
				this.pageElementsLoaded = true;
				
				this.languageFlag = value;
            } 
            else {
                console.log("No language flag set");
            }			
		});
    }
	
	// Method is ran whenever the app's view is changed to this page's view
	ionViewWillEnter() {
		this.configuration();	
    }

	// Returns the decrypted version of value: any
	decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}

	// Returns the encrypted string version of value: any
	encrypt(value) {
		return CryptoJS.AES.encrypt(value.toString(), this.key).toString();
	}

	// Called when the user clicks "Create User", carries out input validation and then finally the DB entry
    createUser() {

        // Tracks whether an alert as been shown yet, if one has, and there are other incorrect fields, it won't spam the user with every alert at once
        var alertShown = false;

        // Reset our input validation flags
        this.firstNameFound = false;
        this.invalidName = false;
        this.invalidPin = false;
        this.invalidSecurityQuestion = false;
        this.invalidSecurityAnswer = false;

        // Check if the first name is blank, if it is, set the flag
        if(this.firstName == "" && !alertShown) {
            alertShown = true;
            this.invalidName = true;
            this.showAlert(this.pageElements.invalidLogin, this.pageElements.invalidNameText, this.pageElements.alrightText);
            
        }

        // Check to see if that firstName is already used, if so, set the flag
        if(!alertShown) {
            for(var i = 0; i < this.userRecords.length; i++) {
                if(this.firstName == this.userRecords[i].firstName) {
                    alertShown = true;
                    this.firstNameFound = true;
                    this.showAlert(this.pageElements.invalidNameText, this.pageElements.firstNameFoundText, this.pageElements.alrightText);
                }
            }
        }

        // Check to see if the pin provided is between 4 and 50 characters, if not, set the flag
        if((this.pin.length < 4 || this.pin.length > 50) && !alertShown) {
            alertShown = true;
            this.invalidPin = true;
            this.showAlert(this.pageElements.invalidPinText, this.pageElements.invalidPinLengthText, this.pageElements.soundsGoodText);
        }                

        // Check to see if the security question is blank, if so, set the flag
        if(this.securityQuestion == "" && !alertShown) {
            alertShown = true;
            this.invalidSecurityQuestion = true;
            this.showAlert(this.pageElements.invalidSecurityQuestion, this.pageElements.invalidSecurityQuestionText, this.pageElements.soundsGoodText);
        }

        // Check to see if the security answer is blank, if so, set the flag
        if(this.securityAnswer == "" && !alertShown) {
            alertShown = true;
            this.invalidSecurityAnswer = true;
            this.showAlert(this.pageElements.invalidSecurityAnswer, this.pageElements.invalidSecurityAnswerText, this.pageElements.alrightText);
        }

        // If all flags are false, execute the insert query
        if(!this.invalidName && !this.firstNameFound && !this.invalidPin && !this.invalidSecurityQuestion && !this.invalidSecurityAnswer) {
			
			var encryptedFirstName = this.encrypt(this.firstName);
			var encryptedPin = this.encrypt(this.pin);
			var encryptedSecurityQuestion = this.encrypt(this.securityQuestion);
			var encryptedSecurityAnswer = this.encrypt(this.securityAnswer);

            this.openDatabase.executeSql('INSERT INTO users(firstName, pin, securityQuestion, securityAnswer) VALUES (?,?,?,?)', [encryptedFirstName, encryptedPin, encryptedSecurityQuestion, encryptedSecurityAnswer])
                .then(res => {
                    console.log("User added successfully");

                    // Redirect back to the only possible page call, login.html
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
				console.log("Test123: " + res.rows.length);
				this.userID = (res.rows.length + 1).toString();
            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }
        
    // Shows alert based on the title, subtitle, and button text supplied
    showAlert(titleText, subtitleText, buttonText) {
        let alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: [buttonText]
        });
        alert.present(alert);
    }
}
