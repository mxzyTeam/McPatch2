import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "@/store/modules/userStore.js";
import {message} from "antd";
import {useEffect, useState} from "react";

const Index = () => {

  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.username) {
      setUsername(user.username);
    }

    const type = params.get('type');
    switch (type) {
      case 'signOut':
        messageApi.success('退出成功!');
        break;
      case 'changeUsername':
        messageApi.success('修改用户名成功!');
        break;
      case 'changePassword':
        messageApi.success('修改密码成功!');
        break;
      case 'notLogin':
        messageApi.success('请先登录!');
        break;
      case 'checkToken':
        messageApi.success('Token无效!');
        break;
    }
  }, []);

  const login = async (e) => {
    e.preventDefault()

    const password = e.target[1].value

    const {flag, msg} = await dispatch(userLogin(username, password));
    if (flag) {
      navigate('/dashboard');
    } else {
      messageApi.error(msg);
    }
  }

  return (
    <>
      {contextHolder}
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-[#636e72] dark:text-[#9E8E6E] space-y-5 neu-card-enter">
          <div className="text-center pb-8">
            <div className="text-4xl font-bold text-[#5a7d8f] dark:text-[#D4AF37]">McPatch</div>
          </div>
          <form
            onSubmit={login}
            className="space-y-5">
            <div>
              <label>
                用户名
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                required
                className="neu-input w-full mt-2 px-4 py-3 text-[#2d3436] dark:text-[#E8D5A3] placeholder:text-[#636e72] dark:placeholder:text-[#9E8E6E]"
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <label>
                密码
              </label>
              <input
                name="password"
                type="password"
                required
                className="neu-input w-full mt-2 px-4 py-3 text-[#2d3436] dark:text-[#E8D5A3] placeholder:text-[#636e72] dark:placeholder:text-[#9E8E6E]"
                placeholder="请输入密码"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#"
                 className="text-center text-[#5a7d8f] dark:text-[#D4AF37] hover:text-[#7fa8bc] dark:hover:text-[#D4AF37] transition-colors duration-200">忘记密码?</a>
            </div>
            <button
              className="neu-btn-primary neu-btn-click w-full px-4 py-3 font-medium"
              type="submit">
              登录
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
