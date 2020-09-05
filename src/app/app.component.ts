import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';


import { AppState } from './store/models/app-state.model';
import { TimesheetItem } from './store/models/timesheet-item.model';
import { AddItemAction, DeleteItemAction, LoadTimesheetAction, UpdateItemAction } from './store/actions/timesheet.actions';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validator,
  Validators,
} from "@angular/forms";

import {getTimesheetEntryForm} from './forms/timesheet-entry.form'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  timesheetEntryForm: FormGroup;
  
  timesheetItems: Observable<Array<TimesheetItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  newTimesheetItem: TimesheetItem = { id: '', name: '', timesheetTitle: '', timesheetType: '', isSubmit: false, isEdit: false }

  isNew = false;
  txtUpdate = 'Edit';

  constructor(private store: Store<AppState>, private fb: FormBuilder,) { }

  ngOnInit() {
    this.timesheetEntryForm = getTimesheetEntryForm(this.fb);
    this.timesheetItems = this.store.select(store => store.timesheet.list);
    this.loading$ = this.store.select(store => store.timesheet.loading);
    this.error$ = this.store.select(store => store.timesheet.error);

    this.store.dispatch(new LoadTimesheetAction());
  }

  get timesheetTitle() {
    return this.timesheetEntryForm.get("timesheetTitle");
  }
  get timesheetType() {
    return this.timesheetEntryForm.get("timesheetType");
  }

  onNewClick(event) {
    this.isNew= true;

  }
  editTimesheetItem(event, timesheet){
    timesheet.isEdit = true;


  }
  updateTimesheetItem(event, timesheet){
    
      const updatedTimesheetItem = { id: timesheet.id, name: name, timesheetTitle: timesheet.timesheetTitle, timesheetType: timesheet.timesheetType, isSubmit: false, isEdit: false  };
    
      this.store.dispatch(new UpdateItemAction(updatedTimesheetItem));
      timesheet.isEdit = false;
    

  }

  onCancel(event){
    this.timesheetEntryForm.patchValue({ timesheetTitle: "", timesheetType: "" });
    this.isNew = false;


  }

  addItem() {
  this.newTimesheetItem.id = uuid();
  this.newTimesheetItem.timesheetTitle = this.timesheetEntryForm.value.timesheetTitle;
  this.newTimesheetItem.timesheetType = this.timesheetEntryForm.value.timesheetType;
  console.log('timesheetitem', this.newTimesheetItem);

    this.store.dispatch(new AddItemAction(this.newTimesheetItem));

    this.newTimesheetItem = { id: '', name: '', timesheetTitle: '', timesheetType: '', isSubmit: false, isEdit: false  };
    this.timesheetEntryForm.patchValue({ timesheetTitle: "" });
    this.timesheetEntryForm.patchValue({ timesheetType: "" });
    this.isNew=false;

  }
  updateItem(id: string, name: string) {
    const updatedTimesheetItem = { id: id, name: name, timesheetTitle: '', timesheetType: '' , isSubmit: false, isEdit: false  };
    
      this.store.dispatch(new UpdateItemAction(updatedTimesheetItem));
  
      //this.newTimesheetItem = { id: '', name: '' };
    }

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }

  editItem(id: string, name: string) {
    this.newTimesheetItem = { id: id , name: name, timesheetTitle: '', timesheetType: '', isSubmit: false, isEdit: false   };
  }
}
