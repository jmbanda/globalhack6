import angular from 'angular';

import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {HotlineEmergencies} from '/imports/api/hotline-emergencies';

import templateUrl from './template.html';

class NavigationController {
	constructor($scope, $reactive, $state) {
		$reactive(this).attach($scope);

		this.$state = $state;

		this.subscribe('hotline-emergencies.navigation');

		this.helpers({
			emergencies() {
				return HotlineEmergencies.find({agent: null, ignore: {$ne: Meteor.userId()}}, {sort: {date: 1}});
			},
			emergenciesCounter() {
				return Counts.findOne({_id: 'hotline-emergencies'});
			}
		});
	}

	pick(emergency) {
		const user = Meteor.user(),
			agent = {_id: user._id, name: user.profile.name};

		HotlineEmergencies.update(emergency._id, {$set: {agent, status: 'Picked by agent'}, $push: {history: {agent, action: 'Emergency picked by agent', date: new Date()}}});

		this.$state.go('app.hotline-emergencies.edit', {_id: emergency._id}, {reload: true});
	}

	ignore(emergency) {
		HotlineEmergencies.update(emergency._id, {$addToSet: {ignore: Meteor.userId()}})
	}

	logout() {
		Meteor.logout(() => {
			this.$state.go('login.login');
		});
	}
}

const name = 'app.navigation';

export default name;

angular.module(name, [])
.component('navigation', {
	templateUrl,
	controllerAs: 'nav',
	controller: ['$scope', '$reactive', '$state', NavigationController]
});
