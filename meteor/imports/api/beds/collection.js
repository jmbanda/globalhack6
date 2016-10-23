import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Beds = new Mongo.Collection('beds');

const type = Boolean,
	optional = true;

export const BedSchema = new SimpleSchema({
	programId: {type: String},
	status: {type, allowedValues: ['Occupied', 'Available']},
	availableDate: {type: Date, optional},
	veteranOnly: {type, optional},
	adultOnly: {type, optional},
	childrenOnly: {type, optional},
	infantOnly: {type, optional},
	fullFamily: {type, optional},
	singleMan: {type, optional},
	singleWoman: {type, optional},
	sexOffender: {type, optional}
});
