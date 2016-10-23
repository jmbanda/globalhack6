import {Meteor} from 'meteor/meteor';

import {HotlineEmergencies} from './collection';

Meteor.methods({
	'hotline-emergencies.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 10,
				skip: (Number(params.page) - 1) * 10
			};

		return {
			total: HotlineEmergencies.find(query).count(),
			emergencies: HotlineEmergencies.find(query, options).fetch()
		};
	}
});
