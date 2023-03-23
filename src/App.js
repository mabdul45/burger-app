import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Routes>
            <Route path="" element={<BurgerBuilder />} />
            <Route path="/checkout/*" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/auth" element={props => <Auth />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
