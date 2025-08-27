import Admin from "../assets/image/nan.jpg";
import SettingIcon from "../assets/icons/setting.png";
import LogoutIcon from "../assets/icons/logout.png";
import HomeIcon from "../assets/icons/home.png";
import OrderIcon from "../assets/icons/order.png";
import HistoryIcon from "../assets/icons/history.png";
import ReportIcon from "../assets/icons/report.png";
import BillIcon from "../assets/icons/bill.png";
import InvoiceIcon from "../assets/icons/invoice.png";
import POSLogo from "../assets/icons/pos-logo.png";
import { useState, useEffect } from "react";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "Nan smos", role: "Admin" });

  useEffect(() => {
    // Try to get user info from localStorage after login
    const info = localStorage.getItem("userInfo");
    if (info) {
      try {
        setUserInfo(JSON.parse(info));
      } catch {}
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-xl shadow-md px-4 md:px-8 py-4 md:py-6 mb-6 md:mb-8 gap-4 md:gap-0">
      {/* Logo and navigation */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 w-full md:w-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <div className=" p-2 flex items-center justify-center">
            <img src={POSLogo} alt="Logo POS" className="h-16 w-16" />
          </div>
          <div>
            <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-purple-700 leading-tight">
              Nan POS
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-400">
              Easy Handle Solo
            </div>
          </div>
        </div>
        <nav className="flex gap-2 sm:gap-4 md:gap-8 text-gray-600 text-xs sm:text-base md:text-lg mt-4 md:mt-0 md:ml-10 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
          <a
            href="#"
            className="flex items-center gap-2 font-semibold text-purple-600 border-b-2 border-purple-500 pb-1"
          >
            <img src={HomeIcon} alt="home icon" className="w-5 h-5" />
            Home
          </a>
          <a href="#" className="flex items-center gap-2">
            <img src={OrderIcon} alt="order list icon" className="w-5 h-5" />
            Order
          </a>
          <a href="#" className="flex items-center gap-2">
            <img src={HistoryIcon} alt="history icon" className="w-5 h-5" />
            History
          </a>
          <a href="#" className="flex items-center gap-2">
            <img src={ReportIcon} alt="report icon" className="w-5 h-5" />
            Report
          </a>
          <a href="#" className="flex items-center gap-2">
            <img src={BillIcon} alt="bill icon" className="w-5 h-5" />
            Bill
          </a>
          <a href="#" className="flex items-center gap-2">
            <img src={InvoiceIcon} alt="invoice icon" className="w-5 h-5" />
            Invoice
          </a>
        </nav>
      </div>
      {/* Date, time, user info */}
      <div className="flex flex-col  md:flex-row items-start  lg:bg-transparent md:items-center gap-4 md:gap-6 w-full md:w-auto">
        {/* <div className="flex items-center gap-1 sm:gap-2 bg-purple-50 rounded-lg px-2 sm:px-3 md:px-4 py-2 text-purple-700 font-medium text-xs sm:text-sm md:text-base">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4" />
            </svg>
            {formattedDate}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-purple-50 rounded-lg px-2 sm:px-3 md:px-4 py-2 text-purple-700 font-medium text-xs sm:text-sm md:text-base">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {formattedTime}
          </div> */}
        <div className="hidden md:block w-px h-10 bg-gray-200 mx-2" />
        <div className="flex items-center gap-1 sm:gap-2 relative">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => setShowUserMenu((v) => !v)}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img
              src={Admin}
              alt="user"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-purple-400"
            />
          </button>
          <div>
            <div className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
              {userInfo.name}
            </div>
            <div className="text-xs text-green-500">{userInfo.role}</div>
          </div>
          {showUserMenu && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 px-4 z-50 min-w-[140px]">
              <button
                className="flex hover:transitio-all hover:duration-500 cursor-pointer justify-center items-center gap-1 w-full text-left py-2 px-2 text-gray-700 hover:bg-purple-100 rounded transition"
                onClick={() => alert("Go to settings (demo)")}
              >
                <img src={SettingIcon} alt="setting icon" className="w-5 h-5" />
                <span>Setting</span>
              </button>
              <button
                className="flex hover:transitio-all hover:duration-500 cursor-pointer justify-center items-center gap-1 w-full text-left py-2 px-2 text-gray-700 hover:bg-red-100 rounded transition"
                onClick={() => {
                  localStorage.removeItem("auth");
                  localStorage.removeItem("userInfo");
                  window.location.reload();
                }}
              >
                <img src={LogoutIcon} alt="logout icon" className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
