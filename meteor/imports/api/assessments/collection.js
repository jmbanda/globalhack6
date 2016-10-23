import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Assessments = new Mongo.Collection('assessments');

export const AssessmentSchema = new SimpleSchema({

});
