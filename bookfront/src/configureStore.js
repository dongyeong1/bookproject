
///

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer, { rootSaga } from ".";
import rootReducer from "./reducer";
import rootSaga from "./sagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  //이제 선언한 모든 Saga를 미들웨어에 등록하고 미들웨어는 계속해서 액션을 감지한다.
  sagaMiddleware.run(rootSaga);

  return store;
}


// import { createStore, applyMiddleware, combineReducers } from "redux";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import post, { rootSaga } from "./modules/post/sagaReducer";

// const sagaMiddleware = createSagaMiddleware();

// const rootReducer = combineReducers({ post });

// export default createStore(
//   rootReducer,
//   applyMiddleware(sagaMiddleware, logger)
// ); // 두 번째 인수는 초기 상태를 지정할 수 있음

// sagaMiddleware.run(rootSaga);