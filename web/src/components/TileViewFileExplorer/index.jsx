import React, {useEffect, useRef, useState} from 'react';
import FileItem from "@/components/TileViewFileExplorer/FileItem/index.jsx";
import './index.css'
import {fsDeleteRequest, fsSignFileRequest} from "@/api/fs.js";
import {message} from "antd";
import {showFileSize, showTime} from "@/utils/tool.js";

const Index = ({path, getFileList, items, handlerNextPath}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})
  const menuRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    const {clientX: mouseX, clientY: mouseY} = e;
    setSelectedItem(items[index]);
    setMenuPosition({x: mouseX, y: mouseY});
    setIsOpen(true);
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 5);
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fsOpenOrDownload = async (item) => {
    closeMenu()
    if (item.is_directory) {
      handlerNextPath(item)
    } else {
      let key = path.join('/');
      key = key.length === 0 ? item.name : `${key}/${item.name}`

      const {code, msg, data} = await fsSignFileRequest(key);
      if (code === 1) {
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_API_URL}/fs/extract-file?sign=${data.signature}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        messageApi.error(msg);
      }
    }
  }

  const fsDelete = async (item) => {
    let key = path.join('/');
    key = key.length === 0 ? item.name : `${key}/${item.name}`

    const {code, msg, data} = await fsDeleteRequest(key);
    if (code === 1) {
      messageApi.success('删除成功')
      getFileList()
    } else {
      messageApi.error(msg);
    }
    closeMenu()
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-wrap">
        {
          items.map((item, index) => (
            <div
              key={index}
              onDoubleClick={() => fsOpenOrDownload(item)}
              onContextMenu={(e) => handleContextMenu(e, index)} onClick={closeMenu}>
              <FileItem item={item}/>
            </div>
          ))
        }
      </div>

      {
        isOpen ?
          <div
            ref={menuRef}
            className="fixed neu-raised-sm w-60 z-50"
            style={{
              left: `${menuPosition.x}px`,
              top: `${menuPosition.y}px`,
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            <div className="p-1">
              <div
                className="flex flex-col rounded-xl w-full p-3 text-sm neu-inset-xs mb-1 cursor-pointer">
                <div className="text-item">名称: {selectedItem.name}</div>
                <div className="text-item">类型: {selectedItem.is_directory ? "文件夹" : "文件"}</div>
                <div className="text-item">大小: {showFileSize(selectedItem.size)}</div>
                <div className="text-item">状态: {selectedItem.state}</div>
                <div className="text-item">创建时间: {showTime(selectedItem.ctime)}</div>
                <div className="text-item">修改时间: {showTime(selectedItem.mtime)}</div>
              </div>
              {
                selectedItem.is_directory &&
                <>
                  <button
                    onClick={() => fsOpenOrDownload(selectedItem)}
                    className="flex items-center rounded-xl w-full p-2 text-sm text-[#5a7d8f] dark:text-[#D4AF37] hover:bg-[rgba(90,125,143,0.1)] dark:hover:bg-[rgba(212,175,55,0.1)] duration-200">
                    打开
                  </button>
                </>
              }
              {
                !selectedItem.is_directory &&
                <>
                  <button
                    onClick={() => fsOpenOrDownload(selectedItem)}
                    className="flex items-center rounded-xl w-full p-2 text-sm text-[#5a7d8f] dark:text-[#D4AF37] hover:bg-[rgba(90,125,143,0.1)] dark:hover:bg-[rgba(212,175,55,0.1)] duration-200">
                    下载
                  </button>
                </>
              }
              {
                <button
                  onClick={() => fsDelete(selectedItem)}
                  className="flex items-center rounded-xl w-full p-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 duration-200">
                  删除
                </button>
              }
            </div>
          </div> : <></>
      }
    </>
  );
};

export default Index;
