import { useState } from 'react'
import './App.css'
import Manager from './Manager'
import { IntroScreen } from './IntroScreen'


function App() {
  const [showIntro, setShowIntro] = useState(true);


  return (
    <>
      {showIntro ? (
        <IntroScreen onFinish={() => setShowIntro(false)} />
      ) : (
      <Manager />
      )}
    </>
    
    );
}

export default App
