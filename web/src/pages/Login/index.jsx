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
        <div className="neomorphic max-w-sm w-full text-gray-500 dark:text-white space-y-8 p-8 fade-in">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-700 dark:text-white">McPatch</div>
          </div>
          <form
            onSubmit={login}
            className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                用户名
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                required
                className="neomorphic-input w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                密码
              </label>
              <input
                name="password"
                type="password"
                required
                className="neomorphic-input w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#"
                 className="text-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-all">忘记密码?</a>
            </div>
            <button
              className="neomorphic-button w-full px-4 py-3 text-gray-700 font-medium"
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
