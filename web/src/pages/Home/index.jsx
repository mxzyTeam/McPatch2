import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {theme} from "antd";

const {useToken} = theme;

const Index = () => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const {token} = useToken();

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
          className="text-5xl md:text-6xl font-extrabold text-[#5a7d8f] dark:text-[#D4AF37] tracking-tight">
          McPatch
        </h2>
        <p className={`max-w-2xl mx-auto text-center text-[#636e72] dark:text-[#9E8E6E]`}>
          McPatch 是一个给 Minecraft 客户端做文件更新的独立应用程序.只要你想,你可以通过这个程序向你服务器的玩家提供一切内容.
        </p>
        <button
          onClick={() => checkStatus()}
          className="neu-btn-primary px-8 py-3.5 text-base font-medium rounded-full">
          即刻开始!
        </button>
      </div>
    </>
  );
};

export default Index;
