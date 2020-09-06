import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

export function getTimesheetEntryForm(fb: FormBuilder): FormGroup {
  return fb.group({
    timesheetId: new FormControl(null),
    timesheetTitle: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    timesheetDate: new FormControl((new Date()).toISOString().substring(0,10)),
    timesheetState: new FormControl(null),
    timesheetType: new FormControl(null),
    timesheetDuration: new FormControl(null),
    timesheetHourlyRate: new FormControl(null),
    timesheetDayTotal: new FormControl(null)
  });
}
