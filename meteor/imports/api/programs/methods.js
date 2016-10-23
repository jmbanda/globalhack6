import {Meteor} from 'meteor/meteor';

import {Programs} from './collection';

Meteor.methods({
	'programs.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {name: searchQuery},
			options = {
				limit: 10,
				skip: (Number(params.page) - 1) * 10
			};

		return {
			total: Programs.find(query).count(),
			programs: Programs.find(query, options).fetch()
		};
	},
	'programs.get': function(_id) {
		return Programs.findOne(_id);
	}
});
