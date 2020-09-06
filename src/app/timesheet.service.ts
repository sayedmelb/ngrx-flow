import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimesheetItem } from './store/models/timesheet-item.model';
import { delay } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import {environment} from './../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

 
  constructor(private http: HttpClient) { }

 
  getTimesheetItems() {
    return this.http.get<Array<TimesheetItem>>(environment.TIMESHEET_URL)
      .pipe(
      delay(500)
    )
    
  }


  addTimesheetItem(timesheetItem: TimesheetItem) {
    return this.http.post(environment.TIMESHEET_URL, timesheetItem)
      .pipe(
        delay(500)
      )
  }

  updateTimesheetItem(timesheetItem: TimesheetItem) {
    const id = timesheetItem.id;
    console.log('id', id);
    return this.http.put(`${environment.TIMESHEET_URL}/${id}`, timesheetItem)
      .pipe(
        delay(500)
      )
  }

  deleteTimesheetItem(id: string) {
    return this.http.delete(`${environment.TIMESHEET_URL}/${id}`)
      .pipe(
        delay(500)
      )
  }
}
