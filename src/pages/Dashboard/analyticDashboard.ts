// ------------------------- Mandatory imports for all pages ------------------------- //
 
// Component Imports
import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

// Local Storage Imports
import { Storage } from '@ionic/storage';

// services for SQLite FEB 2018
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';  

// Import for Translation Service
import { TranslationService } from './../../assets/services/translationService';

// ------------------------- Page Specific Imports ------------------------- //

// Accessible DOM Imports
import { ElementRef, ViewChild } from '@angular/core';

// Alert Imports
import { AlertController } from 'ionic-angular';

// Page Imports
import { Login } from '../home/Login/login/login';
import { DailyEntry } from '../WellnessTracker/DailyEntry/dailyEntry';

// JS Imports
import * as moment from 'moment';
import 'moment/locale/fr';

import * as Chart from 'chart.js';

import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'page-analyticDashboard',
    templateUrl: 'analyticDashboard.html'
})

export class Dashboard {
	
    // ------------------------- Mandatory variables for all pages ------------------------- //

    // Stores our DB results for scores
    private userRecords: any = [];

    // Persistent reference to our DB
    private openDatabase: SQLiteObject;

    // The actual content of the page, fetched via translationService.ts
    private pageElements: any;

    // Controls whether our view is loaded based off of if pageElements has been loaded
    private pageElementsLoaded: boolean = false;
	
	private languageFlag: string = "en";
	
	private key: String = "A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQ";

    // ------------------------- Page Specific Variables ------------------------- //

    // Fetch the canvas element that we're storing our chart in
	@ViewChild('mainChart') pageElement: ElementRef;
	
    // 2D context for graph
    public context: CanvasRenderingContext2D;

    // Public declaration for our chart
    private mainChart: any;

    // Mood = 0, sleep = 1, diet = 2
    private graphColours: any = ["#FF9800", "#01579B", "#4CAF50"];

    private userID: string;
	
	// Controls pre-chart generated content, hides it if true
	private chartGenerated: boolean = false;
	
    // Initializing references to our view
    moodCheckbox: boolean;
    dietCheckbox: boolean;
    sleepCheckbox: boolean;
    fromDate: Date;
    toDate: Date;

    constructor(public navCtrl: NavController, private sqlite: SQLite, public alertCtrl: AlertController, private storage: Storage, private translationService: TranslationService) { }
	
	ionViewWillEnter() {
		this.authenticate();
        this.configuration();	
    }

    // Grabs login flag from local storage, if null, redirect to login page
    authenticate() {
        this.storage.get("userID").then((value) => {
            if(value == null) {
                this.navCtrl.setRoot(Login);
            }
            this.userID = value;
        });
    }

    configuration() {
        // Fetch the content from our language translation service
        this.storage.get("languageFlag").then((value) => {
            if(value != null) {
				
				if(value == "en") {
					moment.locale("en");
				} else if(value == "fr") {
					moment.locale("fr");
				}
				
                this.pageElements = this.translationService.load("analyticDashboard.html", value);
                this.pageElementsLoaded = true;
				
				this.languageFlag = value;
                
                // Initialize our DB
                this.initDB();
            } else {
                console.log("Failed to find language flag");
            }
        });		
    }
	
	addData() {
        this.navCtrl.push(DailyEntry);
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

    // Checks if input is valid, returns true if input is valid, shows alerts and returns false if not
    validateInput() {

        // Checks to see if a single checkbox has been checked, if not, show alert, then return false
        if(!this.moodCheckbox && !this.dietCheckbox && !this.sleepCheckbox) {
			if(this.pageElementsLoaded) {
				this.showAlert(this.pageElements.whoopsText, this.pageElements.scoreCheckboxError, this.pageElements.rightonText);
			}
			return false;
        }

        // Checks to see if both dates are valid, if not, show alert, and return false
        if(this.fromDate == null || this.toDate == null) {
			this.showAlert(this.pageElements.whoopsText, this.pageElements.dateSelectionError, this.pageElements.forsureText);
			return false;
        }

        // All checks came back false, so the input is valid, return true
        return true;
    }
	
	decrypt(value) {
		return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	encrypt(value) {
		return CryptoJS.AES.encrypt(value.toString(), this.key).toString();
	}
	
	changeLanguage() {
		
		if(this.languageFlag == "en") {
			this.languageFlag = "fr";
		} else if(this.languageFlag == "fr") {
			this.languageFlag = "en";
		}
		
        this.storage.set("languageFlag", this.languageFlag).then((value) => {
            //this.events.publish('languageFlag:changed', this.languageFlag);
            this.pageElements = this.translationService.load("analyticDashboard.html", this.languageFlag);
        });	
    }

    // Generates a chart based off data from view
    generate(fromDate, toDate) {

        // Checks if the input is valid, if not, don't run
        if(this.validateInput()) {
			
			this.chartGenerated = true;
			
            var selectStatement = "";
            var whereClause = "";
            var query = "";

            // ----------- Building SQL Query ----------- //

            // We need to fill variables depending on whether they were selected or not (We avoid string building doing it this way)
            var moodScore = "";
            var dietScore = "";
            var sleepScore = "";

            if(this.moodCheckbox) {
				moodScore = "moodScore, ";
            }
			
            if(this.dietCheckbox) {
				dietScore = "dietScore, ";
            }

            if(this.sleepCheckbox) {
				sleepScore = "sleepScore, ";
            }

            // ----------- Building/Formatting Dates ----------- //

            // Formatting dates
            fromDate = moment(fromDate).set({'hour': 0, 'minute': 0}).format('YYYY-MM-DD HH:mm:ss');
            toDate = moment(toDate).set({'hour': 23, 'minute': 59}).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

			
            // Set the times to their min or max hour accordingly
           // var finalFromDate = new String(fromDate.slice(0, 10) + ' 00' + fromDate.slice(13, fromDate.length));
            //var finalToDate = new String(toDate.slice(0, 10) + ' 23' + toDate.slice(13, toDate.length));

            // Turn them into a string object so we can use them in our queries
            //fromDate = finalFromDate.toString();
            //toDate = finalToDate.toString();
			
			console.log("fromDate: " + fromDate);
			console.log("toDate: " + toDate);

            // ----------- Combining above data to form queries ----------- //

            // Generating the select and where clause based off data above
            selectStatement = moodScore + dietScore + sleepScore + "date";		
            whereClause = "WHERE date BETWEEN DATE('" + fromDate + "') AND DATE('" + toDate + "') ORDER BY date ASC";

            // Combine the two statements and wrap them with SQL syntax
            query = "SELECT " + selectStatement + " FROM wellness " + whereClause;

            // ----------- Query DB and build graph objects ----------- //

            this.openDatabase.executeSql(query, {} as any).then(res => {

                // Our Graph Data
                var graphDataSets = [];

                // Date Labels
                var labelsArray = [];

                // Stores all data in their respective arrays
                var moodScoreArray = [];
                var dietScoreArray = [];
                var sleepScoreArray = [];

				console.log("Res: " + res);

                // Loop through graph data gathered above, and seperate it into categories
                for(var i=0; i< res.rows.length; i++) {
					
					// Checks to see if the dates exist in the OLD format, if so, change them
                    if(res.rows.item(i).date.indexOf("T") == -1) {
                        console.log("res.rows.item[" + i + "].Date is in wrong format, fixing now");
                        res.rows.item(i).date = res.rows.item(i).date.substring(0, res.rows.item(i).date.indexOf(" ")) + "T" + res.rows.item(i).date.substring((res.rows.item(i).date.indexOf(" ")+1));
                    }

                    labelsArray[i] = moment(res.rows.item(i).date).format('h:mm a, MMM DD, YYYY');

                    if(this.moodCheckbox) {
						moodScoreArray[i] = this.decrypt(res.rows.item(i).moodScore);
                    }

                    if(this.dietCheckbox) {
						dietScoreArray[i] = this.decrypt(res.rows.item(i).dietScore);
                    }

                    if(this.sleepCheckbox) {
						sleepScoreArray[i] = this.decrypt(res.rows.item(i).sleepScore);
                    }
                }

				console.log("Labels Array: ")
				console.log(labelsArray);
				
                // If moodCheckbox was selected, build our mood line
                if(this.moodCheckbox) {

                    var moodCheckboxIndex = graphDataSets.length;

                    graphDataSets[graphDataSets.length] = { 
						data: moodScoreArray,
						label: "Mood",
						borderColor: this.graphColours[0],
						fill: false
                    }
                }

                // If dietCheckbox was selected, build our diet line
                if(this.dietCheckbox) {

                    var dietCheckboxIndex = graphDataSets.length;

                    graphDataSets[graphDataSets.length] = { 
						data: dietScoreArray,
						label: "Diet",
						borderColor: this.graphColours[2],
						fill: false
                    }
                }

                // If sleepCheckbox was selected, build our sleep quality line
                if(this.sleepCheckbox) {

                    var sleepCheckboxIndex = graphDataSets.length;

                    graphDataSets[graphDataSets.length] = { 
						data: sleepScoreArray,
						label: "Sleep",
						borderColor: this.graphColours[1],
						fill: false
                    }
                }

                // Add all the created lines to our collection
                var datasetsObject = [];				

                if(this.moodCheckbox) {
					datasetsObject[datasetsObject.length] = {label: graphDataSets[moodCheckboxIndex].label, data: graphDataSets[moodCheckboxIndex].data, borderColor: graphDataSets[moodCheckboxIndex].borderColor, fill: graphDataSets[moodCheckboxIndex].fill};
                }

                if(this.dietCheckbox) {
					datasetsObject[datasetsObject.length] = {label: graphDataSets[dietCheckboxIndex].label, data: graphDataSets[dietCheckboxIndex].data, borderColor: graphDataSets[dietCheckboxIndex].borderColor, fill: graphDataSets[dietCheckboxIndex].fill};
                }

                if(this.sleepCheckbox) {
					datasetsObject[datasetsObject.length] = {label: graphDataSets[sleepCheckboxIndex].label, data: graphDataSets[sleepCheckboxIndex].data, borderColor: graphDataSets[sleepCheckboxIndex].borderColor, fill: graphDataSets[sleepCheckboxIndex].fill};
                }

                // Fetch our 2D context for our graph, this is required when creating the graph
                this.context = ( <HTMLCanvasElement> this.pageElement.nativeElement).getContext('2d');
				
				console.log("datasetsObject:");
				console.log(datasetsObject);
				
                // Generate Chart
                var mainChart = new Chart(this.context, {

                    type: 'line',
                    data: {
                        labels: labelsArray,
                        datasets: datasetsObject
                    }, options: {
                        scaleShowValues: true,
                        responsive: true,
						maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
									beginAtZero: true,
									fontSize: 12
                                }
                            }],
                            xAxes: [{
                                ticks: {
									fontSize: 12
                                }
                            }]
                        }
                    }
                });
            }).catch(e => console.log(e));
        }
    }
	
    // Initializes our DB, and fetchs all user records storing them in userRecords[]
    initDB() {
        this.sqlite.create({
            name: this.userID + ".db",
            location: 'default'
        }).then((db: SQLiteObject) => {

            this.openDatabase = db;

            this.openDatabase.executeSql('CREATE TABLE IF NOT EXISTS wellness(rowid INTEGER PRIMARY KEY, userID TEXT, date TEXT, moodScore TEXT, dietScore TEXT, sleepScore TEXT)', {} as any)
            .then(res => console.log('Executed SQL'))
            .catch(e => console.log(e));

            this.openDatabase.executeSql('SELECT * FROM wellness ORDER BY rowid DESC', {} as any).then(res => {
				this.userRecords = [];
				for(var i=0; i<res.rows.length; i++) {
					this.userRecords.push({rowid:res.rows.item(i).rowid, date:res.rows.item(i).date, moodScore: this.decrypt(res.rows.item(i).moodScore), dietScore: this.decrypt(res.rows.item(i).dietScore), sleepScore: this.decrypt(res.rows.item(i).sleepScore)})
				}
            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }

    //POP a page off the stack
    goBack() {
        this.navCtrl.pop();
    }
}