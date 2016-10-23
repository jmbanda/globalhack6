import {Meteor} from 'meteor/meteor';

Meteor.methods({
	'users.search': function(params) {
		const searchQuery = {$regex: '.*' + (params.filter || '') + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 10,
				skip: (Number(params.page) - 1) * 10,
				fields: {services: 0}
			};

		return {
			total: Meteor.users.find(query).count(),
			users: Meteor.users.find(query, options).fetch()
		};
	}
});
