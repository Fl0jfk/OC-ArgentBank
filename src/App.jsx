import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './view/homepage/HomePage';
import Footer from './components/footer/footer';
import Header from './components/header/Header';
import './app.scss';
import SignIn from './view/sign-in/Sign-in';
import User from './view/user/User';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/user' element={<User/>}/>
      </Routes>
      <Footer/> 
    </BrowserRouter>
  )
}

export default App
