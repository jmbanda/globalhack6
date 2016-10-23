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

		this.call('programs.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.programs = res.programs;
			this.total = res.total;
		});
	}

	remove(program) {
		if(!confirm('Are you sure you want to permanently delete this program?')) {
			return false;
		}

		this.call('programs.remove', client._id, err => {
			if(err) {
				return alert(err.result || err.message);
			}

			this.search();
		});
	}
}

class EditorController {
	constructor($scope, $reactive, $state, program) {
		$reactive(this).attach($scope);

		this.$state = $state;
		this.program = program;
	}

	save() {
		this.loading = true;

		const cb = err => {
			this.loading = false;
			if(err) {
				return alert(err.reason || err.message);
			}

			alert('Program saved');

			this.$state.go('app.programs.index');
		};

		const program = angular.copy(this.program);
		if(program._id) {
			delete program._id;

			Programs.update(this.program._id, {$set: program}, cb);
		} else {
			Programs.insert(program, cb);
		}
	}

	cancel() {
		this.$state.go('app.programs.index');
	}
}

const name = 'app.programs';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.programs', {
		abstract: true,
		url: '/programs',
		template: '<div ui-view></div>'
	})
	.state('app.programs.index', {
		url: '',
		controller: ['$scope', '$reactive', IndexController],
		controllerAs: 'pp',
		templateUrl
	})
	.state('app.programs.new', {
		url: '/new',
		controller: ['$scope', '$reactive', '$state', 'program', EditorController],
		controllerAs: 'p',
		templateUrl: editorTemplate,
		resolve: {
			program: () => ({})
		}
	})
	.state('app.programs.edit', {
		url: '/:_id',
		controller: ['$scope', '$reactive', '$state', 'program', EditorController],
		controllerAs: 'p',
		templateUrl: editorTemplate,
		resolve: {
			program: ['$stateParams', '$q', ($stateParams, $q) => {
				const deferred = $q.defer();

				Meteor.call('programs.get', $stateParams._id, (err, res) => {
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
