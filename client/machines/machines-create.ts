import {MeteorComponent} from 'angular2-meteor'
import {AccountsUI} from 'meteor-accounts-ui'
import {InjectUser} from 'meteor-accounts'

import {Component, View} from 'angular2/core';

import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {IMachine, Machines} from 'collections/machines';

@Component({
    selector: 'machines-create'
})

@View({
    templateUrl: '/client/machines/machines-create.html'
})

@InjectUser()

export class MachinesCreate {
    machinesForm: ControlGroup;

    constructor() {
        var fb = new FormBuilder();

        this.machinesForm = fb.group({
            name: ['', Validators.required],
            pressure: [0, Validators.required],
            isOperative: [true]
        })
    }

    addMachine(machine: IMachine) {
        if (!this.machinesForm.valid) {
            return;
        }

        Meteor.call('machineCreate', machine, (err, response) => {
            if (err) {
                return;
            }

            (<Control>this.machinesForm.controls['name']).updateValue('');
            (<Control>this.machinesForm.controls['pressure']).updateValue(0);
            (<Control>this.machinesForm.controls['isOperative']).updateValue(true);
        });
    }
}
