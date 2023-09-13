import React, { FC, useEffect } from 'react'
import './App.css';
import Navigation from './components/common/Navigation/Navigation';
import Main from './components/main/Main';
import { Route, Routes } from 'react-router-dom';
import AddEmployee from './components/employee/AddEmployee/AddEmployee';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { authActions } from './store/store';
import { verify } from './components/actions';

const App: FC = () => {

  const authenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';
    if (!token) {
      dispatch(authActions.setAuthenticated(false));
    }

    verify(token).then(res => {
      dispatch(authActions.setAuthenticated(true));
    }).catch(err => {
      dispatch(authActions.setAuthenticated(false));
      localStorage.removeItem('token')
    });
  }, [])

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        {authenticated ? <Route path="/Employee" element={<AddEmployee />}></Route> : <></>}
        {!authenticated ?
          <>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </>
          :
          <></>}
      </Routes >
    </>
  );
}

export default App;
