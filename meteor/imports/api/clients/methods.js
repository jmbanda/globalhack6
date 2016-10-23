import {Meteor} from 'meteor/meteor';

import {Clients, ClientSchema} from './collection';

Meteor.methods({
	'clients.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 10,
				skip: (Number(params.page) - 1) * 10
			};

		if(params.filter) {
			query.$or = [
				{firstName: searchQuery},
				{middleName: searchQuery},
				{lastName: searchQuery}
			];
		}

		return {
			total: Clients.find(query).count(),
			clients: Clients.find(query, options).fetch()
		};
	},
	'clients.save': function(client) {
		const _id = client._id || null;

		ClientSchema.clean(client);

		if(_id) {
			Clients.update(_id, {$set: client})
		} else {
			Clients.insert(client);
		}
	},
	'clients.get': function(_id) {
		return Clients.findOne(_id);
	},
	'clients.remove': function(_id) {
		Clients.remove(_id);
	}
});
