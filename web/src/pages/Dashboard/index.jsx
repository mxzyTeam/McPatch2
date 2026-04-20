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
          className="fixed top-0 left-0 w-full h-full sm:w-60 neu-raised rounded-none rounded-r-2xl">
          <div className="flex flex-col h-full">
            <div className='h-20 flex justify-center items-center px-8'>
              <div className='flex-none cursor-pointer' onClick={() => navigate('/')}>
                <div className="text-3xl font-bold text-[#5a7d8f] dark:text-[#D4AF37]">McPatch</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {
                  navs.map((item, idx) => {
                    const isActive = location.pathname === item.nav
                    return (
                      <li key={idx}>
                        <div onClick={() => navigate(item.nav)}
                             className={`neu-nav-item flex items-center gap-x-2 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                               isActive
                                 ? 'neu-nav-active neu-inset-sm text-[#5a7d8f] dark:text-[#D4AF37] font-semibold'
                                 : 'text-[#636e72] dark:text-[#9E8E6E] hover:text-[#2d3436] dark:hover:text-[#E8D5A3]'
                             }`}
                             style={!isActive ? {boxShadow: '3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light)', background: 'transparent'} : undefined}>
                          <div className={isActive ? 'text-[#5a7d8f] dark:text-[#D4AF37]' : 'text-[#636e72] dark:text-[#9E8E6E]'}>{item.icon}</div>
                          {item.name}
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <div>
                <ul className="px-4 pb-4 text-sm font-medium">
                  {
                    navsFooter.map((item, idx) => {
                      const isActive = location.pathname === item.nav
                      return (
                        <li key={idx}>
                          <div onClick={() => navigate(item.nav)}
                               className={`neu-nav-item flex items-center gap-x-2 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                                 isActive
                                   ? 'neu-nav-active neu-inset-sm text-[#5a7d8f] dark:text-[#D4AF37] font-semibold'
                                   : 'text-[#636e72] dark:text-[#9E8E6E] hover:text-[#2d3436] dark:hover:text-[#E8D5A3]'
                               }`}
                               style={!isActive ? {boxShadow: '3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light)', background: 'transparent'} : undefined}>
                            <div className={isActive ? 'text-[#5a7d8f] dark:text-[#D4AF37]' : 'text-[#636e72] dark:text-[#9E8E6E]'}>{item.icon}</div>
                            {item.name}
                          </div>
                        </li>
                      )
                    })
                  }
                  <li>
                    <div
                      onClick={() => signOut()}
                      className={`flex items-center gap-x-2 text-[#636e72] dark:text-[#9E8E6E] p-3 rounded-xl cursor-pointer hover:text-red-500 transition-colors duration-150`}
                      style={{boxShadow: '3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light)', background: 'transparent'}}>
                      <div className="text-[#636e72] dark:text-[#9E8E6E]"><LogOut size={16} strokeWidth={1.5}/></div>
                      退出登录
                    </div>
                  </li>
                </ul>
                <div className="py-4 px-4">
                  <div className="neu-raised-xs p-3 flex items-center gap-x-4 neu-glow-hover">
                    <CircleUserRound className="text-[#5a7d8f] dark:text-[#D4AF37]" size={36} strokeWidth={1.0}/>
                    <div>
                      <span className="block text-[#2d3436] dark:text-[#E8D5A3] text-sm font-semibold">
                        {user.username || 'ADMIN'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-60 flex-grow">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Index;
