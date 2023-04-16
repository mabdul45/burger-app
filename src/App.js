import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth'
import { useSelector } from "react-redux";

const App = () => {

  const { token } = useSelector(state => state.burgerAuth)

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

export default App;
