import {ArrowBigLeftDash} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center neu-raised p-8">
          <div className="text-4xl text-[#5a7d8f] dark:text-[#D4AF37]">McPatch</div>
          <p className="text-[#636e72] dark:text-[#9E8E6E]">
            404. 对不起,您要查找的页面无法找到或已被删除.
          </p>
          <div onClick={() => navigate(-1)}
               className="text-[#5a7d8f] dark:text-[#D4AF37] duration-150 hover:text-[#7fa8bc] dark:hover:text-[#D4AF37] font-medium inline-flex items-center gap-x-1 cursor-pointer">
            返回
            <ArrowBigLeftDash size={16} strokeWidth={1.5}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
