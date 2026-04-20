import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {theme} from "antd";
import {useBounceClick, useRipple} from "@/utils/animations.js";

const {useToken} = theme;

const Index = () => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const {token} = useToken();
  const { bounceClass, handleBounceClick, handleAnimationEnd } = useBounceClick();
  const { ripples, addRipple } = useRipple();

  const handleClick = (e) => {
    addRipple(e);
    handleBounceClick(e);
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
          className="text-5xl md:text-6xl font-extrabold text-[#5a7d8f] dark:text-[#D4AF37] tracking-tight neu-float">
          McPatch
        </h2>
        <p className={`max-w-2xl mx-auto text-center text-[#636e72] dark:text-[#9E8E6E]`}>
          McPatch 是一个给 Minecraft 客户端做文件更新的独立应用程序.只要你想,你可以通过这个程序向你服务器的玩家提供一切内容.
        </p>
        <button
          onClick={handleClick}
          onAnimationEnd={handleAnimationEnd}
          className={`neu-btn-primary neu-ripple-container px-8 py-3.5 text-base font-medium rounded-full ${bounceClass}`}>
          即刻开始!
          {ripples.map(r => (
            <span
              key={r.id}
              className="neu-ripple"
              style={{
                left: r.x - r.size / 2,
                top: r.y - r.size / 2,
                width: r.size,
                height: r.size,
              }}
            />
          ))}
        </button>
      </div>
    </>
  );
};

export default Index;
