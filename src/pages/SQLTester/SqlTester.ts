// ------------------------- Mandatory imports for all pages ------------------------- //
// Component Imports
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Local Storage Import
import { Storage } from '@ionic/storage';
import { Login } from '../home/Login/login/login';

// SQLite3 Imports
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';  //services for SQLite FEB 2018

import * as CryptoJS from 'crypto-js';


@Component({
    selector: 'page-SqlTester',
    templateUrl: 'SqlTester.html'
})

export class SqlTester {

    private userID: string;
    public selectStatement: string = "*";
	public fromStatement: string = "users";
	public whereStatement: string = "1=1";
	public dbName: string = "users_CSC";
	
	private userRecords: any = [];
	private userRecordsDecrypted: any = [];
	private openDatabase: SQLiteObject;
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";
	
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private sqlite: SQLite) {    
		this.authenticate();        
    }
    
	decryptVal(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	encryptVal(value) {
		return CryptoJS.AES.encrypt(value.toString(), this.key).toString();
	}
	
	runQuery() {
		
		var query = "SELECT " + this.selectStatement + " FROM " + this.fromStatement + " WHERE " + this.whereStatement + ";"
		this.userRecords = [];
		this.userRecordsDecrypted = [];
		
		console.log("Running query on " + this.openDatabase + ": " + query);
		
		this.openDatabase.executeSql(query, {} as any).then(res => {
			console.log("Query successfully ran, collecting results");
            this.userRecords = [];
            for(var i=0; i<res.rows.length; i++) {
				//console.log("res firstname: " + res.rows.item(i).firstName);
				//this.userRecords.push(res.rows.item(i));
				if(this.fromStatement == "users") {
					this.userRecords.push({rowid:res.rows.item(i).rowid, firstName:res.rows.item(i).firstName, pin:res.rows.item(i).pin, securityQuestion:res.rows.item(i).securityQuestion, securityAnswer:res.rows.item(i).securityAnswer})
				} else if(this.fromStatement == "wellness") {
					this.userRecords.push({rowid:res.rows.item(i).rowid, date:res.rows.item(i).date, moodScore: res.rows.item(i).moodScore, dietScore: res.rows.item(i).dietScore, sleepScore: res.rows.item(i).sleepScore})

				}
            }
			
			console.log("userRecords:");
			console.log(this.userRecords);
			
			for(var i=0; i<res.rows.length; i++) {
				this.userRecordsDecrypted.push(res.rows.item(i));
				if(this.fromStatement == "users") {
					this.userRecordsDecrypted[i].firstName = this.decryptVal(this.userRecordsDecrypted[i].firstName);
					this.userRecordsDecrypted[i].pin = this.decryptVal(this.userRecordsDecrypted[i].pin);
					this.userRecordsDecrypted[i].securityQuestion = this.decryptVal(this.userRecordsDecrypted[i].securityQuestion);
					this.userRecordsDecrypted[i].securityAnswer = this.decryptVal(this.userRecordsDecrypted[i].securityAnswer);
				} else if(this.fromStatement == "wellness") {
					this.userRecordsDecrypted[i].moodScore = this.decryptVal(this.userRecordsDecrypted[i].moodScore);
					this.userRecordsDecrypted[i].dietScore = this.decryptVal(this.userRecordsDecrypted[i].dietScore);
					this.userRecordsDecrypted[i].sleepScore = this.decryptVal(this.userRecordsDecrypted[i].sleepScore);
				}
            }
			
			console.log("userRecordsDecrypted:");
			console.log(this.userRecordsDecrypted);
        }).catch(e => console.log(e));
	}
	
    authenticate() {		
		// Fetch our login flag and check it's value, if it's null, the user is not logged in so redirect them to the login screen
		this.storage.get("userID").then((value) => {
            if(value == null) {
                this.navCtrl.setRoot(Login);
            }
            this.userID = value;
			console.log(this.userID);
		});
    }
	
	initDB() {
		var dbName = this.dbName;
		console.log("Opening database named: " + dbName + ".db");
		
        this.sqlite.create({
                name: dbName + ".db",
                location: 'default'
        }).then((db: SQLiteObject) => {
			this.openDatabase = db;			
			this.runQuery();
        }).catch(e => console.log("DB Error: " + e));
    }
}
