import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import logger from "redux-logger";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducer';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();



// const enhancer =
//   process.env.NODE_ENV === "production"
//     ? compose(applyMiddleware(sagaMiddleware))
//     : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));


sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //provier 컴포넌트로 store 에 접근
      <Provider store={store}> 
      
              <App />
      </Provider>,
  );
reportWebVitals();

