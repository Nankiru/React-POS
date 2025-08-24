import Admin from "../assets/image/nan.jpg";
import POSLogo from "../assets/icons/pos-logo.png";
const Header = () => {
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Home
            </a>
            <a href="#" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 3v4" />
              </svg>
              Order List
            </a>
            <a href="#" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              History
            </a>
            <a href="#" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              Report
            </a>
            <a href="#" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              Setting
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
          <div className="flex items-center gap-1 sm:gap-2">
            <img
              src={Admin}
              alt="user"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-purple-400"
            />
            <div>
              <div className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
                Nan Smos
              </div>
              <div className="text-xs text-green-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header