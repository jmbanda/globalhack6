import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import {HotlineEmergencies} from '/imports/api/hotline-emergencies';
import {Clients} from '/imports/api/clients';
import {Beds} from '/imports/api/beds';

WebApp.connectHandlers.use('/webhook', function(req, res, next) {
	let body = '';

	req.on('data', function(data) {
		body += data;
	});

	req.on('end', Meteor.bindEnvironment(function() {
		const message = JSON.parse(body),
			client = Clients.findOne({phoneNumber: message.number}, {fields: {firstName: 1, lastName: 1}});

		message.date = new Date();

		if(client) {
			message.client = {_id: client._id, name: client.firstName + ' ' + client.lastName};
		}

		if(message.location && message.location!='') {
			const opts = {params: {
				address: message.location,
				language: 'en',
				bounds: '38.531852,-90.3205151|38.77434909999999,-90.166409'
			}};

			const res = HTTP.get('https://maps.googleapis.com/maps/api/geocode/json', opts);

			if(res && res.data && res.data.results && res.data.results.length>0) {
				const item = res.data.results[0];

				message.geolocation = {
					type: 'Point',
					coordinates: [item.geometry.location.lng, item.geometry.location.lat]
				};
			}
		}

		HotlineEmergencies.insert(message);
	}));

	res.writeHead(200);
	res.end();
});

WebApp.connectHandlers.use('/find-beds', function(req, res, next) {
	const data = JSON.parse(decodeURIComponent(req.url.replace('/?query=', ''))),
		query = {};

	data.categories.forEach(c => {
		switch(c) {
			case 'veteran':
				query.childrenOnly = {$ne: true};
				query.infantOnly = {$ne: true};
				query.fullFamily = {$ne: true};
				break;
			case 'adult':
				break;
			case 'children':
				query.sexOffender = {$ne: true};
				break;
			case 'infant':
			case 'family':
			case 'Man':
			case 'Woman':
			case 'male':
			case 'female':
			case 'youth':
			case 'offender':
		}
	});

	Meteor.bindEnvironment(function() {
		const beds = Beds.aggregate([
			{$match: query},
			{$group: {_id: '$programId', count: {$sum: 1}}},
			{$lookup: {from: 'programs', foreignField: '_id', localField: '_id', as: 'program'}},
			{$unwind: '$program'},
			{$project: {_id: '$program.name', count: 1}}
		]);

		res.writeHead(200);
		res.end('Please go to: ' + beds.map(b => {
			return b._id + ' ' + b.count.toFixed(0) + ' beds available';
		}).join());
	})();
});
