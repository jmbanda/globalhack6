import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import '/imports/ui/sb-admin-2.css';
import '/imports/ui/notify-me.css';
import 'font-awesome/css/font-awesome.css';
import '/imports/ui/app/styles/master.css'

import {Meteor} from 'meteor/meteor';

import App from '/imports/ui/app';

function onReady() {
	angular.bootstrap(document, [App], {strictDi: true});
}

if(Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}
