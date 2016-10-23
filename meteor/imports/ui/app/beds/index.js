import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import {Beds} from '/imports/api/beds';
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

		this.subscribe('programs.selector');

		this.$state = $state;
		this.bed = bed;
		this.yesNo = [{v: true, l: 'Yes'}, {v: false, l: 'No'}];

		this.helpers({
			programs() {
				return Programs.find({}, {sort: {name: 1}});
			}
		});
	}

	save() {
		this.loading = true;

		const bed = angular.copy(this.bed);
		delete bed._id;

		if(this.bed._id) {
			Beds.update(this.bed._id, {$set: bed}, err => {
				this.loading = false;

				if(err) {
					return alert(err.reason || err.message);
				}

				alert('Bed saved');

				this.$state.go('app.beds.index');
			});
		} else {
			Beds.insert(bed, err => {
				this.loading = false;

				if(err) {
					return alert(err.reason || err.message);
				}

				alert('Bed saved');

				this.$state.go('app.beds.index');
			});
		}
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
	.state('app.beds.new', {
		url: '/new',
		controller: ['$scope', '$reactive', '$state', 'bed', EditorController],
		controllerAs: 'b',
		templateUrl: editorTemplate,
		resolve: {
			bed: () => ({})
		}
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
	});
}]);
