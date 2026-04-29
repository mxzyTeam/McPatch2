import {SquareArrowOutUpRight} from "lucide-react";

const Index = () => {
  return (
    <>
      <div className="p-10 min-h-screen">
        <div className="flex items-center text-base font-bold text-[#5a7d8f] dark:text-[#D4AF37]">
          <span>官方文档:</span>
          <a className="flex items-center ml-2 text-[#636e72] dark:text-[#9E8E6E] w-40" target="_blank"
             href="https://balloonupdate.github.io/McPatchDocs/">
            [打开&nbsp;<SquareArrowOutUpRight size={12} strokeWidth={1.5}/>]
          </a>
        </div>
      </div>
    </>
  );
};

export default Index;
