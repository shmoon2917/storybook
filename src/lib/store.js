import { reducer, defaultTasks } from './redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { enhancer as withReduxEnhancer } from 'addon-redux';

const createMiddlewareEnhancer = () => {
  // const middleware = [];
  if (process.env.NODE_ENV !== 'production') {
    // middleware.push()
  }
  // return applyMiddleware(...middleware);
};

const createEnhancer = () => {
  const enhancers = [];
  // enhancers.push(createMiddlewareEnhancer());
  if (process.env.NODE_ENV !== 'production') {
    // enhancers.push(withReduxEnhancer);
  }
  return compose(...enhancers);
};

export default createStore(reducer, { tasks: defaultTasks }, createEnhancer());
