import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';

function App() {
  const [category, setCategory] = useState("general");

  const backgroundStyle = {
    backgroundImage: "linear-gradient(to right, #6FE6FC, white, #6FE6FC)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <div style={backgroundStyle}>
      <Navbar setCategory={setCategory} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
      }}>
        <NewsBoard category={category} />
      </div>
    </div>
  );
}

export default App;
