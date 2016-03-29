import {Machines} from 'collections/machines';

export function loadMachines() {

    if (Machines.find().count() !== 0) {
        return;
    }

    var machines = [
        {
            name: 'ENGEL 10',
            pressure: 40,
            isOperative: true
        },
        {
            name: 'Brach PX-8',
            pressure: 10,
            isOperative: true
        },
        {
            name: 'ENGEL 20',
            pressure: 45,
            isOperative: false
        }
    ];

    for (var i = 0; i < machines.length; i++) {
        Machines.insert(machines[i]);
    }
}
