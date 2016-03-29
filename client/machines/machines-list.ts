import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {MeteorComponent} from 'angular2-meteor';
import {PaginationService, PaginatePipe, PaginationControlsCpm} from 'ng2-pagination';

import {IMachine, Machines} from 'collections/machines';

@Component({
    selector: 'machines-list',
    viewProviders: [PaginationService]
})

@View({
    templateUrl: 'client/machines/machines-list.html',
    directives: [RouterLink, PaginationControlsCpm],
    pipes: [PaginatePipe]
})

export class MachinesList extends MeteorComponent {
    machines: Mongo.Cursor<Machine>;

    pageSize: number = 4;
    currentPage: ReactiveVar<number> = new ReactiveVar<number>(1);
    nameSortOrder: ReactiveVar<number> = new ReactiveVar<number>(1);
    numberOfMachines: number = 0;
    nameQuery: ReactiveVar<string> = new ReactiveVar<string>('');

    constructor() {
        super();

        this.autorun(() => {
            let options = {
                limit: this.pageSize,
                skip: (this.currentPage.get() - 1) * this.pageSize,
                sort: { name: this.nameSortOrder.get() }
            };

            this.subscribe('machines', options, this.nameQuery.get(), () => {
                this.machines = Machines.find({}, { sort: { name: this.nameSortOrder.get() } });
            }, true);
        });

        this.autorun(() => {
            this.numberOfMachines = Counts.get('numberOfMachines');
        }, true);
    }

    changeSortOrder(nameSortOrder: string) {
        this.nameSortOrder.set(parseInt(nameSortOrder, 10));
    }

    removeMachine(machine: IMachine) {
        Meteor.call('machineRemove', machine);
    }

    search(query: string) {
        this.currentPage.set(1);
        this.nameQuery.set(query);
    }

    onPaginationChange(page: number) {
        this.currentPage.set(page);
    }
}
