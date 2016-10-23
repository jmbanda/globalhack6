import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import templateUrl from './index.html';

class UsersController {
	constructor($scope, $reactive) {
		$reactive(this).attach($scope);

		this.options = {
			filter: '',
			page: 1
		}

		$scope.$watch(angular.bind(this, () => this.options.page), () => {
			this.search();
		});
	}

	search() {
		this.loading = true;

		this.call('users.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.users = res.users;
			this.total = res.total;
		});
	}
}

const name = 'app.users';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.users', {
		abstract: true,
		url: '/users',
		template: '<div ui-view></div>'
	})
	.state('app.users.index', {
		url: '',
		controller: ['$scope', '$reactive', UsersController],
		controllerAs: 'uu',
		templateUrl
	})
}]);
