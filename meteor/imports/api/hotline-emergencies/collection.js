import {Mongo} from 'meteor/mongo';

export const HotlineEmergencies = new Mongo.Collection('hotline-emergencies');

const type = String,
	optional = true;

export const HotlineEmergencySchema = new SimpleSchema({
	pending: {type: Boolean},
	date: {type: Date},
	client: {type},
	location: {type, optional},
	geolocation: {type: Object, blackbox: true, optional}, // Parsed location
	message: {type},
	emergencyLevel: {type, optional}
});
