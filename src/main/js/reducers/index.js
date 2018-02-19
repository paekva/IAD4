import { combineReducers } from 'redux'
import point from './component_reducers/pointReducer'
//import array from './component_reducers/arrayReducer'

export default combineReducers(
    {
        point,
    }
)