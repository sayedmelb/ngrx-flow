import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { v4 as uuid } from "uuid";

import { AppState } from "./store/models/app-state.model";
import { TimesheetItem } from "./store/models/timesheet-item.model";
import {
  AddItemAction,
  DeleteItemAction,
  LoadTimesheetAction,
  UpdateItemAction,
} from "./store/actions/timesheet.actions";
import * as _ from "lodash";
import orderBy from "lodash/orderBy";

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validator,
  Validators,
} from "@angular/forms";

import { getTimesheetEntryForm } from "./forms/timesheet-entry.form";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  timesheetEntryForm: FormGroup;

  timesheetItems: Observable<Array<TimesheetItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newTimesheetItem: TimesheetItem = {
    id: "",
    name: "",
    timesheetDate: "",
    timesheetTitle: "",
    timesheetType: "",
    timesheetDuration: "",
    timesheetRate: "250.50",
    timesheetDayTotal: "",
    isSubmit: false,
    isEdit: false,
    state: "Active",
  };

  isNew = false;
  txtUpdate = "Edit";
  selectedItem = "";
  itemforSubmit = {};
  taskTypes = ["Telephone Call", "Drafting document", "Research"];
  defaultType = "Research";

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.timesheetEntryForm = getTimesheetEntryForm(this.fb);
    this.timesheetEntryForm.patchValue({ timesheetHourlyRate: "250.50" });
    this.timesheetItems =this.store.select((store) => store.timesheet.list);
  //  this.timesheetItems = this.store.select((store) => store.timesheetDate.list);
   // this.timesheetItems = orderListing(tempList,'timesheetDate','desc')
    this.loading$ = this.store.select((store) => store.timesheet.loading);
    this.error$ = this.store.select((store) => store.timesheet.error);

    this.store.dispatch(new LoadTimesheetAction());
  }

  get timesheetTitle() {
    return this.timesheetEntryForm.get("timesheetTitle");
  }
  get timesheetType() {
    return this.timesheetEntryForm.get("timesheetType");
  }
  get timesheetHourlyRate() {
    return this.timesheetEntryForm.get("timesheetHourlyRate");
  }
  get timesheetDayTotal() {
    return this.timesheetEntryForm.get("timesheetDayTotal");
  }
  get timesheetDate() {
    return this.timesheetEntryForm.get("timesheetDate");
  }
  get timesheetDuration() {
    return this.timesheetEntryForm.get("timesheetDuration");
  }

  onNewClick(event) {
    this.isNew = true;
  }
  editTimesheetItem(event, timesheet) {
    timesheet.isEdit = true;
    // this.defaultType = timesheet.timesheetType;
  }
  onOptionsSelected(val, timesheet) {
    timesheet.timesheetType = val;
  }
  updateTimesheetItem(event, timesheet) {
    const updatedTimesheetItem = {
      id: timesheet.id,
      name: name,
      timesheetDate: timesheet.timesheetDate,
      timesheetTitle: timesheet.timesheetTitle,
      timesheetType: timesheet.timesheetType,
      timesheetDuration: timesheet.timesheetDuration,
      timesheetRate: timesheet.timesheetRate,
      timesheetDayTotal: timesheet.timesheetDayTotal,
      isSubmit: false,
      isEdit: false,
      state: "Active",
    };

    this.store.dispatch(new UpdateItemAction(updatedTimesheetItem));
    timesheet.isEdit = false;
  }

  onCancel(event) {
    this.timesheetEntryForm.patchValue({
      timesheetTitle: "",
      timesheetType: "",
    });
    this.timesheetEntryForm.patchValue({ timesheetDuration: "" });
    this.timesheetEntryForm.patchValue({ timesheetDayTotal: "" });
    this.timesheetEntryForm.patchValue({ timesheetHourlyRate: "250.50" });

    this.isNew = false;
  }

  addItem() {
    this.newTimesheetItem.id = uuid();
    this.newTimesheetItem.timesheetTitle = this.timesheetEntryForm.value.timesheetTitle;
    this.newTimesheetItem.timesheetType = this.timesheetEntryForm.value.timesheetType;
    this.newTimesheetItem.timesheetRate = this.timesheetEntryForm.value.timesheetHourlyRate;
    this.newTimesheetItem.timesheetDayTotal = this.timesheetEntryForm.value.timesheetDayTotal;
    this.newTimesheetItem.timesheetDate = this.timesheetEntryForm.value.timesheetDate;
    this.newTimesheetItem.timesheetDuration = this.timesheetEntryForm.value.timesheetDuration;

    
    this.store.dispatch(new AddItemAction(this.newTimesheetItem));

    this.newTimesheetItem = {
      id: "",
      name: "",
      timesheetDate: "",
      timesheetTitle: "",
      timesheetType: "",
      timesheetDuration: "",
      timesheetRate: "",
      timesheetDayTotal: "",
      isSubmit: false,
      isEdit: false,
      state: "Active",
    };
    this.timesheetEntryForm.patchValue({ timesheetTitle: "" });
    this.timesheetEntryForm.patchValue({ timesheetType: "" });
    this.timesheetEntryForm.patchValue({ timesheetDuration: "" });
    this.timesheetEntryForm.patchValue({ timesheetDayTotal: "" });
    this.timesheetEntryForm.patchValue({ timesheetHourlyRate: "250.00" });

    this.timesheetEntryForm.controls['timesheetTitle'].setErrors({'incorrect': false});
    this.timesheetEntryForm.controls['timesheetTitle'].setErrors({});
    
    //this.timesheetEntryForm.valid
    this.isNew = false;
  }
  

  deleteItem(id: string) {
    if(confirm("Are you sure you want to delete this timesheet entry? ")) {
      this.store.dispatch(new DeleteItemAction(id));
    }
    
  }

  editItem(id: string, name: string) {
    this.newTimesheetItem = {
      id: id,
      name: name,
      timesheetDate: "",
      timesheetTitle: "",
      timesheetType: "",
      timesheetDuration: "",
      timesheetRate: "",
      timesheetDayTotal: "",
      isSubmit: false,
      isEdit: false,
      state: "Active",
    };
  }

  onSelectedRow(timesheetItem) {
    if (this.selectedItem === timesheetItem.id) {
      this.selectedItem = "";
    } else {
      this.selectedItem = timesheetItem.id;
      this.itemforSubmit = timesheetItem;
    }
  }

  onItemSubmit(timesheet) {
    if (this.selectedItem !== "") {
      const updatedTimesheetItemforSubmit = {
        id: timesheet.id,
        name: name,
        timesheetDate: timesheet.timesheetDate,
        timesheetTitle: timesheet.timesheetTitle,
        timesheetType: timesheet.timesheetType,
        timesheetDuration: timesheet.timesheetDuration,
        timesheetRate: timesheet.timesheetRate,
        timesheetDayTotal: timesheet.timesheetDayTotal,
        isSubmit: false,
        isEdit: false,
        state: "Submitted",
      };
      this.store.dispatch(new UpdateItemAction(updatedTimesheetItemforSubmit));
      timesheet.state = "Submitted";
      this.selectedItem = "";
    }
  }

  calculateRate(event) {
    if (this.timesheetEntryForm.valid) {
      let tot: number;
      tot = this.calculateTotal(
        this.timesheetEntryForm.value.timesheetDuration,
        this.timesheetEntryForm.value.timesheetHourlyRate
      );
      this.timesheetEntryForm.patchValue({ timesheetDayTotal: tot.toFixed(2) });
    }
  }

  calculateUpdatedRate(event, timesheet) {
    timesheet.timesheetDayTotal = this.calculateTotal(
      timesheet.timesheetDuration,
      timesheet.timesheetRate
    ).toFixed(2);
  }

  calculateTotal(duration, rate) {
    let numarray = duration.split(":");
    let a = new Array();
    a = numarray;
    let hours: number = parseFloat(a[0]);
    let minutes: number = parseFloat(a[1]);
    let fract: number = 0.0;
    if (minutes > 0 && minutes <= 15) {
      fract = 0.25;
    } else if (minutes > 15 && minutes <= 30) {
      fract = 0.5;
    } else if (minutes > 30 && minutes <= 45) {
      fract = 0.75;
    } else {
      fract = 1.0;
    }

    let roundedHours: number = fract + hours;
    let total: number = 0.0;
    total = roundedHours * parseFloat(rate);
   
    return total;
  }


  

}

export function orderListing(list: any, field, order) {
  return orderBy(list, [(li) => li[field]], [order]);
}
