import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {HotlineEmergencies} from './collection';

Meteor.publish({
	'hotline-emergencies.navigation': function() {
		Counts.publish(this, 'hotline-emergencies', HotlineEmergencies.find({agent: null}), { noReady: true });

		return HotlineEmergencies.find({agent: null, ignore: {$ne: this.userId}}, {fields: {date: 1, client: 1, message: 1, number: 1}});
	},
	'hotline-emergencies.single': function(_id) {
		return HotlineEmergencies.find({_id});
	}
});
