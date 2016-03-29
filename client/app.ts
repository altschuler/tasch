import {Component, View, NgZone, provide} from 'angular2/core';

import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, APP_BASE_HREF} from 'angular2/router'
import {bootstrap} from 'angular2-meteor';

import {SiteHeader} from 'client/site/site-header';

import {MachinesList} from 'client/machines/machines-list';
import {MachinesDetails} from 'client/machines/machines-details';
import {MachinesCreate} from 'client/machines/machines-create';


@Component({
    selector: 'app'
})

@View({
    templateUrl: '/client/app.html',
    directives: [SiteHeader, ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/machines', as: 'MachinesList', component: MachinesList },
    { path: '/machines/:machineId', as: 'MachinesDetails', component: MachinesDetails },
    { path: '/machines/create', as: 'MachinesCreate', component: MachinesCreate }
])

class Tasch { }

bootstrap(Tasch, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })])
