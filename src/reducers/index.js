import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import dataReducer from './data_reducer';
import styleReducer from './style_reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth:authReducer,
  data:dataReducer,
  style:styleReducer,
  form:formReducer
});

export default rootReducer;
