import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

import {HotlineEmergencies} from '/imports/api/hotline-emergencies';
import {Programs} from '/imports/api/programs';
import {Beds} from '/imports/api/beds';

Meteor.startup(() => {
	if(Meteor.users.find().count()===0) {
		const _id = Accounts.createUser({
			username: 'admin',
			password: 'admin'
		});

		Roles.addUsersToRoles(_id, ['admin']);

		Meteor.users.update(_id, {$set: {active: true, profile: {name: 'Administrator'}}});
	}

	if(HotlineEmergencies.find().count()===0) {
		HotlineEmergencies.insert({
			"number" : "+14066005497",
			"emergencyWord" : "help",
			"location" : "151 Chippewa",
			"message" : "freezing to death very cold help 151 chippewa",
			"sentimentClass" : "neg",
			"scoresNegative" : 0.667,
			"scoresNeutral" : 0.167,
			"scoresPossitive" : 0.167,
			"date" : new Date()
		});
	}

	if(Programs.find().count()===0) {
		Programs.insert({
			name: 'Saint Patrick Center- Women\'s Night',
			address: 'Test address'
		});
	}

	if(Beds.find().count()===0) {
		const program = Programs.findOne();

		[
			{
				status: 'Available',
				veteranOnly: true,
				singleMan: true,
				singleWoman: true
			},
			{
				status: 'Occupied',
				availableDate: new Date('2016-10-28 12:00:00.000'),
				veteranOnly: true,
				singleMan: true,
				singleWoman: false,
				sexOffender: true
			},
			{
				status: 'Available',
				adultOnly: true,
				singleMan: true,
				singleWoman: true
			},
			{
				status: 'Available',
				fullFamily: true,
				singleMan: false,
				singleWoman: true
			}
		].forEach(b => {
			b.programId = program._id;
			Beds.insert(b);
		})
	}
});
