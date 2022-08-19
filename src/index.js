import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import AllTasks from './components/AllTasks.js'
import FavTasks from './components/FavTasks.js'
import DeletedTasks from './components/DeletedTasks.js'
import Groups from './components/Groups.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<AllTasks />} />
        <Route path="/home/all" element={<AllTasks />} />
        <Route path="/home/favorites" element={<FavTasks />} />
        <Route path="/home/deleted" element={<DeletedTasks />} />
        <Route path="/home/groups" element={<Groups />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  </Routes>
  </BrowserRouter>
);

