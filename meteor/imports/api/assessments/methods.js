import {Meteor} from 'meteor/meteor';

import {Assessments} from './collection';

Meteor.methods({
	'assessments.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 5,
				skip: (Number(params.page) - 1) * 5
			};

		return {
			total: Assessments.find(query).count(),
			assessments: Assessments.find(query, options).fetch()
		};
	},
	'assessments.get': function(_id) {
		return Assessments.findOne(_id);
	}
});
