import React from 'react';

const Index = ({path, handlerBreadcrumb}) => {

  const items = ['root', ...path]
  return (
    <>
      <div className="h-16 pr-4 pl-4 border-l-2 border-[#5a7d8f] dark:border-[#D4AF37]">
        <div className="h-8 flex items-center text-[#5a7d8f] dark:text-[#D4AF37] font-bold text-base">工作目录</div>
        <ul className="h-8 flex items-center">
          {
            items.map((item, index) => {
              return (
                <li key={index} className="flex items-center cursor-default">
                  {
                    items.length - 1 !== index ?
                      <div className="text-base text-[#2d3436] dark:text-[#E8D5A3] font-medium">
                        <button onClick={() => handlerBreadcrumb(index)}>{item}</button>
                        <span className="px-3 text-body-color">{" / "}</span>
                      </div> :
                      <div className="text-base text-[#636e72] dark:text-[#9E8E6E] font-medium">
                        {item}
                      </div>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
};

export default Index;
