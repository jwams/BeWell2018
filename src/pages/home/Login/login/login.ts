// ------------------------- Mandatory imports for all pages ------------------------- //

// Local Storage Imports
import { Storage } from '@ionic/storage';

// Component Imports
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// SQLite3 Imports
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Import for Translation Service
import { TranslationService } from './../../../../assets/services/translationService';

import * as PH from "password-hash";

import * as CryptoJS from 'crypto-js';

// ------------------------- Page Specific Imports ------------------------- //

// Animation Imports
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

// Alert Controller Imports
import { AlertController, MenuController } from 'ionic-angular';

// ------------------------- Page Imports ------------------------- //

import { NewUser } from '../newUser/newUser'; // newUser.html
import { RecoverUser } from '../recoverUser/recoverUser'; // recoverUser.html
import { HomePage } from '../../home'; // home.html
import { LanguageSelection } from '../../../languageSelection/languageSelection';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
	animations: [
		trigger('fade', [
			state('visible', style({
				opacity: 1
			})),
			state('invisible', style({
				opacity: 0.1
			})),
			transition('visible <=> invisible', animate('200ms linear'))
		])
	]
})

export class Login {

	// ------------------------- Mandatory variables for most pages ------------------------- //

	// Stores our SQLite3 table data
	private userRecords: any = [];
	
	// Our persistent connection to our DB which is set in initDB()
	private openDatabase: SQLiteObject;
        	
	// The actual content of the page, fetched via translationService.ts
	private pageElements: any;
	
	// Controls whether our view is loaded based off of if pageElements has been loaded
	private pageElementsLoaded: boolean = false;
	
	// ------------------------- Page Specific Variables ------------------------- //
	
	// Our references to our view
	private pin: string;
	private firstName: string;
	private userID: string;
	
	private languageFlag: String = "en";
         
	private fadeState: String = 'visible';
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";
	
    constructor(public navCtrl: NavController, private sqlite: SQLite, public alertCtrl: AlertController, private storage: Storage, private menu: MenuController, private translationService: TranslationService) {}
	
	ionViewWillEnter() {
		this.authenticate();
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
	
	// Fetch the page's content and set the language flag
    configuration() {
		
        // Fetch the current language flag set in storage, once complete, call the translation service to load the correct page content in the chosen language 
		this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				// Load the page's content
                this.pageElements = this.translationService.load("login.html", value);
				
				// Once the content has been loaded, set our page loaded flag to true
				this.pageElementsLoaded = true;
				
				this.languageFlag = value;
            } 
            else {
                console.log("No language flag set");
            }			
		});
		
		this.initDB(false);
    }
	
	authenticate() {

		// Fetch our login flag and check it's value, if it exists, the user is already logged in
		this.storage.get("userID").then((value) => {
			if(value != null) {
				this.navCtrl.setRoot(HomePage);
			}
		});
	}

	// Redirect the user to newUser.html
	newUser() {
		this.navCtrl.push(NewUser);
	}
	
	// Redirect the user to recoverUser.html
	recoverUser() {
		this.navCtrl.push(RecoverUser);
	}
	
	// Our login method, call initDB() with the login flag
	login() {
		this.initDB(true);
	}
	
	languageSelection() {
		this.navCtrl.push(LanguageSelection);
	}
	
	// This method will show an alert based off the title, subtitle, and button text inputs
	showAlert(titleText, subtitleText, buttonText) {
		let alert = this.alertCtrl.create({
				title: titleText,
				subTitle: subtitleText,
				buttons: [buttonText]
		});
		alert.present(alert);
	}
	
	// Queries the DB for the provided pin, returns true if the account was found
	checkPin() {
		// Check our DB variable
		if(this.openDatabase != null) {

			// Check our records variable
			if(this.userRecords != null) {

				// Iterate through our records variable, if we have a match, take in the userID and return true
				for(var i = 0; i < this.userRecords.length; i++) {				
					if(this.userRecords[i].firstName == this.firstName) {
						console.log("Name match");
						if(this.pin == this.userRecords[i].pin){
							this.userID = this.userRecords[i].rowid;                                               
							return true;
						}
					}
				}
			} else {
				console.log("userRecords hasn't been set");
				return false;
			}
		} else {
			console.log("openDatabase hasn't been set");
			return false;
		}

		// No user found
		console.log("No user found");
		return false;
	}
	
	loginProcess() {
		
		// If found
		if(this.checkPin()) {
			console.log("User ID:" + this.userID);

			// Set our login flag in localStorage and then redirect to the home page
			this.storage.set("userID", this.userID);
			this.navCtrl.setRoot(HomePage);

		// If not found
		} else {
			this.showAlert(this.pageElements.invalidLogin, this.pageElements.invalidLoginDesc, this.pageElements.tryAgain);
		}
	}
	
	// Creates a connection to our DB, performs the login process if given the login flag
	initDB(loginFlag) {

		this.sqlite.create({
			name: 'users_CSC.db',
			location: 'default'
		}).then((db: SQLiteObject) => {

			// Take the open connection and save it to our openDatabase variable
			this.openDatabase = db;

			// If the table hasn't been created yet, create it
			db.executeSql('CREATE TABLE IF NOT EXISTS users(rowid INTEGER PRIMARY KEY, firstName TEXT, pin TEXT, securityQuestion TEXT, securityAnswer TEXT)', {} as any)
			.then(res => console.log('Executed SQL'))
			.catch(e => console.log(e));

			// Fetch all the users from our DB
			db.executeSql('SELECT * FROM users ORDER BY rowid DESC', {} as any)
				.then(res => {

					// Store them all in our userRecords variable
					this.userRecords = [];
					
					for(var i=0; i<res.rows.length; i++) {
						
						this.userRecords.push({rowid:res.rows.item(i).rowid, firstName:this.decrypt(res.rows.item(i).firstName), pin:this.decrypt(res.rows.item(i).pin), securityQuestion:this.decrypt(res.rows.item(i).securityQuestion), securityAnswer:this.decrypt(res.rows.item(i).securityAnswer)})
					}

					// If login flag is set, start our login checking process, we do it this way because our DB is retrieved as a promise. (Possibly explore better promise handling techniques in the future - JW) 
					if(loginFlag) {
						this.loginProcess();
					}

			}).catch(e => console.log(e));
		}).catch(e => console.log(e));
	}
	
	toggleFade() {
		this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';   
	}
}
