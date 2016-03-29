export interface IMachine {
    _id?: string;
    owner?: string;
    name: string;
    pressure: number;
    isOperative: boolean;
}

export var Machines = new Mongo.Collection<IMachine>('machines');

Machines.allow({
    insert: () => {
        var user = Meteor.user();
        return !!user;
    },
    update: () => {
        var user = Meteor.user();
        return !!user;
    },
    remove: () => {
        var user = Meteor.user();
        return !!user;
    },
})

Meteor.methods({
    machineUpdate: function(machine: IMachine) {
        if (!Meteor.userId()) {
            return;
        }

        Machines.update(machine._id, {
            $set: {
                name: machine.name,
                pressure: machine.pressure,
                isOperative: machine.isOperative
            }
        });
    },

    machineCreate: function(machine: IMachine) {
        if (!Meteor.userId()) {
            return;
        }

        Machines.insert({
            name: machine.name,
            pressure: machine.pressure,
            isOperative: machine.isOperative,
            owner: Meteor.userId()
        });
    },

    machineRemove: function(machine: IMachine) {
        if (!Meteor.userId()) {
            return;
        }

        Machines.remove(machine._id);
    }
})
