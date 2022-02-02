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
import AdminSidebar from './pages/admin/sidebar/sidebar';
import { Navbar } from './components/navbar';

function App() {


   return (
      <BrowserRouter>
         <Route path="/" component={IndexPage} exact />
         <Route path="/konu/:slug" component={KonuPage} exact />
         <Route path="/post/:id" component={PostPage} exact />
         <NotAuth path="/admin/login" component={AdminLogin}></NotAuth>
         <Switch>
            <div style={{ color: 'white' }}>
               <Navbar></Navbar>
               <div className='admin-area'>
                  <AdminSidebar />
                  <PrivateRoute path="/admin" component={AdminIndex}></PrivateRoute>
               </div>
            </div>
         </Switch>
      </BrowserRouter>
   );
}

export default App;
