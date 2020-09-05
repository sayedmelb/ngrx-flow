import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimesheetItem } from './store/models/timesheet-item.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private TIMESHEET_URL = "http://localhost:3001/timesheet"

  constructor(private http: HttpClient) { }

  getTimesheetItems() {
    return this.http.get<Array<TimesheetItem>>(this.TIMESHEET_URL)
      .pipe(
      delay(500)
    )
  }

  addTimesheetItem(timesheetItem: TimesheetItem) {
    return this.http.post(this.TIMESHEET_URL, timesheetItem)
      .pipe(
        delay(500)
      )
  }

  updateTimesheetItem(timesheetItem: TimesheetItem) {
    const id = timesheetItem.id;
    console.log('id', id);
    return this.http.put(`${this.TIMESHEET_URL}/${id}`, timesheetItem)
      .pipe(
        delay(500)
      )
  }

  deleteTimesheetItem(id: string) {
    return this.http.delete(`${this.TIMESHEET_URL}/${id}`)
      .pipe(
        delay(500)
      )
  }
}
