import { useEffect, useState } from "react";
import './IntroScreen.css'

export function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish])

  if (!visible) return null;

  return (
    <div className="intro-screen">
      <h1 className="intro-text">Your time has come.</h1>
    </div>
  );

}