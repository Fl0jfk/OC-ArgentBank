import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './view/homepage/HomePage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './app.scss';
import Sign from './view/sign/Sign';
import User from './view/user/User';
import ErrorPage from './view/errorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/> 
    </BrowserRouter>
  )
}

export default App
