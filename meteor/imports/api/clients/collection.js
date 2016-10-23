import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const Clients = new Mongo.Collection('clients');

const type = String,
	optional = true;

export const ClientSchema = new SimpleSchema({
	firstName: {type, optional},
	middleName: {type, optional},
	lastName: {type, optional},
	nameDataQuality: {type: Number},
	ssn: {type, optional},
	ssnDataQuality: {type: Number},
	dateOfBirth: {type: Date, optional},
	dobQuality: {type: Number},
	phoneNumber: {type, optional},
	race: {type, allowedValues: ['AmIndAKNative', 'Asian', 'Black', 'NativeHIOtherPacific', 'White', 'None']},
	gender: {type},
	isVeteran: {type: Boolean},
	veteranData: {
		optional,
		type: new SimpleSchema({
			yearEnteredService: {type: Number},
			yearSeparated: {type: Number},
			wars: {type: [String], allowedValues: ['WorldWarII', 'KoreanWar', 'VietnamWar', 'DesertStorm', 'AfghanistanOEF', 'IraqOIF', 'IraqOND', 'OtherTheater']},
			militaryBranch: {type},
			dischargeStatus: {type}
		})
	}
});
