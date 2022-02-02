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
import BoardIndex from './pages/admin/board';
import BoardNew from './pages/admin/board/new';
import BoardEdit from './pages/admin/board/edit';
import UsersIndex from './pages/admin/users';
import UserNew from './pages/admin/user/new';
import UserEdit from './pages/admin/user/edit';

function App() {


   return (
      <BrowserRouter>

         <Route path="/" component={IndexPage} exact />
         <Route path="/konu/:slug" component={KonuPage} exact />
         <Route path="/post/:id" component={PostPage} exact />
         <NotAuth path="/admin/login" component={AdminLogin}></NotAuth>
         <Switch exact>
            <PrivateRoute path="/admin*">
               <div style={{ color: 'white' }}>
                  <Navbar></Navbar>
                  <div className='admin-area' exact>
                     <AdminSidebar exact />
                     <PrivateRoute path="/admin" component={AdminIndex} exact></PrivateRoute>
                     <PrivateRoute path="/admin/board" component={BoardIndex} exact></PrivateRoute>
                     <PrivateRoute path="/admin/board/new" component={BoardNew}></PrivateRoute>
                     <PrivateRoute path="/admin/board/edit/:boardslug" component={BoardEdit}></PrivateRoute>
                     <PrivateRoute path="/admin/users" component={UsersIndex} exact></PrivateRoute>
                     <PrivateRoute path="/admin/user/new" component={UserNew} exact></PrivateRoute>
                     <PrivateRoute path="/admin/user/edit/:id" component={UserEdit}></PrivateRoute>
                  </div>
               </div>
            </PrivateRoute>
         </Switch>
      </BrowserRouter>
   );
}

export default App;
