import {Component, View} from 'angular2/core';

import {MeteorComponent} from 'angular2-meteor';

import {Router, RouteParams, RouterLink, CanActivate, ComponentInstruction} from 'angular2/router';

import {IMachine, Machines} from 'collections/machines';

function checkPermissions(instruction: ComponentInstruction) {
    var machineId = instruction.params['machineId'];
    var machine = Machines.findOne(machineId);

    return machine && machine.owner == Meteor.userId();
}

@Component({
    selector: 'machines-details'
})

@View({
    templateUrl: 'client/machines/machines-details.html',
    directives: [RouterLink]
})

@CanActivate(checkPermissions)

export class MachinesDetails extends MeteorComponent {

    public machine: IMachine;

    constructor(
        private params: RouteParams,
        private router: Router
    ) {
        super();

        var machineId = params.get('machineId');
        this.subscribe('machine', machineId, () => {
            this.machine = Machines.findOne(machineId);
        }, true);
    }

    saveMachine(machine: IMachine) {
        Meteor.call('machineUpdate', machine, (err, result) => {
            this.router.navigate(['/MachinesList']);
        });
    }
}
