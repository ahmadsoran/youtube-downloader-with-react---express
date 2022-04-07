import React, { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import AllRoutes from './routes/AllRoutes';


function App() {
  const darkmode = useAppSelector((state) => state.DarkModeSlice.isDarkMode)
  console.log(darkmode)
  useEffect(() => {


    if (darkmode === 'dark') {
      document.querySelector('html')?.classList.add('dark');
      document.querySelector('body')?.classList.add('dark:bg-slate-900');
    }
    else {
      document.querySelector('html')?.classList.remove('dark');
    }

  }, [darkmode])




  return (
    <AllRoutes />
  );
}

export default App;
