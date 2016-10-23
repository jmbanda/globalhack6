import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import {Programs} from '/imports/api/programs';

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

		this.call('assessments.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.assessments = res.assessments;
			this.total = res.total;
		});
	}
}

class EditorController {
	constructor($scope, $reactive, assessment) {
		$reactive(this).attach($scope);

		this.assessment = assessment;
	}
}

const name = 'app.assessments';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.assessments', {
		abstract: true,
		url: '/assessments',
		template: '<div ui-view></div>'
	})
	.state('app.assessments.index', {
		url: '',
		controller: ['$scope', '$reactive', IndexController],
		controllerAs: 'aa',
		templateUrl
	})
	.state('app.assessments.review', {
		url: '/:_id',
		controller: ['$scope', '$reactive', 'assessment', EditorController],
		controllerAs: 'a',
		templateUrl: editorTemplate,
		resolve: {
			assessment: ['$stateParams', '$q', ($stateParams, $q) => {
				const deferred = $q.defer();

				Meteor.call('assessments.get', $stateParams._id, (err, res) => {
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
