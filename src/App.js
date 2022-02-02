import React from 'react';
import { IndexPage } from './pages/indexPage';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './index.css';
import { KonuPage } from './pages/konuPage';
import { PostPage } from './pages/postPage';
import { PrivateRoute } from './provider/private';
import AdminIndex from './pages/admin';
import { NotAuth } from './provider/notauth';
import AdminLogin from './pages/admin/auth/login';

function App() {


   return (
      <BrowserRouter>
         <Route path="/" component={IndexPage} exact />
         <Route path="/konu/:slug" component={KonuPage} exact />
         <Route path="/post/:id" component={PostPage} exact />
         <Switch>
            <NotAuth path="/admin/login" component={AdminLogin}></NotAuth>
            <PrivateRoute path="/admin" component={AdminIndex}></PrivateRoute>
         </Switch>   
      </BrowserRouter>
   );
}

export default App;
