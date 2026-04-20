import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppWindow, CircleHelp, CircleUserRound, Folder, LogOut, ScrollText, Settings} from "lucide-react";
import {userCheckTokenRequest, userSignOutRequest} from "@/api/user.js";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {clearToken} from "@/store/modules/userStore.js";
import {useEffect} from "react";

const navs = [
  {
    nav: '/dashboard',
    name: '概览',
    icon: <AppWindow size={16} strokeWidth={1.5}/>
  },
  {
    nav: '/dashboard/directory',
    name: '目录',
    icon: <Folder size={16} strokeWidth={1.5}/>
  },
  {
    nav: '/dashboard/log',
    name: '日志',
    icon: <ScrollText size={16} strokeWidth={1.5}/>
  }
]

const navsFooter = [
  {
    nav: '/dashboard/help',
    name: '帮助',
    icon: <CircleHelp size={16} strokeWidth={1.5}/>
  },
  {
    nav: '/dashboard/settings',
    name: '设置',
    icon: <Settings size={16} strokeWidth={1.5}/>
  }
]

const Index = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    if (!user.token) {
      navigate("/login?type=notLogin");
    }

    const {code, msg, data} = await userCheckTokenRequest();
    if (code !== 1) {
      dispatch(clearToken())
      navigate('/login?type=checkToken');
    }
  }

  const signOut = async () => {
    const {code, msg, data} = await userSignOutRequest()
    if (code === 1) {
      dispatch(clearToken())
      navigate('/login?type=signOut');
    } else {
      messageApi.error(msg)
    }
  }

  return (
    <>
      {contextHolder}
      <div className="flex">
        <div
          className="fixed top-0 left-0 w-full h-full sm:w-60 p-4">
          <div className="neomorphic h-full flex flex-col">
            <div className='h-20 flex justify-center items-center px-8'>
              <div className='flex-none cursor-pointer' onClick={() => navigate('/')}>
                <div className="text-3xl font-bold text-gray-700 dark:text-white">McPatch</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1 space-y-3">
                {
                  navs.map((item, idx) => {
                    const isActive = location.pathname === item.nav
                    return (
                      <li key={idx}>
                        <div onClick={() => navigate(item.nav)}
                             className={`neomorphic-button flex items-center gap-x-2 text-gray-600 dark:text-white p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'box-shadow: inset 4px 4px 8px rgba(174, 174, 192, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.8)' : ''}`}>
                          <div className="text-gray-500 dark:text-white">{item.icon}</div>
                          {item.name}
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="pt-4">
                <ul className="px-4 pb-4 text-sm font-medium space-y-3">
                  {
                    navsFooter.map((item, idx) => {
                      const isActive = location.pathname === item.nav
                      return (
                        <li key={idx}>
                          <div onClick={() => navigate(item.nav)}
                               className={`neomorphic-button flex items-center gap-x-2 text-gray-600 dark:text-white p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'box-shadow: inset 4px 4px 8px rgba(174, 174, 192, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.8)' : ''}`}>
                            <div className="text-gray-500 dark:text-white">{item.icon}</div>
                            {item.name}
                          </div>
                        </li>
                      )
                    })
                  }
                  <li>
                    <div
                      onClick={() => signOut()}
                      className={`neomorphic-button flex items-center gap-x-2 text-gray-600 dark:text-white p-3 rounded-lg cursor-pointer transition-all`}>
                      <div className="text-gray-500 dark:text-white"><LogOut size={16} strokeWidth={1.5}/></div>
                      退出登录
                    </div>
                  </li>
                </ul>
                <div className="py-4 px-4">
                  <div className="neomorphic p-4 rounded-lg flex items-center gap-x-4">
                    {/*<img src="" className="w-12 h-12 rounded-full"/>*/}
                    <CircleUserRound className="dark:text-white" size={40} strokeWidth={1.0}/>
                    <div>
                      <span className="block text-gray-700 dark:text-white text-sm font-semibold">ADMIN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-60 flex-grow p-6">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Index;
