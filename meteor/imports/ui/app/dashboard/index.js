import angular from 'angular';

import templateUrl from './index.html';

const name = 'app.dashboard';

export default name;

angular.module(name, [])
.config(['$stateProvider', $stateProvider => {
	$stateProvider.state('app.dashboard', {
		url: '/',
		templateUrl
	});
}]);
