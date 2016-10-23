import {Meteor} from 'meteor/meteor';

if(Meteor.isServer) {
	import './methods';
	import './publish';
}

export * from './collection';
