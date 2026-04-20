import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {theme} from "antd";
import {useEffect, useState, useRef} from "react";

const {useToken} = theme;

const Index = () => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const {token} = useToken();

  // 浮动动画 - 用内联 style + setInterval 驱动
  const [floatUp, setFloatUp] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setFloatUp(prev => !prev);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // 按钮弹跳动画 - 用内联 style + setTimeout 链驱动
  const [btnScale, setBtnScale] = useState(1);
  const clickingRef = useRef(false);

  const handleClick = (e) => {
    if (clickingRef.current) return;
    clickingRef.current = true;

    // 弹跳序列: 1 → 0.88 → 1.08 → 0.97 → 1
    setBtnScale(0.88);
    setTimeout(() => setBtnScale(1.08), 120);
    setTimeout(() => setBtnScale(0.97), 240);
    setTimeout(() => {
      setBtnScale(1);
      clickingRef.current = false;
    }, 360);

    checkStatus();
  };

  const checkStatus = () => {
    if (user.token) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center space-y-6 px-4">
        <h2
          className="text-5xl md:text-6xl font-extrabold text-[#5a7d8f] dark:text-[#D4AF37] tracking-tight"
          style={{
            transform: floatUp ? 'translateY(-10px)' : 'translateY(0)',
            transition: 'transform 1.5s ease-in-out',
          }}>
          McPatch
        </h2>
        <p className={`max-w-2xl mx-auto text-center text-[#636e72] dark:text-[#9E8E6E]`}>
          McPatch 是一个给 Minecraft 客户端做文件更新的独立应用程序.只要你想,你可以通过这个程序向你服务器的玩家提供一切内容.
        </p>
        <button
          onClick={handleClick}
          className="neu-btn-primary px-8 py-3.5 text-base font-medium rounded-full"
          style={{
            transform: `scale(${btnScale})`,
            transition: 'transform 0.12s ease-out',
          }}>
          即刻开始!
        </button>
      </div>
    </>
  );
};

export default Index;
