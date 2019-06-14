import { combineReducers } from 'redux';

import {ProjectReducer} from './ProjectReducer';
import {AuthReducer} from './AuthReducer';
import {ErrorReducer} from './ErrorReducer';

const rootReducer = combineReducers({
    projects:ProjectReducer,
    auth: AuthReducer,
    error: ErrorReducer,
  });
  
export default rootReducer;