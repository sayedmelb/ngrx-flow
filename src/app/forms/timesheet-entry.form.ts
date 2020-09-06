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
    timesheetType:  new FormControl(null, [Validators.required]),
    timesheetDuration: new FormControl(null, [Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")]),
    timesheetHourlyRate: new FormControl(null, [Validators.required]),
    timesheetDayTotal: new FormControl(null)
  });
}
// ^\d*\.?\d{0,2}$
// ^\d$
// "^[0-9]+$"