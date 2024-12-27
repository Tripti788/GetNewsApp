import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import NewsItem from './Components/NewsItem';
import back_vdo from './Components/Assets/backg_vdo.mp4';

function App() {
  const [category,setCategory]= useState("general");
  return (
    <div
    style={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <video
      src={back_vdo}
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      }}
    ></video>
    <Navbar setCategory={setCategory} />
    <NewsBoard
      category={category}
      style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional for better readability
        padding: '20px',
      }}
    />
  </div>
  
  

   
  );
}

export default App;
