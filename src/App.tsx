import './App.css'
import CreateService from './pages/create-service/create-service'
import Register from "./pages/login/register";
import "./App.css";
import Cart from './pages/cart/cart';

function App() {
  return (
    <>
      <Register /> 
      <hr></hr>
      <CreateService />
      <hr></hr>
      <Cart />
    </>
  );
}

export default App;