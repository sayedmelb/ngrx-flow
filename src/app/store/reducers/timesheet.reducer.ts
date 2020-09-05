import { TimesheetActionTypes, TimesheetAction } from '../actions/timesheet.actions';
import { TimesheetItem } from '../models/timesheet-item.model';

export interface TimesheetState {
  list: TimesheetItem[],
  loading: boolean,
  error: Error;
}


const initialState: TimesheetState = {
  list: [],
  loading: false,
  error: undefined
};

export function TimesheetReducer(state: TimesheetState = initialState, action: TimesheetAction) {
  switch (action.type) {
    case TimesheetActionTypes.LOAD_TIMESHEET:
      return {
        ...state,
        loading: true
      }
    case TimesheetActionTypes.LOAD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    
    case TimesheetActionTypes.LOAD_TIMESHEET_FAILURE: 
      return {
        ...state,
        error: action.payload
      }
    
    case TimesheetActionTypes.ADD_ITEM:
      return {
        ...state,
        loading: true
      }
    case TimesheetActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case TimesheetActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

      case TimesheetActionTypes.UPDATE_ITEM:
        return {
          ...state,
          loading: true
        }
      case TimesheetActionTypes.UPDATE_ITEM_SUCCESS:
        return {
          ...state,
         //  list: [...state.list, action.payload],
          loading: false
        };
      case TimesheetActionTypes.UPDATE_ITEM_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      
    case TimesheetActionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true
      };
    case TimesheetActionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      }
    case TimesheetActionTypes.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}