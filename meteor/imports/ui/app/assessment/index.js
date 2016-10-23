import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import {Assessments} from '/imports/api/assessments';

import templateUrl from './index.html';
import completedTemplate from './completed.html';

class IndexController {
	constructor($scope, $reactive, $state) {
		$reactive(this).attach($scope);

		this.$state = $state;
		this.assessment = {};
	}

	submit() {
		this.loading = true;

		Assessments.insert(angular.copy(this.assessment), err => {
			this.loading = false;

			if(err) {
				return alert(err.reason || err.message);
			}

			this.$state.go('assessment-completed');
		});
	}
}

const name = 'assessment';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('assessment', {
		url: '/assessment',
		controller: ['$scope', '$reactive', '$state', IndexController],
		controllerAs: 'a',
		templateUrl
	})
	.state('assessment-completed', {
		url: '/assessment-completed',
		templateUrl: completedTemplate
	});
}]);
