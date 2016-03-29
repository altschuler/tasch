import {Component, View} from 'angular2/core';
import {AccountsUI} from 'meteor-accounts-ui';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'site-header'
})

@View({
    templateUrl: '/client/site/site-header.html',
    directives: [AccountsUI, RouterLink]
})

export class SiteHeader { }
