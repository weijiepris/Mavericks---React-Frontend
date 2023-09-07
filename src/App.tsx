import React, { FC } from 'react'
import './App.css';
import Navigation from './components/common/Navigation/Navigation';
import Main from './components/main/Main';
import { Route, Routes } from 'react-router-dom';
import AddEmployee from './components/employee/AddEmployee/AddEmployee';

const App: FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/Add" element={<AddEmployee />}></Route>
      </Routes>
    </>
  );
}

export default App;
