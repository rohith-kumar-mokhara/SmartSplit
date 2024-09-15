import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import  Home  from "./pages/home/Home"
import CreateGroup from './pages/creatingGroup/creatingGroup'
import Contribute from './pages/contribute/contribute'
import GroupDetails from './pages/groupDetails/groupDetails'
import UserDashboard from './pages/dashboard/dashboard'

function App() {

  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<Home />} />
    <Route path = "/createGroup" element = {<CreateGroup/>} />
    <Route path = "/contribute" element = {<Contribute/>} />
    <Route path = "/groupDetails" element = {<GroupDetails/>} />
    <Route path = "/dashboard" element = {<UserDashboard/>} />

  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
