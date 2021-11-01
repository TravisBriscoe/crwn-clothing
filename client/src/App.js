import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/header/header.component.jsx';
import Spinner from './components/spinner/spinner.component.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component.jsx';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

// Lazy loading
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-sign-up/sign-in-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (    
    <div>
      <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />       
            </Suspense>
          </ErrorBoundary>
        </Switch>
    </div>
  );
}

export default App;