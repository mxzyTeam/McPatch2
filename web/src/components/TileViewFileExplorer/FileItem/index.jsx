import React from 'react';

const Index = ({item}) => {

  const getBgColor = (item) => {
    if (item.state === 'added') return 'hover:bg-green-50';
    if (item.state === 'modified') return 'hover:bg-yellow-50';
    if (item.state === 'missing') return 'hover:bg-red-50';
    if (item.state === 'gone') return 'hover:bg-cyan-50';
    if (item.state === 'come') return 'hover:bg-blue-50';
    return '';
  };

  const getTextColor = (item) => {
    if (item.state === 'added') return 'text-green-500';
    if (item.state === 'modified') return 'text-yellow-500';
    if (item.state === 'missing') return 'text-red-500';
    if (item.state === 'gone') return 'text-cyan-500';
    if (item.state === 'come') return 'text-blue-500';
    return 'text-gray-700';
  };

  return (
    <>
      <div
        title={item.name}
        className={`neomorphic w-28 h-28 flex flex-col justify-center items-center cursor-pointer transition-all select-none ${getBgColor(item)}`}>
        <div className="max-w-20 text-3xl mb-2">
          {item.is_directory ? '📁' : '📄'}
        </div>
        <div
          className={`max-w-20 whitespace-nowrap overflow-hidden overflow-ellipsis text-sm ${getTextColor(item)}`}>{item.name}</div>
      </div>
    </>
  );
};

export default Index;
