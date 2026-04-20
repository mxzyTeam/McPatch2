import {fsDiskInfoRequest} from "@/api/fs.js";
import {useEffect, useState} from "react";

const Index = () => {
  const [diskInfo, setDiskInfo] = useState({total: 0, used: 0});

  const getDiskInfo = async () => {
    const {code, msg, data} = await fsDiskInfoRequest();
    if (code === 1) {
      setDiskInfo(data)
    }
  }

  useEffect(() => {
    getDiskInfo()
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <div className="neomorphic p-8 fade-in">
          <div className="text-2xl font-bold text-gray-700 dark:text-white mb-6">磁盘使用量</div>
          <div className='neomorphic h-10 mt-2 mb-4 relative w-full rounded-xl overflow-hidden'>
            <div
              className='bg-gray-600 absolute top-0 left-0 flex h-full items-center justify-center rounded-xl text-xs font-semibold text-white transition-all duration-500'
              style={{width: `${(diskInfo.used / diskInfo.total * 100).toFixed(2)}%`}}>
            </div>
          </div>
          <div className="text-base flex justify-end items-center w-full text-gray-700 dark:text-white">
            <div>{(diskInfo.used / 1024 / 1024 / 1024).toFixed(2)}GB / {(diskInfo.total / 1024 / 1024 / 1024).toFixed(2)}GB</div>
            <div className="ml-2">{(diskInfo.used / diskInfo.total * 100).toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
