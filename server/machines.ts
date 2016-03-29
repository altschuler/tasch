import {Machines} from 'collections/machines';

function buildQuery(machineId?: string, nameQuery: string = ''): Object {
    var query = {
        $or: [
            { isOperative: true },
            {
                $and: [
                    { owner: this.userId },
                    { owner: { $exists: true } }
                ]
            }
        ]
    }

    let regexQuery = { $regex: '.*' + (nameQuery || '') + '.*', $options: 'i' }

    if (machineId) {
        return { $and: [ { _id: machineId }, query ] };
    }

    return { $and: [ { name: regexQuery }, query ] };
}

Meteor.publish('machines', function(options: Object, nameQuery: string) {
    Counts.publish(this, 'numberOfMachines',
                   Machines.find(buildQuery.call(this, null, nameQuery)),
                   { noReady: true });

    return Machines.find(buildQuery.call(this, null, nameQuery), options);
});

Meteor.publish('machine', function(machineId: string) {
    return Machines.find(buildQuery.call(this, machineId));
});
