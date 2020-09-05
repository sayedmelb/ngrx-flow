import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { AppState } from './store/models/app-state.model';
import { TimesheetItem } from './store/models/timesheet-item.model';
import { AddItemAction, DeleteItemAction, LoadTimesheetAction, UpdateItemAction } from './store/actions/timesheet.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  timesheetItems: Observable<Array<TimesheetItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  newTimesheetItem: TimesheetItem = { id: '', name: '' }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.timesheetItems = this.store.select(store => store.timesheet.list);
    this.loading$ = this.store.select(store => store.timesheet.loading);
    this.error$ = this.store.select(store => store.timesheet.error);

    this.store.dispatch(new LoadTimesheetAction());
  }

  addItem() {
  this.newTimesheetItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newTimesheetItem));

    this.newTimesheetItem = { id: '', name: '' };
  }
  updateItem(id: string, name: string) {
    const updatedTimesheetItem = { id: id, name: name };
    
      this.store.dispatch(new UpdateItemAction(updatedTimesheetItem));
  
      //this.newTimesheetItem = { id: '', name: '' };
    }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
  editItem(id: string, name: string) {
    this.newTimesheetItem = { id: id , name: name };
  }
}
