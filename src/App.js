import './App.css';
import Home from './Components/Screen/Home';
import AuthProvider from './AuthProvider';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div>
        <Home />
      </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
