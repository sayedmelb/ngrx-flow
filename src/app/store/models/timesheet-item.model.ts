export interface TimesheetItem {
  id?: string;
  name: string;
  timesheetTitle: string;
  timesheetType: string;
   timesheetDate: string;
   timesheetDuration: string;
  
  timesheetRate: string;
  timesheetDayTotal: string;
  isSubmit: boolean;
  isEdit: boolean;
  state: string;
}
