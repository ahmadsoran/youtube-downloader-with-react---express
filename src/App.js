import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllRoutes from './routes/Route.jsx';


function App() {
  const darkmode = useSelector((state) => state.DarkModeSlice.isDarkMode)
  useEffect(() => {


    if (darkmode === 'dark') {
      document.querySelector('html')?.classList.add('dark');
      document.querySelector('body')?.classList.add('dark:bg-slate-900');
    }
    else {
      document.querySelector('html')?.classList.remove('dark');
    }

  }, [darkmode])




  return <AllRoutes />
}

export default App;
