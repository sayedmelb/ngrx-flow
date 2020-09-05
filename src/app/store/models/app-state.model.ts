import { TimesheetState } from '../reducers/timesheet.reducer';

export interface AppState {
  readonly timesheet: TimesheetState
}