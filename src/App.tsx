import { useState } from 'react'
import Manager from './Manager'
import { IntroScreen } from './components/IntroScreen'

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
