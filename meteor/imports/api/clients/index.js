import {Meteor} from 'meteor/meteor';

if(Meteor.isServer) {
	import './methods';
}

export * from './collection';
