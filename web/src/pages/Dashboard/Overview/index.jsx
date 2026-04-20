import {fsDiskInfoRequest} from "@/api/fs.js";
import {useEffect, useState} from "react";

const Index = () => {
  const [diskInfo, setDiskInfo] = useState({total: 0, used: 0});
  const [visible, setVisible] = useState(false);

  const getDiskInfo = async () => {
    const {code, msg, data} = await fsDiskInfoRequest();
    if (code === 1) {
      setDiskInfo(data)
    }
  }

  useEffect(() => {
    getDiskInfo()
    // Trigger entrance animation after mount
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const percent = diskInfo.total > 0 ? (diskInfo.used / diskInfo.total * 100).toFixed(2) : '0.00'

  return (
    <>
      <div className="p-10 min-h-screen">
        <div className="text-2xl font-bold text-[#5a7d8f] dark:text-[#D4AF37] neu-card-enter">磁盘使用量</div>
        <div className='neu-progress-track h-8 mt-4 mb-2 w-full relative neu-card-enter neu-stagger-1'>
          <div
            className='neu-progress-fill absolute top-0 left-0 flex h-full items-center justify-center text-xs font-semibold text-white'
            style={{width: `${percent}%`}}>
          </div>
        </div>
        <div className="text-base flex justify-end items-center w-full text-[#636e72] dark:text-[#9E8E6E] neu-card-enter neu-stagger-2">
          <div>{(diskInfo.used / 1024 / 1024 / 1024).toFixed(2)}GB / {(diskInfo.total / 1024 / 1024 / 1024).toFixed(2)}GB</div>
          <div className="ml-2">{percent}%</div>
        </div>
      </div>
    </>
  );
};

export default Index;
