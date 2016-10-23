import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-password';
import 'angular-simple-logger';
import 'angular-google-maps';

import Filters from '../filters';
import Login from './login';
import Assessment from './assessment';
import Navigation from './navigation';
import Dashboard from './dashboard';
import Beds from './beds';
import Clients from './clients';
import HotlineEmergencies from './hotline-emergencies';
import Programs from './programs';
import Users from './users';

import templateUrl from './template.html';

const name = 'app';

export default name;

angular.module(name, [
	angularMeteor
	, angularMeteorAuth
	, uiRouter
	, 'ui.bootstrap'
	, 'ngPassword'
	, 'uiGmapgoogle-maps'
	, Filters
	, Login
	, Assessment
	, Navigation
	, Dashboard
	, Beds
	, Clients
	, HotlineEmergencies
	, Programs
	, Users
])
.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', 'uiGmapGoogleMapApiProvider', ($locationProvider, $urlRouterProvider, $stateProvider, GoogleMapApi) => {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

	$stateProvider.state('app', {
		abstract: true,
		url: '',
		templateUrl,
		resolve: {
			currentUser: ['$auth', $auth => {
				return $auth.awaitUser();
			}]
		}
	});

	GoogleMapApi.configure({key: 'AIzaSyA0QeoqSPZQP4jm9nOLpnHjmXzqs95j46A'});
}])
.run(['$rootScope', '$state', ($rootScope, $state) => {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		switch(error) {
			case 'AUTH_REQUIRED':
				return $state.go('login.login');
			case 'FORBIDDEN':
				return $state.go('error.403');
			case 'NOT_FOUND':
				return $state.go('error.404');
		}

		$state.go('error.500');
	});
}]);
