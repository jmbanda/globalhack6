import {Meteor} from 'meteor/meteor';

import {HotlineEmergencies} from './collection';

Meteor.methods({
	'hotline-emergencies.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 5,
				skip: (Number(params.page) - 1) * 5
			};

		return {
			total: HotlineEmergencies.find(query).count(),
			emergencies: HotlineEmergencies.find(query, options).fetch()
		};
	}
});
