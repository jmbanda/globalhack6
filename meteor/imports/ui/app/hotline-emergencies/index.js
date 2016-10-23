import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import {HotlineEmergencies} from '/imports/api/hotline-emergencies';

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

		this.call('hotline-emergencies.search', this.options, (err, res) => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.emergencies = res.emergencies;
			this.total = res.total;
		});
	}

	remove(emergency) {
		if(!confirm('Are you sure you want to delete this emergency?')) {
			return;
		}

		HotlineEmergencies.remove(emergency._id, (err) => {
			this.search();
		});
	}
}

class EditorController {
	constructor($scope, $reactive, $state) {
		$reactive(this).attach($scope);

		this.$state = $state;
		this.subscribe('hotline-emergencies.single', () => [$state.params._id]);

		this.helpers({
			emergency() {
				return HotlineEmergencies.findOne($state.params._id);
			},
			map() {
				const e = HotlineEmergencies.findOne($state.params._id);

				if(!e || !e.geolocation) return {};

				return {
					center: {
						latitude: e.geolocation.coordinates[1],
						longitude: e.geolocation.coordinates[0]
					},
					marker: {
						id: 0,
						show: true,
						coords: {
							latitude: e.geolocation.coordinates[1],
							longitude: e.geolocation.coordinates[0]
						}
					},
					zoom: 16,
					control: {}
				}
			}
		});
	}

	save() {
		this.loading = true;

		this.call('emergencies.save', angular.copy(this.client), (err, res) => {
			this.loadnig = false;
			if(err) {
				return alert(err.reason || err.message);
			}

			alert('Changes saved');
		});
	}

	cancel() {
		this.$state.go('app.hotline-emergencies.index');
	}
}

const name = 'app.hotline-emergencies';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.hotline-emergencies', {
		abstract: true,
		url: '/hotline-emergencies',
		template: '<div ui-view></div>'
	})
	.state('app.hotline-emergencies.index', {
		url: '',
		controller: ['$scope', '$reactive', IndexController],
		controllerAs: 'ee',
		templateUrl
	})
	.state('app.hotline-emergencies.edit', {
		url: '/:_id',
		controller: ['$scope', '$reactive', '$state', EditorController],
		controllerAs: 'e',
		templateUrl: editorTemplate
	})
}]);
