import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { burgerAuthActions } from "./store/burgerAuthSlice/burgerAuthSlice";

const App = () => {

  const dispatch = useDispatch()
  const { token, expirationTime } = useSelector(state => state.burgerAuth)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      dispatch(burgerAuthActions.setAutoSighnIn())
      console.log(expirationTime / 1000, new Date().getTime());
      if (token && expirationTime < new Date().getTime()) {
        console.log(expirationTime, new Date().getTime());

        dispatch(burgerAuthActions.setLogout())
      }
      console.log(3600 * 60, (+expirationTime - +new Date().getTime()) / 1000, +expirationTime);
      setTimeout(() => {
        dispatch(burgerAuthActions.setLogout())
      }, (+expirationTime - +new Date().getTime()) / 1000 * 60)
    }
    else {

      setMounted(true);
    }
  }, [expirationTime, dispatch, token, mounted])

  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Routes>
            <Route path="" element={<BurgerBuilder />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate replace to={'/'} />} />

            {
              token ?
                <React.Fragment>
                  <Route path="/checkout/*" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="*" element={<Navigate replace to={'/'} />} />
                </React.Fragment>
                :
                <React.Fragment>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<Navigate replace to={'/'} />} />
                </React.Fragment>
            }
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App
