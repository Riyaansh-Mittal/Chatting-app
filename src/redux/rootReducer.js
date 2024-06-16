import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import appReducer from './slices/app'
import authReducer from "./slices/auth";
import conversation from "./slices/conversation";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // whitelist: [],
  // blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversation,
});

export { rootPersistConfig, rootReducer };
