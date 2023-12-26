import { useState } from "react";
import Heart from "react-animated-heart";

const Footer = () => {

    const[ isClick,setClick] = useState(false);
  return (
    <div className="bg-black text-white">
      <div className="flex justify-center"><Heart isClick={isClick} onClick={() => setClick(!isClick)}/></div>
      <div className="flex justify-center items-center flex-col pb-8">
        <div className="text-xs sm:text-sm text-slate-400">This website is made by Aditya Singh Parihar with 🤍</div>
        <div className="text-xs py-1 sm:py-2 text-slate-500">Copyright © 2023 ASP, Inc.</div>
      </div>
    </div>
  );
};

export default Footer;
