import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth';
import { login , logout } from './Store/authSlice_store';
import { Footer, Header } from './Components';
import { Outlet } from 'react-router-dom';
// import config from './Config/config'

function App() {
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("Appwrite :: getCurrentUser :: No session found (Guest)");
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);
  
  return !loading ? (
    <div className='min-h-sc flex flex-wrap items-center justify-center content-between 
    bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
