import {Meteor} from 'meteor/meteor';

import {Programs} from './collection';

Meteor.publish({
	'programs.selector': function() {
		return Programs.find({}, {fields: {name: 1}});
	}
});
