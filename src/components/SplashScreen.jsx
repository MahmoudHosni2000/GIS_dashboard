import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const SplashScreen = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Animations/splash.json')
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen" >
      <div className="w-48 h-48"> {/* حجم أصغر هنا */}
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default SplashScreen;
// style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }