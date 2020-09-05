
import { Action } from '@ngrx/store';
import { TimesheetItem } from '../models/timesheet-item.model';

export enum TimesheetActionTypes {
  LOAD_TIMESHEET = '[TIMESHEET] Load Timesheet',
  LOAD_TIMESHEET_SUCCESS = '[TIMESHEET] Load Timesheet Success',
  LOAD_TIMESHEET_FAILURE = '[TIMESHEET] Load Timesheet Failure',
  ADD_ITEM = '[TIMESHEET] Add Item',
  ADD_ITEM_SUCCESS = '[TIMESHEET] Add Item Success',
  ADD_ITEM_FAILURE = '[TIMESHEET] Add Item Failure',
  UPDATE_ITEM = '[TIMESHEET] Update Item',
  UPDATE_ITEM_SUCCESS = '[TIMESHEET] Update Item Success',
  UPDATE_ITEM_FAILURE = '[TIMESHEET] Update Item Failure',
  DELETE_ITEM = '[TIMESHEET] Delete Item',
  DELETE_ITEM_SUCCESS = '[TIMESHEET] Delete Item Success',
  DELETE_ITEM_FAILURE = '[TIMESHEET] Delete Item Failure'
}

export class LoadTimesheetAction implements Action {
  readonly type = TimesheetActionTypes.LOAD_TIMESHEET
}
export class LoadTimesheetSuccessAction implements Action {
  readonly type = TimesheetActionTypes.LOAD_TIMESHEET_SUCCESS

  constructor(public payload: Array<TimesheetItem>) {}

}
export class LoadTimesheetFailureAction implements Action {
  readonly type = TimesheetActionTypes.LOAD_TIMESHEET_FAILURE
  
  constructor(public payload: string) {}
}

export class AddItemAction implements Action {
  readonly type = TimesheetActionTypes.ADD_ITEM

  constructor(public payload: TimesheetItem) { }
}
export class AddItemSuccessAction implements Action {
  readonly type = TimesheetActionTypes.ADD_ITEM_SUCCESS

  constructor(public payload: TimesheetItem) { }
}
export class AddItemFailureAction implements Action {
  readonly type = TimesheetActionTypes.ADD_ITEM_FAILURE

  constructor(public payload: Error) { }
}


export class UpdateItemAction implements Action {
  readonly type = TimesheetActionTypes.UPDATE_ITEM

  constructor(public payload: TimesheetItem) { }
}
export class UpdateItemSuccessAction implements Action {
  readonly type = TimesheetActionTypes.UPDATE_ITEM_SUCCESS

  constructor(public payload: TimesheetItem) { }
}
export class UpdateItemFailureAction implements Action {
  readonly type = TimesheetActionTypes.UPDATE_ITEM_FAILURE

  constructor(public payload: Error) { }
}

export class DeleteItemAction implements Action {
  readonly type = TimesheetActionTypes.DELETE_ITEM

  constructor(public payload: string) { }
}

export class DeleteItemSuccessAction implements Action {
  readonly type = TimesheetActionTypes.DELETE_ITEM_SUCCESS

  constructor(public payload: string) { }
}
export class DeleteItemFailureAction implements Action {
  readonly type = TimesheetActionTypes.DELETE_ITEM_FAILURE

  constructor(public payload: string) { }
}

export type TimesheetAction = AddItemAction |
  AddItemSuccessAction |
  AddItemFailureAction |
  UpdateItemAction |
  UpdateItemSuccessAction |
  UpdateItemFailureAction |
  DeleteItemAction |
  DeleteItemSuccessAction |
  DeleteItemFailureAction |
  LoadTimesheetAction |
  LoadTimesheetFailureAction |
  LoadTimesheetSuccessAction
