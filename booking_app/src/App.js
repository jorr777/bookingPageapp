import { BrowserRouter, useNavigate } from 'react-router-dom'
// import ProductsPage from './pages/ProductsPage/Products';
import { useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar.js/Navbar';
import './index.css'
import { memo } from 'react';
import AppRoutes from './components/AppRoutes';

const App = memo(function App() {


  useEffect(() => {
    axios.get('http://localhost:5000/products').then(res => {
    }).catch(err => {
      console.log(err);
    })
  }, [])



  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </div>
    </div>
  );
})

export default App;
