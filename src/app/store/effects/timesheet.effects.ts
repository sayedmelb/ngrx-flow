import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { LoadTimesheetAction, TimesheetActionTypes, LoadTimesheetSuccessAction, LoadTimesheetFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, UpdateItemAction, UpdateItemSuccessAction, UpdateItemFailureAction } from '../actions/timesheet.actions'
import { of } from 'rxjs';
import { TimesheetService } from 'src/app/timesheet.service';

@Injectable()
export class TimesheetEffects {

  @Effect() loadTimesheet$ = this.actions$
    .pipe(
      ofType<LoadTimesheetAction>(TimesheetActionTypes.LOAD_TIMESHEET),
      mergeMap(
        () => this.TimesheetService.getTimesheetItems()
          .pipe(
            map(data => {
              return new LoadTimesheetSuccessAction(data)
            }),
            catchError(error => of(new LoadTimesheetFailureAction(error)))
          )
      ),
  )

  @Effect() addTimesheetItem$ = this.actions$
    .pipe(
      ofType<AddItemAction>(TimesheetActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this.TimesheetService.addTimesheetItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
  )

  @Effect() UpdateTimesheetItem$ = this.actions$
  .pipe(
    ofType<UpdateItemAction>(TimesheetActionTypes.UPDATE_ITEM),
    mergeMap(
      (data) => this.TimesheetService.updateTimesheetItem(data.payload)
        .pipe(
          map(() => new UpdateItemSuccessAction(data.payload)),
          catchError(error => of(new UpdateItemFailureAction(error)))
        )
    )
)
  
  @Effect() deleteTimesheetItem$ = this.actions$
    .pipe(
      ofType<DeleteItemAction>(TimesheetActionTypes.DELETE_ITEM),
      mergeMap(
        (data) => this.TimesheetService.deleteTimesheetItem(data.payload)
          .pipe(
            map(() => new DeleteItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
    )

  constructor(
    private actions$: Actions,
    private TimesheetService: TimesheetService
  ) { }
}