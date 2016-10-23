import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import templateUrl from './index.html';
import editorTemplate from './editor.html';

class IndexController {
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

		this.call('clients.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.clients = res.clients;
			this.total = res.total;
		});
	}

	remove(client) {
		if(!confirm('Are you sure you want to permanently delete this person?')) {
			return false;
		}

		this.call('clients.remove', client._id, err => {
			if(err) {
				return alert(err.result || err.message);
			}

			this.search();
		});
	}
}

class EditorController {
	constructor($scope, $reactive, $state, client) {
		$reactive(this).attach($scope);

		this.$state = $state;
		this.client = client;
	}

	save() {
		this.loading = true;

		this.call('clients.save', angular.copy(this.client), (err, res) => {
			this.loadnig = false;
			if(err) {
				return alert(err.reason || err.message);
			}

			alert('Client saved');

			this.$state.go('app.clients.index');
		});
	}

	cancel() {
		this.$state.go('app.clients.index');
	}
}

const name = 'app.clients';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.clients', {
		abstract: true,
		url: '/clients',
		template: '<div ui-view></div>'
	})
	.state('app.clients.index', {
		url: '',
		controller: ['$scope', '$reactive', IndexController],
		controllerAs: 'cc',
		templateUrl
	})
	.state('app.clients.new', {
		url: '/new',
		controller: ['$scope', '$reactive', '$state', 'client', EditorController],
		controllerAs: 'c',
		templateUrl: editorTemplate,
		resolve: {
			client: () => ({})
		}
	})
	.state('app.clients.edit', {
		url: '/:_id',
		controller: ['$scope', '$reactive', '$state', 'client', EditorController],
		controllerAs: 'c',
		templateUrl: editorTemplate,
		resolve: {
			client: ['$stateParams', '$q', ($stateParams, $q) => {
				const deferred = $q.defer();

				Meteor.call('clients.get', $stateParams._id, (err, res) => {
					if(!res) {
						deferred.reject('NOT_FOUND');
					} else {
						deferred.resolve(res);
					}
				});

				return deferred.promise;
			}]
		}
	})
}]);
