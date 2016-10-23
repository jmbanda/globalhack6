import {Meteor} from 'meteor/meteor';

import {HotlineEmergencies} from '/imports/api/hotline-emergencies';

Meteor.methods({
	'dashboard.hourly-average': function() {
		const r = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			date = new Date();

		date.setDate(date.getDate() - 1);

		HotlineEmergencies.aggregate([
			{$match: {date: {$gte: date}}},
			{$group: {_id: {$hour: '$date'}, count: {$sum: 1}}}
		]).forEach(d => {
			r[d._id-1] = d.count;
		});

		return r;
	},
	'dashboard.sentiment': function() {
		const pipeline = [{$group: {_id: '1', negative: {$avg: '$scoresNegative'}, neutral: {$avg: '$scoresNeutral'}, positive: {$avg: '$scoresPossitive'}}}];

		return HotlineEmergencies.aggregate(pipeline).map(r => [Math.round(r.negative*100), Math.round(r.neutral*100), Math.round(r.positive*100)])[0];
	}
});
