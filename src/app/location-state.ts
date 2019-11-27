import {Action} from '@ngrx/store'

export const INITIAL_STATE = ''
export const LOCATION_SET = 'LOCATION_SET'


export function locationState(state = INITIAL_STATE, action: any){
    switch(action.type){
        case LOCATION_SET:
            state = action.payload
            return state
        default:
            return INITIAL_STATE
    }
}