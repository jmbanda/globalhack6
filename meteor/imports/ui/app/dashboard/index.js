import angular from 'angular';

import templateUrl from './index.html';

class IndexController {
	constructor($scope, $reactive, data1, data2) {
		$reactive(this).attach($scope);

		this.labels1 = ['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];
		this.data1 = data1;

		this.labels2 = ['Negative', 'Neutral', 'Positive'];
		this.data2 = data2;
	}
}

const name = 'app.dashboard';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.dashboard', {
		url: '/',
		controller: ['$scope', '$reactive', 'data1', 'data2', IndexController],
		controllerAs: 'd',
		templateUrl,
		resolve: {
			data1: ['$q', $q => {
				const deferred = $q.defer();

				Meteor.call('dashboard.hourly-average', (err, res) => {
					if(err) {
						deferred.reject(err);
					} else {
						deferred.resolve(res);
					}
				})

				return deferred.promise;
			}],
			data2: ['$q', $q => {
				const deferred = $q.defer();

				Meteor.call('dashboard.sentiment', (err, res) => {
					if(err) {
						deferred.reject(err);
					} else {
						deferred.resolve(res);
					}
				})

				return deferred.promise;
			}]
		}
	});
}]);
