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

		this.call('beds.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.beds = res.beds;
			this.total = res.total;
		});
	}
}

class EditorController {
	constructor($scope, $reactive, $state, bed) {
		$reactive(this).attach($scope);

		this.$state = $state;
		this.bed = bed;
	}

	cancel() {
		this.$state.go('app.beds.index');
	}
}

const name = 'app.beds';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.beds', {
		abstract: true,
		url: '/beds',
		template: '<div ui-view></div>'
	})
	.state('app.beds.index', {
		url: '',
		controller: ['$scope', '$reactive', IndexController],
		controllerAs: 'bb',
		templateUrl
	})
	.state('app.beds.edit', {
		url: '/:_id',
		controller: ['$scope', '$reactive', '$state', 'bed', EditorController],
		controllerAs: 'b',
		templateUrl: editorTemplate,
		resolve: {
			bed: ['$stateParams', '$q', ($stateParams, $q) => {
				const deferred = $q.defer();

				Meteor.call('beds.get', $stateParams._id, (err, res) => {
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
