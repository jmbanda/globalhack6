import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const Programs = new Mongo.Collection('programs');

const type = String;

export const ProgramSchema = new SimpleSchema({
	name: {type},
	address: {type}
});
