import {Meteor} from 'meteor/meteor';

import {Beds} from './collection';

Meteor.methods({
	'beds.search': function(params) {
		const searchQuery = {$regex: '.*' + params.filter + '.*', $options: 'i'},
			query = {},
			options = {
				limit: 10,
				skip: (Number(params.page) - 1) * 10
			};

		const pipeline = [
			{$match: query},
			{$skip: (Number(params.page) - 1) * 10},
			{$limit: 10},
			{$lookup: {from: 'programs', localField: 'programId', foreignField: '_id', as: 'program'}},
			{$unwind: '$program'},
			{$project: {status: 1, availableDate: 1, program: '$program.name'}}
		];

		return {
			total: Beds.find(query).count(),
			beds: Beds.aggregate(pipeline)
		};
	},
	'beds.get': function(_id) {
		return Beds.findOne(_id);
	}
});
