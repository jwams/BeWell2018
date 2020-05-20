// Base Imports
import { NavController } from 'ionic-angular';

// Import for localStorage
import { Storage } from '@ionic/storage';

// Import for SQLite3
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export class TranslationService {

    constructor() {
		console.log("Translation Service Loaded");
    }
	
    load(page, languageFlag) {
		
        console.log("Page: " + page);
		console.log("languageFlag2: " + languageFlag);
		
		if(languageFlag == "en") {
				
			switch(page) {

				case "app.component.ts": {
					return {
						settings: "Settings",
						language: "EN/FR",
						help: "Help",
						logout: "Log out"
					}
				}
				
				case "login.html": {
					return {
						firstNameText: "First Name",
						pinText: "Pin",
						createUserText: "Create User",
						loginText: "Login",
						forgotPinText: "Forgot Pin",
						firstNameInput: "First Name Input",
						pinInput: "Pin Input"
					}
				}
						
				case "newUser.html": {
					return {
						newUserText: "New User",
						firstNameText: "First Name",
						pinText: "Pin",
						pinRestrictionText: "4-50 Character Pin",
						securityQuestionText: "Security Question",
						securityAnswerText: "Security Answer",
						createUserText: "Create User!",
						firstNameFoundText: "That first name is already taken!",
						invalidNameText: "Your first name cannot be blank",
						invalidPinLengthText: "Your pin has to be 4-6 characters",
						invalidSecurityQuestionText: "Your security question cannot be blank!",
						invalidSecurityAnswerText: "Your security answer cannot be blank!"
					}
				}
					
				case "recoverUser.html": {
					return {
						recoverUserText: "Recover User",
						cantFindNameText: "We couldn't find that name!",
						nameOfAccountText: "What is the name of the account you're trying to recover?",
						firstNameText: "First Name",
						findNameText: "Find Name",
						wrongAnswerText: "That isn't the answer!",
						answerToQuestionText: "What is the answer to the following security question?",
						securityAnswerText: "Security Answer",
						submitAnswerText: "Submit Answer",
						invalidPinText: "Your pin needs to be between 4 and 50 characters!",
						enterNewPinText: "Please enter your new pin",
						characterLengthText: "Minimum 4 Character Pin", //**
						setNewPinText: "Set new pin"
					}
				}

				case "wellnesstracker.html": {
					return {
						wellnessTrackerTitleText: "Wellness Tracker",
						buttonText1: "Daily Log",
						buttonText2: "Graph",
					}
				}
											
				case "home.html": {
					return {
						homeTitleText: "Dashboard",
						pageToolText1: "Try Our Tools!",
						buttonText1: "Daily Check-In",
						buttonText2: "Wellness Tracker",
						buttonText3: "Log out",
						buttonText4: "Resources"
					}
				}
				
				case "dailyEntry.html": {
					return {
						dailyEntryText: "Daily Entry",
						moodText: "Mood",
						dietText: "Diet",
						sleepText: "Sleep",
						stressText: "Stress",
						dateText: "Date",
						timeText: "Time",
						descriptionText: "Description",
						saveDataText: "Save Data"	
					}
				}
								
				case "checkinLog.html": {
					return {
						checkinLogText: "Check-in Log",
						moodText: "Mood",
						dietText: "Diet",
						sleepText: "Sleep",
						stressText: "Stress",
						wellnessScoreText: "Score",
						helpMeText: "Help Me!"
					}
				}
						
				case "analyticDashboard.html": {
					return {
						dashboardText: "Dashboard",
						fromDateText: "From Date",
						toDateText: "To Date",
						moodText: "Mood",
						dietText: "Diet",
						sleepText: "Sleep",
						stressText: "Stress",
						generateText: "Generate Graph",
						chartText: "Chart"
					}
				}
						


				case "resources.html": {
					return {
						resourceTitleText: "Resources",
						resPageText: "Choose the resource list that applies to you",
						buttonText1: "Are you in a crisis?",
						buttonText1AriaLabel: "Employee Assistance Services button",
						buttonText2: "Need counselling?",
						buttonText2AriaLabel: "Need counselling button",
						buttonText3: "Are you being harassed?",
						buttonText3AriaLabel: "Are you being harassed button",
						buttonText4: "Involved in a traumatic event?",
						buttonText4AriaLabel: "Involved in a traumatic event button",
						buttonText5: "Dealing with conflict?",
						buttonText5AriaLabel: "Dealing with conflict button",
						buttonText6: "Are you being threatened?",
						buttonText6AriaLabel: "Are you being threatened button",
						buttonText7: "Returning to work?",
						buttonText7AriaLabel: "Returning to work button",
						buttonText8: "Issues with attendance?",
						buttonText8AriaLabel: "Issues with attendance button",
						buttonText9: "Require accommodation?",
						buttonText9AriaLabel: "Require accommodation button",
						buttonText10: "Are you in a crisis?",
						buttonText10AriaLabel: "Are you in a crisis button",
						buttonText11: "LifeSpeak",
						buttonText11AriaLabel: "LifeSpeak button"
					}
				}
						
				case "resinfo.html": {
					return {
						resTitle: "Test Resources",
						resParagraph1Text: "Stuff here",
					  
					}
				}


				case "employee.html": {
					return {
						resourceTitleText: "Employee Resources",
						resPageText: "Choose the resource list that applies.",
						buttonText1Desc: "These are programs created to assist employees in achieving workplace happiness and wellbeing.",
						buttonText1: "Assistance Programs",
						buttonText2Desc: "After you have become ill or injured, you may need time off to recover. Here is what you need to know about taking leave and compensation.",
						buttonText2: "Leave Programs",
						buttonText3Desc: "Other helpful contact resources that maybe useful for you.",
						buttonText3: "Helpful Resources",
						buttonText10: "Sun Life",
						sunlink: "https://www.sunlife.ca/ca/Insurance/Life+insurance?vgnLocale=en_CA"
					}
				}

				case "employeeFamily.html": {
					return {
						resourceTitleText: "Employee Family",
						resPageText: "Choose the resource list that applies.",
						buttonText1: "Crisis Hotline",
						buttonText2: "Employee Assitance Program",
						buttonText3: "Mental Health Service",
						buttonText4: "CSC Family Support Number"
					}
				}
										
				case "public.html": {
					return {
						resourceTitleText: "Public",
						resPageText: "Choose the resource list that applies.",
						buttonText1: "Crisis Hotline",
						buttonText2: "CAN Mental Health Association",
						buttonText3: "Critical Incident Stress Management",
						buttonText4: "HC Mental Health Services"
					}
				}   
																										
				case "EmployeeProtectionProtocol": {
					return {
						title: "Are you being threatened?",
						callnowText: "Call now",
						mainParagraph: "The Employee Protection Protocol (EPP) can help keep you and your family safe from threats, criminal harassment and intimidation. It is not uncommon to encounter difficult behaviour when dealing with offenders. You may experience different degrees of such bahviour depending on what you do and where you work. All threats are not equal. If you feel the situation is not 'normal' you should report it.",
						mainParagraphAriaLabel: "Employee Protection Protocol (EPP) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "What to do when threatened:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "Take immediate action if you perceive that you are in imminent or serious danger",
						bulletPoint1AriaLabel: "First Bullet Point",
						bulletPoint2: "Inside the workplace you should report the situation to your manager right away. If something happens outside of normal working hours, follow established procedures for your site to start the EPP process. For example:",
						bulletPoint2AriaLabel: "Second Bullet Point",
						bulletPoint2SubPoint1: "At the institutions, contact the designated duty officer for your facility",
						bulletPoint2SubPoint1AriaLabel: "Bullet two sub point one",
						bulletPoint2SubPoint2: "In the community, contact the National Monitoring Centre: 1-877-860-0617",
						
						bulletPoint2SubPoint2AriaLabel: "Bullet two sub point two",
						bulletPoint2SubPoint3: "At NHQ, contact the NHQ security number: 613-992-1486",
						bulletPoint2SubPoint3AriaLabel: "Bullet two sub point three",
						
						bulletPoint3: "Outside the workplace you should distance yourself from the threat. Contact the police immediately. Then report the situation to your manager as soon as possible.",
						bulletPoint3AriaLabel: "Third Bullet Point",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "Fourth Bullet Point",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "Fifth Bullet Point",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact ???",
						imageName: "DSC_0848.jpg",
						hideContactButton: false
					}
				}
						
				case "EmployeeAssistanceServices": {
					return {
						title: "Employee Assistance Services",
						callnowText: "Call now",
						mainParagraph: "Employee Assistance Services (EAS) is the national provider of Employee Assistance Program (EAP) services for the Correctional Service of Canada. They maintain the highest level of professionalism and confidentiality.",
						mainParagraphAriaLabel: "Employee Assistance Services (EAS) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "You can reach the crisis/referral line at 1-800-268-7708 or 1-800-567-5803 (TTY). It:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "is a confidential mental health service",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "is available 24 hours a day and 365 days a year",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "offers bilingual service (French & English)",
						bulletPoint3AriaLabel: "Third Bullet",
						bulletPoint4: "is available at no cost for employees, their spouse and dependents",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "provides immediate telephone crisis support and counselling if needed",
						bulletPoint5AriaLabel: "Fifth Bullet",
						bulletPoint6: "coordinates refferals to a counsellor in your area",
						bulletPoint6AriaLabel: "Sixth Bullet",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact Employee Assistance Program",
						imageName: "36431210_l.jpg",
						hideContactButton: false
					}
				}
						
				case "CriticalIncidentStressManagement": {
					return {
						title: "Involved in a traumatic event?",
						callnowText: "Call now",
						mainParagraph: "The Critical Incident Stress Management (CISM) program is a crisis intervention system that is designed to support CSC employees and their immediate family members (including a spouse or children who are still living at home). This service is available following critical incidents, which are traumatic events outside the usual range of human experience, such as events involving extreme violence against staff or offenders, severe injury or death, or the witnessing of such events.",
						mainParagraphAriaLabel: "Critical Incident Stress Management (CISM) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "CISM is offered by trained CSC employees, including mental health professionals.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "It is diverse in its interventions, including components such aas education, on-scene support, and debriefing or defusing.",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "CISM is voluntary, as you are not obligated to use the program.",
						bulletPoint3AriaLabel: "Third  Bullet",
						bulletPoint4: "It is confidential, peers do not provide details about who uses the program.",
						bulletPoint4AriaLabel: "Fourth Bullet",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "Fifth Bullet",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "Sixth Bullet",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "Seventh Bullet",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact GEN-EAP-CISM",
						imageName: "39280824_l.jpg",
						hideContactButton: false
					}
				}
						
				case "DutyToAccomodate": {
					return {
						title: "Require accommodation?",
						callnowText: "Call Now",
						mainParagraph: "The Duty to Accommodte (DTA) Program ensures that CSC is meeting its legal obligation regarding workplace accommodation as defined by Canadian legislation. The program strives to create a barrier free workplace; prevent discrimination based on a prohibted ground; and to ensure that employees' specific needs are accommodated by offerring equal opportunites for all.",
						mainParagraphAriaLabel: "Duty to Accommodate Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "Duty to Accommodate provides advice and guidance to managers/supervisors and human resource practitioners on the DTA program, the accommodation process, case specific accommodation matters as well as related legislation and policies.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "Informs and educates all parties of their role and responsbilities in the accommodation process.",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Assists managers/supervisors with preparing accommodtion related documents.",
						bulletPoint3AriaLabel: "Third  Bullet",
						bulletPoint4: "Assists with application and interpretation of policy and emerging case law.",
						bulletPoint4AriaLabel: "Fourth Bullet",
						bulletPoint5: "Provides training/awareness sessions to relevant partners and stakeholders.",
						bulletPoint5AriaLabel: "Fifth Bullet",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact GEN-NAT-DTA-OPDMA",
						imageName: "43276279_l.jpg",
						hideContactButton: false
					}
				}
						
				case "EmployeeAssistanceProgram": {
					return {
						title: "Need counselling?",
						callnowText: "Call now",
						mainParagraph: "The Employee Assistance Program (EAP) is a voluntary program which provides support to employees and raises awareness about wellbeing.",
						mainParagraphAriaLabel: "Employee Assistance Program Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "EAP referral agents are trained CSC employees at each worksite who volunteer to provide confidential support to their colleagues who are experiencing work-related or personal problems affecting their productivity or well-being.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "They can help you or your immediate family members connect to short-term counselling support services through CSC's service provider, Employee Assistance Services (EAS)",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "They can offer to listen, reply to you questions on the program, offer information on the appropriate internal and external information, and do a follow-up if needed.",
						bulletPoint3AriaLabel: "Third Bullet",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "Short-Term Counselling Services:",
						secondListTitleAriaLabel: "Short Term Counselling Services Title",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "Employee Assistance Services (EAS) provides confindential, immediate telephone crisis support and counselling, plus refferals to counsellors in your area for in-person sessions.",
						secondListBulletPoint1AriaLabel: "Second list, bullet point one",
						secondListBulletPoint2: "Up to 8 sessions is available at no cost to you, or your immediaate family members. Note: if your presenting issue requires long-term intervention, you can access services covered by your Public Service Health Care Plan.",
						secondListBulletPoint2AriaLabel: "Second list, bullet point two",
						secondListBulletPoint3: "Contact a CSC EAP Referral Agent for mroe information, or you may contact the service directly, at any time, from any location.",
						secondListBulletPoint3AriaLabel: "Second list, bullet point three",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "Call EAS now: 1-800-268-7708",
						secondListFooterAriaLabel: "Call EAS number",
						secondListFooterParagraph: "TDD service is available at 1-800-567-5803 Monday to Friday 7:30 am - 11:00 pm EST. Relay Service (RS) is available outside these hours.",
						secondListFooterParagraphAriaLabel: "TDD service description",
						contactName: "Contact Employee Assistance Program",
						imageName: "30051199_l.jpg",
						hideContactButton: false
					}
				}
						
				case "HarassmentPreventionProgram": {
					return {
						title: "Are you being harassed?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "The Harassment Prevention Program provides information and advice to employees and managers/supervisors in cases of alleged harassment.",
						mainParagraphAriaLabel: "Harassment Prevention Program Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "The Harassment Prevention Program can help you learn about informal and formal ways to deal with harassment.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "It offers training in harassment prevention.",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Provides information on the policy, guidelines and the formaal complaint process.",
						bulletPoint3AriaLabel: "Third Bullet",
						bulletPoint4: "It advises appropriate designated official in a formal process.",
						bulletPoint4AriaLabel: "Fourth Bullet",
						bulletPoint5: "Liaises with complainant/respondent",
						bulletPoint5AriaLabel: "Fifth Bullet",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact GEN-NAT Harrassment Prevention",
						imageName: "33867343_l.jpg",
						hideContactButton: false
					}
				}
						
				case "NationalAttendanceManagementProgram": {
					return {
						title: "Issues with attendance?",
						callnowText: "Call now",
						mainParagraph: "The National Attendance Management Program (NAMP) is designed to ensure consistent and fair management of employee attendance. It aims to improve attendance by managing each case individually when issues arise.",
						mainParagraphAriaLabel: "National Attendance Management Program (NAMP) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "The National Attendance Management Program can:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "NAMP helps promote and improve attendance through awareness, intervention and individual case management.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "It ensures the consistent application of the NAMP and evaluate the program.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Provides training to NAMP coordinators and management.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Provides advice and guidance to all staff, including management and NAMP coordinators.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "Reviews the threshold for each occupational group in collaboration with Human Resources (HR) Business Processes, Systems and Reporting Directorate.",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact GEN-NAT-NAMP-PNGA",
						imageName: "47382242_l.jpg",
						hideContactButton: false
					}
				}
						
				case "ConflictManagement": {
					return {
						title: "Dealing with conflict?",
						callnowText: "Call now",
						mainParagraph: "",
						mainParagraphAriaLabel: "",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "The Office of Conflict Management (OCM) provides confidential and impartial conflict management services.",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "OCM can help you learn about informal conflict resolution options such as facilitated discussions, conflict coaching and mediation.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "Provides customized group interventions.",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Provides presentations, workshops, awareness sessions and training on effective communication and conflict management.",
						bulletPoint3AriaLabel: "Third Bullet",
						bulletPoint4: "Provides information on how to prevent, manage, and resolve conflicts in the workplace",
						bulletPoint4AriaLabel: "Fourth Bullet",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact OCM: GEN-NHQ OCM-BGC",
						imageName: "52115462_l.jpg",
						hideContactButton: false
					}
				}
						
				case "ReturnToWorkProgram": {
					return {
						title: "Returning to work?",
						callnowText: "Call now",
						mainParagraph: "The Return to Work (RTW) Program provides employees who incur an injury or illness, work or non-work related, the support and assistance to return to fully productive employement, as soon as medically feasible.",
						mainParagraphAriaLabel: "Return to Work Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "Remember to stay in touch with your manager during your absence.",
						bulletPoint1AriaLabel: "First Bullet",
						bulletPoint2: "Be an active participant in all medical and vocational rehabiliation activities designed to faciliate your return.",
						bulletPoint2AriaLabel: "Second Bullet",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "As soon as you have medical clearance to return to work, discuss your return with your manager. You may wwish to include a union representative in the conversation.",
						bulletPoint3AriaLabel: "Third Bullet",
						bulletPoint4: "Work with your manager to develop a return to work plan. You may also need to talk to other stakeholders, for example, the Return to Work advisor or union representative.",
						bulletPoint4AriaLabel: "Fourth Bullet",
						bulletPoint5: "Make your return to work/accommodation needs known and actively participate in discussions for the indetifcation of sutiable modified work.",
						bulletPoint5AriaLabel: "Fifth Bullet",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact GEN RTW-PRT",
						imageName: "82795851_l.jpg",
						hideContactButton: false
					}
				}
				
				case "CrisisReferralCentre": {
					return {
						title: "Are you in crisis?",
						callnowText: "",
						mainParagraph: "You can call the Crisis and Referral Centre 24 hours a day and 365 days a year at 1-800-268-7708 for immediate access to a professional counsellor at no cost.",
						mainParagraphAriaLabel: "Are you in a crisis Summary",
						mainParagraph2: "TDD (Telecommunications Device for the Deaf) service is available at 1-800-567-5803 Monday to Friday 7:30 am – 11:00 pm EST. Relay Service (RS) is available outside these hours.",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "You will be provided with:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "Confidential, immediate telephone crisis support and counselling.",
						bulletPoint1AriaLabel: "Bullet Point 1",
						bulletPoint2: "Services in both official langauges (French & English)",
						bulletPoint2AriaLabel: "Bullet Point 2",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Possible referrals to short-term counselling.",
						bulletPoint3AriaLabel: "Bullet Point 3",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "Other immediate crisis services available are:",
						secondListTitleAriaLabel: "Second list title header",
						secondListMainParagraph: "This service is available to CSC employees and their immediate family members (spouse, children still living at home), CSC casual employees and students.",
						secondListMainParagraphAriaLabel: "Benefits to family summary",
						secondListBulletPoint1: "Canada Suicide Prevention Service 1-833-456-4566",
						secondListBulletPoint1AriaLabel: "Canada Suicide Prevention Service",
						secondListBulletPoint2: "Kids Help Phone (20 years and under) 1-800-668-6868",
						secondListBulletPoint2AriaLabel: "Kids Help Phone (20 years and under)",
						secondListBulletPoint3: "First Nations and Inuit Hope for Wellness 24/7 Help Line 1-855-242-3310",
						secondListBulletPoint3AriaLabel: "First Nations and Inuit Hope for Wellness 24/7 Help Line",
						secondListBulletPoint4: "Canadian Indian Residential Schools Crisis Line 1-866-925-4419",
						secondListBulletPoint4AriaLabel: "Canadian Indian Residential Schools Crisis Line",
						secondListBulletPoint5: "Trans LifeLine 1-877-330-6366",
						secondListBulletPoint5AriaLabel: "Trans LifeLine",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact",
						imageName: "easObj.png",
						hideContactButton: false
					}
				}
				
				
				default: {
					return {}
				}
			}		
		} else if(languageFlag == "fr") {
			switch(page) {
				
				case "app.component.ts": {
					return {
						settings: "Paramètres", 
						language: "EN/FR",
						help: "Assistance", // "Aidez-moi"
						logout: "Se déconnecter" //"Log"
					}
				}	
				
				case "login.html": {
					return {
						firstNameText: "Prénom",
						pinText: "NIP",
						createUserText: "Créer un compte d’utilisateur",
						loginText: "Ouverture de session",
						forgotPinText: "J’ai oublié mon NIP",
						firstNameInput: "Entrée du prénom",
						pinInput: "Entrée le NIP" //"Entrée de broche"
					}
				}
						
				case "newUser.html": {
					return {
						firstNameText: "Prénom",
						pinText: "NIP",
						pinRestrictionText: "NIP de 4 à 50 caractères",
						securityQuestionText: "Question de sécurité",
						securityAnswerText: "Réponse à la question de sécurité",
						createUserText: "Créer un compte d’utilisateur",
						firstNameFoundText: "Le prénom est déjà utilisé!",
						invalidNameText: "Le champ Prénom doit être rempli",
						invalidPinLengthText: "Votre NIP doit avoir de 4 à 50 caractères",
						invalidSecurityQuestionText: "Le champ Question de sécurité doit être rempli",
						invalidSecurityAnswerText: "Le champ réponse à la question de sécurité doit être rempli"
					}
				}
						
				case "recoverUser.html": {
					return {
						recoverUserText: "Rétablir un compte d’utilisateur", //"Récupérer un compte d’utilisateur",
						cantFindNameText: "Le compte n’existe pas!",
						nameOfAccountText: "Quel est le nom du compte que vous tentez de récupérer? ",
						firstNameText: "Prénom",
						findNameText: "Trouver le nom",
						wrongAnswerText: "Ce n'est pas la réponse!",
						answerToQuestionText: "Quelle est la réponse à la question de sécurité suivante?",
						securityAnswerText: "Réponse à la question de sécurité",
						submitAnswerText: "Soummetre une réponse", //"Envoyer une réponse",
						invalidPinText: "Votre code NIP doit contenir entre 4 et 50 caractères!",//"Votre code doit avoir entre 4 et 50 caractères!"
						enterNewPinText: "S'il vous plaît entrer votre nouveau code NIP", //"S'il vous plaît entrer votre nouvelle broche"
						characterLengthText: "Un minimum de 4 charactères pour le NIP", //"4-50 NIP de caractère"
						setNewPinText: "Soumettre un noubeau NIP" //"Définir une nouvelle broche"
					}
				}
				
				case "wellnesstracker.html": { //all trasnlated but Welness tracker
					return {
						wellnessTrackerTitleText: "Journal de bord sur le bien-être",
						resPageText: "Choisissez la liste de ressources qui vous convient",
						buttonText1: "Registre quotidien", //"Journal quotidien",
						buttonText2: "Graphique",
					}
				}

				case "home.html": {
					return {
						homeTitleText: "Tableau de bord",
						pageToolText1: "Essayez nos outils!", //"Mettez à l'essai nos outils!"
						buttonText1: "Vérification quotidienne", //"Vérification quotideienne"
						buttonText2: "Journal de bord sur le bien-être",
						buttonText3: "Se déconnecter", //"Outils (Arrive bientôt!)"
						buttonText4: "Ressources"
					}
				}
				
				case "dailyEntry.html": {
					return {
						dailyEntryText: "Registre quotidienne", //"Inscription quotidienne"
						moodText: "Humeur",
						dietText: "Régime",
						sleepText: "Sommeil",
						stressText: "Stress",
						dateText: "Date",
						timeText: "Temps",
						descriptionText: "Description", //La description"
						saveDataText: "Sauvegarder les données"
					}
				}
				
				
				
				case "analyticDashboard.html": {
					return {
						dashboardText: "Tableau de bord",
						fromDateText: "De la date", //"Du date"
						toDateText: "À la date", //"Au date"
						moodText: "Humeur",
						dietText: "Régime",
						sleepText: "Sommeil",
						stressText: "Stress",
						generateText: "Générer le graphe", //"Produire"
						chartText: "Graphique"
					}
				}
				
				case "checkinLogInfo.html": {
					return {
						checkinLogInfoText: "Vérifier l'information concernant les registres quotidiennes", //"Information relative au journal des inscriptions quotidiennes",
						dateText: "Date",
						moodText: "Humeur",
						dietText: "Régime",
						sleepText: "Sommeil",
						stressText: "Stress",
						editText: "Modifier",
						deleteText: "Effacer"
					}
				}

				case "resources.html": {
					return {
						resourceTitleText: "Ressources", // "Resources",
						resPageText: "Choissisez la liste de ressource qui s'applique à vous", //"Choose the resource list that applies to you"
						buttonText1: "Êtes-vous en crise?", // "Employee Assistance Services",
						buttonText1AriaLabel: "Services d'assistance pour employé button", // "Employee Assistance Services button"
						buttonText2: "Besoin de conseil?", //"Besoin de counseling?"
						buttonText2AriaLabel: "Besoin de conseil button", //"Besoin de counseling button"
						buttonText3: "Êtes-vous victime d'harcèlement?", // "Êtes-vous victime de harcèlement?"
						buttonText3AriaLabel: "Êtes-vous victime d'harcèlement button", //"Êtes-vous victime de harcèlement button"
						buttonText4: "Avez-vous vécu un événement traumatisant?", //"Vous avez vécu un événement traumatisant?",
						buttonText4AriaLabel: "Avez-vousvécu un événement traumatisant button", //"Vous avez vécu un événement traumatisant button"
						buttonText5: "Faisez-vous face à des conflits?", //
						buttonText5AriaLabel: "Faisez-vous face à des conflits button", //
						buttonText6: "Êtes-vous menacé", //
						buttonText6AriaLabel: "Menaces button", //
						buttonText7: "Êtes-vous de retour au travail?", //
						buttonText7AriaLabel: "Êtes-vous de retour au travail button", //
						buttonText8: "Avez-vous des problèmes liés à l’assiduité?", //
						buttonText8AriaLabel: "Avez-vous des problèmes liés à l’assiduité button", //
						buttonText9: "Avez-vous besoin de mesures d’adaptation?", //
						buttonText9AriaLabel: "Avez-vous besoin de mesures d’adaptation button", //
						buttonText10: "Êtes-vous en crise?",
						buttonText10AriaLabel: "Êtes-vous en crise button",
						buttonText11: "LifeSpeak",
						buttonText11AriaLabel: "LifeSpeak button"
					}
				}
				
				case "employee.html": {
					return {
						resourceTitleText: "Ressources pour les employés",
						resPageText: "Choisissez la liste de ressources qui s’applique à vous",
						buttonText1Desc: "Voic les programmes crées pour assister les employés à atteindre le bonheur et le bien-être au travai.",
						buttonText1: "Programme d’aide aux employés",
						buttonText2Desc: "Après être malade ou blessé, vous pourrez avoir besoin de prendre une période de repos. Voici ce que vous aurez besoin de savoir pour s'absenter du travail et de la compensation.",
						buttonText2: "Sortir des programmes",
						buttonText3Desc: "D'autre resources de contacts utiles qui pourrait vous être pertinents.",
						buttonText3: "Resources utiles",
						buttonText10: "Sun Life",
						sunlink: "https://www.sunlife.ca/ca/Insurance/Life+insurance?vgnLocale=fr_CA"
					}
				}
				
				case "employeeFamily.html": {
					return {
						resourceTitleText: "Famille des employés",
						resPageText: "Choisissez la liste de ressources qui s'applique.",
						buttonText1: "Service d'écoute téléphonique en cas d'urgence",
						buttonText2: "Programme d'aide aux employés",
						buttonText3: "Services de santé mentale",
						buttonText4: "Numéro téléphonique du soutien à la famille du SCC"
					}
				}
				
				case "public.html": {
					return {
						resourceTitleText: "Public",
						resPageText: "Choisissez la liste de ressources qui s'applique.",
						buttonText1: "Service d'écoute téléphonique en cas d'urgence",
						buttonText2: "Association canadienne pur la santé mentale",
						buttonText3: "Gestion du stress lié aux incidents critiques",
						buttonText4: "Services de santé mentale de SCC"
					}
				}
             
				
				case "EmployeeProtectionProtocol": {
					return {
						title: "Êtes-vous menacé?",
						callNowText: "Télephonez maintenant",
						mainParagraph: "Le Protocole de protection des employés (PPE) peut aider à vous protéger, votre famille et vous, contre les menaces, le harcèlement criminel et l’intimidation. Il n’est pas rare d’être exposé à des comportements difficiles lorsque l’on intervient auprès de délinquants. Vous pouvez être confronté à différents niveaux de comportement, selon votre poste et votre milieu de travail. Toutes les menaces ne ont pas équivalent. Si vous jugez que la situation n’est pas « normale », vous devez la signaler. Que faire en cas de menace?",
						mainParagraphAriaLabel: "Sommaire du Protocole de protection des employés (PPE)",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "Que faire quand menacé?",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "Agissez sans tarder si vous pensez être en danger imminent ou en grave danger.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Dans le milieu de travail, vous devriez signaler la situation à votre gestionnaire sans tarder. Si un incident se produit après les heures normales de travail, suivez les procédures établies pour votre unité opérationnelle pour amorcer le processus prévu par le PPE. Par exemple:",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "Dans l'établissement, communiquez avec l’agent de service désigné pour votre établissement;",
						bulletPoint2SubPoint1AriaLabel: "Deuxième puce, premier tiret ",
						bulletPoint2SubPoint2: "Dans la communauté, communiquez avec le Centre national de surveillance : 1-877-860-0617 {appelez maintenant};",
						
						bulletPoint2SubPoint2AriaLabel: "Deuxième puce, deuxième tiret",
						bulletPoint2SubPoint3: "À l’AC, composez le numéro d’urgence de la Sécurité de l’AC : 613-992-1486 {appelez maintenant}.",
						bulletPoint2SubPoint3AriaLabel: "Deuxième puce, troisième tiret",
						
						bulletPoint3: "À l’extérieur du milieu de travail, vous devez vous éloigner de la menace. Prévenez immédiatement la police. Signalez ensuite la situation à votre gestionnaire dès que possible. ",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "Quatrième",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact ???",
						imageName: "DSC_0848.jpg",
						hideContactButton: false
					}
				}
				
				case "EmployeeAssistanceServices": {
					return {
						title: "Service d'aide aux employés",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Service d'aide aux employés (SAE) est le fournisseur national des services Programme d’aide aux employés (PAE) pour le Service Correctionel du Canada. Ils maintienent le plus haut standard de professionnalisme et confidentialité.",
						mainParagraphAriaLabel: "Sommaire du Service d'aide aux employés (SAE)",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "Vous pouvez rejoindre le numéro téléphonique pour la ligne de crise ou référence au 1-800-268-7708 or 1-800-567-5803 (TTY). C'est:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "un service pour la santé mentale confidentiel",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "disponible 24 heures par jour, et 365 jours de l'année",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "offre des services billinges (en français et anglais)",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "disponible gratuitement pour les employés,leur époux et leurs dépendants",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "fournit immédiatement du support téléphonique pour crise et conseils si besoin",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "coordinates refferals to a counsellor in your area",
						bulletPoint6AriaLabel: "Sixième puce",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contactez le Programme d’aide aux employés",
						imageName: "36431210_l.jpg",
						hideContactButton: false
					}
				}
					
				case "CriticalIncidentStressManagement": {
					return {
						title: "Avez-vous vécu un événement traumatisant?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme de gestion du stress à la suite d’un incident critique (PGSIC) est un système d’intervention en cas de crise conçu pour aider les employés du SCC et les membres de leur famille immédiate (conjoint et enfants vivant toujours à la maison). Ce service est offert à la suite d’incidents critiques, qui sont des événements traumatisants ne faisant pas partie de l’expérience humaine habituelle, comme des événements impliquant une violence extrême contre le personnel ou les délinquants, des blessures graves ou la mort, ou le fait d’être témoin de tels événements.",
						mainParagraphAriaLabel: "Le Programme de gestion du stress à la suite d’un incident critique (PGSIC) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "Le PGSIC est offert par des employés formés du SCC, y compris des professionnels de la santé mentale.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Il comporte des interventions diversifiées, y compris des composantes comme l’éducation, le soutien sur place, le débreffage ou le désamorçage.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "La participation au PGSIC est volontaire, car vous n’êtes pas obligé d’utiliser le programme.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Il est confidentiel, et les pairs ne donnent pas de détails sur les utilisateurs du programme. ",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "Sixième puce",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "Septième puce",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Bouton de contact : GEN EAP-CISM/PAE-GSIC",
						imageName: "39280824_l.jpg",
						hideContactButton: false
					}
				}
				
				case "DutyToAccomodate": {
					return {
						title: "Avez-vous besoin des mesures d’adaptation?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme sur l’obligation de prendre des mesures d’adaptation (OPDMA) veille à ce que le SCC respecte son obligation légale en matière de mesures d’adaptation en milieu de travail au sens de la loi canadienne. Le programme vise à créer un milieu de travail sans obstacle, à prévenir la discrimination fondée sur un motif illicite et à veiller à ce que les besoins particuliers d’un employé soient satisfaits de façon à garantir l’égalité des chances pour tous.",
						mainParagraphAriaLabel: "Le Programme sur l’obligation de prendre des mesures d’adaptation (OPDMA) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "L’obligation de prendre des mesures d’adaptation signifie qu’il faut offrir des conseils et de l’orientation aux gestionnaires, aux superviseurs et aux intervenants en ressources humaines concernant le Programme sur l’OPDMA, le processus de prise de mesures d’adaptation, les questions d’adaptation liées à des cas particuliers, ainsi que les lois et les politiques qui y sont liés.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Le Programme informe toutes les parties de leurs rôles et de leurs responsabilités dans le cadre du processus d’adaptation.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Il offre du soutien aux gestionnaires et aux superviseurs pour la préparation des documents liés aux mesures d’adaptation.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Il facilite l’application et l’interprétation des politiques et de la jurisprudence récente.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "Il offre des séances de formation et de sensibilisation aux partenaires et aux intervenants concernés.",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contactez GEN-NAT-DTA-OPDMA",
						imageName: "43276279_l.jpg",
						hideContactButton: false
					}
				}

				case "EmployeeAssistanceProgram": {
					return {
						title: "Besoin de soutien?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme d’aide aux employés (PAE) est un programme bénévole qui offre du soutien aux employés et les sensibilisent au bien-être.",
						mainParagraphAriaLabel: "Sommaire du Programme d’aide aux employés",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "Les agents d’orientation du PAE sont des employés formés du SCC sur chaque lieu de travail qui offrent volontairement un soutien confidentiel à leurs collègues qui éprouvent des problèmes professionnels ou personnels qui ont une incidence sur leur productivité ou leur bien-être.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Ils peuvent vous aider, vous ou les membres de votre famille immédiate, à établir des liens avec des services de conseil à court terme par l’entremise du fournisseur de services du SCC, les Services d’aide aux employés (SAE).",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Ils peuvent vous offrir une oreille attentive, répondre à vos questions sur le programme, vous fournir de l’information sur les ressources internes et externes appropriées et faire un suivi, s’il y a lieu. ",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "Service de conseil à court terme",
						secondListTitleAriaLabel: "Titre pour Service de conseil à court terme",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "Les Services d’aide aux employés (SAE) offrent par téléphone un soutien et du conseil en cas de crise. Ce service immédiat et confidentiel peut également vous référer vers un conseiller de votre région qui vous recevra en personne.",
						secondListBulletPoint1AriaLabel: "Deuxième liste, première puce",
						secondListBulletPoint2: "Jusqu’à huit séances sont offertes gratuitement à vous ou aux membres de votre famille immédiate. Remarque : Si votre problème exige une intervention à long terme, vous pouvez avoir accès à des services couverts par votre Régime de soins de santé de la fonction publique.",
						secondListBulletPoint2AriaLabel: "Deuxième liste, deuixème puce",
						secondListBulletPoint3: "Communiquez avec un agent de référemce du PAE du SCC pour obtenir de plus amples renseignements. Vous pouvez aussi communiquer directement avec le service, en tout temps, à partir de n’importe quel endroit. Appelez les SAE maintenant, au 1-800-268-7708 Le service ATS est disponible au 1-800-567-5803, du lundi au vendredi, de 7 h 30 à 23 h (HNE). Un service de relais est disponible en dehors de ces heures",
						secondListBulletPoint3AriaLabel: "Deuxième liste, troisième puce",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "Appelez SAE maintenant: 1-800-268-7708",
						secondListFooterAriaLabel: "Appelez le numéro SAE ",
						secondListFooterParagraph: "Appelez les SAE maintenant, au 1-800-268-7708 . Le service ATS est disponible au 1-800-567-5803, du lundi au vendredi, de 7 h 30 à 23 h (HNE). Un service de relais est disponible en dehors de ces heures. ",
						secondListFooterParagraphAriaLabel: "TDD service description",
						contactName: "Appel Le Programme d’aide aux employés",
						imageName: "30051199_l.jpg",
						hideContactButton: false
					}
				}
				
				case "HarassmentPreventionProgram": {
					return {
						title: "Êtes-vous victime de harcèlement?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme sur la prévention du harcèlement (PPH) fournit des renseignements et des conseils aux employés et gestionnaires/superviseurs dans les cas présumés de harcèlement.",
						mainParagraphAriaLabel: "Harassment Prevention Program Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "Le PPH peut vous aider à vous informer au sujet des moyens informels et formels pour faire face au harcèlement.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Il offre de la formation en prévention du harcèlement.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Il fournit des renseignements sur les politiques, les lignes directrices en vigueur en matière de harcèlement et sur le processus à suivre pour porter plainte officiellement.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Il informe officiellement le fonctionnaire désigné approprié lorsqu’une plainte est officiellement déposée.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "Il assure la liaison avec le plaignant et l’intimé.",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Communiquez avec le PPH à l’adresse suivante : GEN-NAT Harassment Prevention Harcèlement2",
						imageName: "33867343_l.jpg",
						hideContactButton: false
					}
				}
				
				case "NationalAttendanceManagementProgram": {
					return {
						title: "Avez-vous des problèmes liés à l’assiduité?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme national de gestion de l’assiduité (PNGA) est conçu pour assurer une gestion uniforme et équitable de l’assiduité des employés. Il vise à améliorer l’assiduité en gérant chaque cas individuellement lorsque des problèmes surviennent.",
						mainParagraphAriaLabel: "Le Programme national de gestion de l’assiduité (PNGA) Summary",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "The National Attendance Management Program can:",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "Le PNGA aide à promouvoir et améliorer l’assiduité par la sensibilisation, l’intervention et la gestion des cas individuels.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Il assure l’application uniforme du PNGA et l’évaluation du programme.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Il fournit une formation aux coordonnateurs du PNGA et à la direction.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Il fournit des conseils et une orientation à tous les membres du personnel, y compris la direction et les coordonnateurs du PNGA.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "Il établit le seuil applicable à chaque groupe professionnel en collaboration avec la Direction des processus opérationnels, des systèmes et des rapports en matière de ressources humaines.",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Bouton de contact par courriel : GEN-NAT-NAMP-PNGA",
						imageName: "47382242_l.jpg",
						hideContactButton: false
					}
				}
				
				case "ConflictManagement": {
					return {
						title: "Faisez-vous face à des conflits?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "",
						mainParagraphAriaLabel: "",
						bulletPointHeader: "Le Bureau de gestion des conflits (BGC) fournit des services confidentiels et impartiaux de gestion des conflits.",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPoint1: "Le BGC peut vous aider à apprendre davantage sur les options informelles de résolution des conflits telles que les discussions facilitées, l'encadrement en résolution de conflits et la médiation.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Il fournit des interventions de groupe personnalisées.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Il donne des exposés, des ateliers, des séances de sensibilisation et de la formation sur la communication efficace et la gestion des conflits.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Il fournit des renseignements sur la manière de prévenir, gérer et résoudre les conflits dans le milieu de travail.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Communiquez avec le BGC à l’adresse suivante : GEN-NHQ OCM-BGC",
						imageName: "52115462_l.jpg",
						hideContactButton: false
					}
				}
				
				case "ReturnToWorkProgram": {
					return {
						title: "Retournez-vous au travail?",
						callnowText: "Télephonez maintenant",
						mainParagraph: "Le Programme de retour au travail fournit aux employés qui subissent une blessure ou sont atteints d’une maladie personnelle ou professionnelle l’aide et le soutien nécessaires pour qu’ils puissent reprendre un travail productif dès que leur état de santé leur permet.",
						mainParagraphAriaLabel: "Aperçu du Programme de retour au travail",
						mainParagraph2: "",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "",
						bulletPointHeaderAriaLabel: "",
						bulletPoint1: "N’oubliez pas de rester en contact avec votre gestionnaire pendant votre absence.",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "Participez activement à toutes les activités de réadaptation médicale et professionnelle conçues pour faciliter votre retour.",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "Dès que votre médecin vous autorise à retourner au travail, vous devez discuter de votre retour avec votre gestionnaire. Vous pouvez demander qu’un représentant du syndicat participe aux discussions.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "Collaborez avec votre gestionnaire pour établir un programme de retour au travail. Vous devrez aussi peut-être discuter avec d’autres intervenants, comme le conseiller en matière de retour au travail ou le représentant syndical.",
						bulletPoint4AriaLabel: "Quatrième puce",
						bulletPoint5: "Faites part de vos besoins en matière d’adaptation ou en vue d’un retour au travail et participez activement aux discussions pour trouver un travail modifié qui conviendra à votre situation.",
						bulletPoint5AriaLabel: "Cinquième puce",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "",
						secondListTitleAriaLabel: "",
						secondListMainParagraph: "",
						secondListMainParagraphAriaLabel: "",
						secondListBulletPoint1: "",
						secondListBulletPoint1AriaLabel: "",
						secondListBulletPoint2: "",
						secondListBulletPoint2AriaLabel: "",
						secondListBulletPoint3: "",
						secondListBulletPoint3AriaLabel: "",
						secondListBulletPoint4: "",
						secondListBulletPoint4AriaLabel: "",
						secondListBulletPoint5: "",
						secondListBulletPoint5AriaLabel: "",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contactez GEN RTW-PRT",
						imageName: "82795851_l.jpg",
						hideContactButton: false
					}
				}
				
				case "CrisisReferralCentre": {
					return {
						title: "Êtes-vous en crise?",
						callnowText: "",
						mainParagraph: "Vous pouvez appeler le Centre d’orientation et de gestion de crise 24 heures sur 24, 365 jours par année, au 1-800-268-7708, pour obtenir immédiatement et sans frais l’aide d’un conseiller professionnel.",
						mainParagraphAriaLabel: "Êtes-vous en crise Summary",
						mainParagraph2: "Le service ATS (appareil de télécommunication pour personnes sourdes) est disponible au 1 800 567 5803 du lundi au vendredi, de 7 h 30 à 23 h (HNE). Un service de relais est disponible en dehors de ces heures. ",
						mainParagraph2AriaLabel: "",
						bulletPointHeader: "Vous recevrez :",
						bulletPointHeaderAriaLabel: "Bullet Point Header",
						bulletPoint1: "des services confidentiels de soutien et de conseil immédiats par téléphone en cas de crise;",
						bulletPoint1AriaLabel: "Première puce",
						bulletPoint2: "des services dans les deux langues officielles (français et anglais);",
						bulletPoint2AriaLabel: "Deuxième puce",
						bulletPoint2SubPoint1: "",
						bulletPoint2SubPoint1AriaLabel: "",
						bulletPoint2SubPoint2: "",
						bulletPoint2SubPoint2AriaLabel: "",
						bulletPoint2SubPoint3: "",
						bulletPoint2SubPoint3AriaLabel: "",
						bulletPoint3: "une référence vers des services de conseil à court terme.",
						bulletPoint3AriaLabel: "Troisième puce",
						bulletPoint4: "",
						bulletPoint4AriaLabel: "",
						bulletPoint5: "",
						bulletPoint5AriaLabel: "",
						bulletPoint6: "",
						bulletPoint6AriaLabel: "",
						bulletPoint7: "",
						bulletPoint7AriaLabel: "",
						secondListTitle: "Il existe d’autres services de crise offrant une aide immédiate :",
						secondListTitleAriaLabel: "Second list title header",
						secondListMainParagraph: "Ce service est offert aux employés du SCC et aux membres de leur famille immédiate (conjoint et enfants vivant toujours à la maison), aux employés occasionnels du SCC et aux étudiants. ",
						secondListMainParagraphAriaLabel: "Sommaires d'avantages pour la famille",
						secondListBulletPoint1: "Service canadien de prévention du suicide, 1-833-456-4566;",
						secondListBulletPoint1AriaLabel: "Service canadien de prévention du suicide",
						secondListBulletPoint2: "Jeunesse, J’écoute (20 ans et moins), 1-800-668-6868;",
						secondListBulletPoint2AriaLabel: "Jeunesse, J'écoute (20 ans et moins)",
						secondListBulletPoint3: "Ligne d’écoute d’espoir pour le mieux-être des Premières Nations et des Inuits, (24 heures par jour, 7 jours par semaine), 1-855-242-3310;",
						secondListBulletPoint3AriaLabel: "Ligne d’assistance 24/7 Espoirs du mieux-être des Premières Nations",
						secondListBulletPoint4: "Ligne d’écoute nationale – pensionnats indiens, 1-866-925-4419;",
						secondListBulletPoint4AriaLabel: "Ligne de crise des pensionnats indiens canadiens",
						secondListBulletPoint5: "Trans LifeLine, 1-877-330-6366",
						secondListBulletPoint5AriaLabel: "Trans LifeLine",
						secondListFooter: "",
						secondListFooterAriaLabel: "",
						secondListFooterParagraph: "",
						secondListFooterParagraphAriaLabel: "",
						contactName: "Contact",
						imageName: "easObj.png",
						hideContactButton: false
					}
				}
				
				
				default: {
					return {}
				}
			}
		}	
    }
}