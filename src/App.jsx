import { useEffect, useState } from "react";
import Admin from "../src/assets/image/nan.jpg";
import POSLogo from "../src/assets/icons/pos-logo.png";
import axios from "axios";

// icon categories
import AllMenuIcon from '../src/assets/category/all-menu.png';
import AppetizerIcon from '../src/assets/category/appetizer.png';
import SeafoodIcon from '../src/assets/category/sea-food.png';
import ChickenIcon from '../src/assets/category/chicken.png';
import SteakIcon from '../src/assets/category/steak.png';
import SaladIcon from '../src/assets/category/salad.png';
import SpicyFoodIcon from '../src/assets/category/spicy-food.png';
import DessertIcon from '../src/assets/category/dessert.png';
import BeveragesIcon from '../src/assets/category/beverages.png';
import CocktailIcon from '../src/assets/category/cocktail.png';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Menu");
  const [quantities, setQuantities] = useState({});

  const base_URL = "http://127.0.0.1:8000/api/product";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(base_URL);
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
          setError("No products found");
        }
      } catch (error) {
        setProducts([]);
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Get today's date in format: Wed, 29 May 2024
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${days[today.getDay()]}, ${today.getDate()} ${
    months[today.getMonth()]
  } ${today.getFullYear()}`;

  // Live running time
  const [liveTime, setLiveTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedTime = liveTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Example categories with SVG icons
  const categories = [
    {
      name: "All Menu",
      category_id: null,
      count: 160,
      icon: (
        <img
          src={AllMenuIcon}
          alt="All Menu"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Appetizer",
      category_id: 1,
      count: 20,
      icon: (
        <img
          src={AppetizerIcon}
          alt="Appetizer"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Seafood",
      category_id: 3,
      count: 20,
      icon: (
        <img
          src={SeafoodIcon}
          alt="Seafood"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Chicken",
      category_id: 4,
      count: 25,
      icon: (
        <img
          src={ChickenIcon}
          alt="Chicken"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Steak",
      category_id: 5,
      count: 20,
      icon: (
        <img
          src={SteakIcon}
          alt="Steak"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Salad",
      category_id: 6,
      count: 20,
      icon: (
        <img
          src={SaladIcon}
          alt="Salad"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Spicy Food",
      category_id: 7,
      count: 30,
      icon: (
        <img
          src={SpicyFoodIcon}
          alt="Spicy Food"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Dessert",
      category_id: 2,
      count: 20,
      icon: (
        <img
          src={DessertIcon}
          alt="Dessert"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Beverages",
      category_id: 8,
      count: 20,
      icon: (
        <img
          src={BeveragesIcon}
          alt="Beverages"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
    {
      name: "Cocktail",
      category_id: 9,
      count: 15,
      icon: (
        <img
          src={CocktailIcon}
          alt="Cocktail"
          className="w-7 h-7 mr-2 object-contain"
        />
      ),
    },
  ];

  // Filter products by search and category (dummy logic)
  const filteredProducts = products.filter((pro) => {
    // If Dessert is selected, match by category name or category_id = 2
    if (category === "Dessert") {
      return (
        ((pro.category && pro.category === "Dessert") ||
          pro.category_id === 2) &&
        (search === "" ||
          (pro.name && pro.name.toLowerCase().includes(search.toLowerCase())))
      );
    }
    // All Menu shows all
    if (category === "All Menu") {
      return (
        search === "" ||
        (pro.name && pro.name.toLowerCase().includes(search.toLowerCase()))
      );
    }
    // Other categories match by name
    return (
      pro.category &&
      pro.category === category &&
      (search === "" ||
        (pro.name && pro.name.toLowerCase().includes(search.toLowerCase())))
    );
  });

  // Quantity handlers
  const handleQuantityChange = (id, value) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, value) }));
  };
  const handleIncrement = (id) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));
  };
  const handleDecrement = (id) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) - 1) }));
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 p-6">
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-xl shadow-md px-4 md:px-8 py-4 md:py-6 mb-6 md:mb-8 gap-4 md:gap-0">
        {/* Logo and navigation */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 w-full md:w-auto">
          <div className="flex items-center gap-2 md:gap-3">
            <div className=" p-2 flex items-center justify-center">
              <img
                src={POSLogo}
                alt="Logo POS"
                className="h-16 w-16"
              />
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
                Nan Dev
              </div>
              <div className="text-xs text-green-500">Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="bg-white rounded-xl shadow-md px-8 py-5 mb-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full mb-4 gap-3 sm:gap-4 md:gap-6">
          <div className="relative w-full sm:max-w-lg">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search menu here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-200 text-base sm:text-lg focus:outline-purple-400 bg-gray-50 shadow-sm"
            />
          </div>
          <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-semibold shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400">
            New Order
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto w-full pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ease-in-out relative overflow-hidden
                min-w-[140px] min-h-[140px]
                ${
                  category === cat.name
                    ? "border-purple-500 bg-purple-50 shadow text-purple-700"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }
              group hover:border-purple-500 hover:shadow-lg`}
            >
              <span className="absolute inset-0 rounded-xl border-2 border-purple-500 opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 pointer-events-none"></span>
              <div
                className={`mb-2 text-center flex items-center justify-center w-12 h-12 rounded-lg pl-2 ${
                  category === cat.name
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`font-bold text-base mb-1 ${
                  category === cat.name ? "text-purple-700" : "text-gray-500"
                }`}
              >
                {cat.name}
              </span>
              <span
                className={`text-xs ${
                  category === cat.name ? "text-purple-400" : "text-gray-400"
                }`}
              >
                {cat.count} Items
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((pro, i) => (
            <div
              key={i}
              className="bg-gray-300 hover:shadow-md hover:transition-all hover:duration-300 rounded-xl relative"
            >
              {/* image */}
              <div className="p-2">
                <div className="w-full h-[160px] flex items-center justify-center mb-2 rounded-lg bg-white ">
                  <img
                    src={
                      pro.image
                        ? `http://localhost:8000/uploads/products/${pro.image}`
                        : "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"
                    }
                    alt={pro.name}
                    className="w-28 h-28 object-cover rounded-full shadow"
                  />
                </div>
              </div>
              {/* Detail */}
              <div className="pl-3">
                <h2 className="font-bold text-xl text-gray-800 text-left mb-1">
                  {pro.name}
                </h2>
                <div className="mb-2">
                  {pro.status == "available" ? (
                    <span className="bg-green-700 relative text-white px-3 pb-[2px] rounded-2xl text-xs font-semibold inline-flex items-center gap-1 w-auto min-w-0">
                      <span className="absolute inset-0 bg-green-200 rounded-2xl transform scale-x-0 transition-transform duration-300 ease-in-out"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-green-300 border border-green-700 mr-1"></span>
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-700 relative text-white px-3 pb-[2px] rounded-2xl text-xs font-semibold inline-flex items-center gap-1 w-auto min-w-0">
                      <span className="absolute inset-0 bg-red-200 rounded-2xl transform scale-x-0 transition-transform duration-300 ease-in-out"></span>
                      <span className="inline-block w-2 h-2 rounded-full bg-red-300 border border-red-700 mr-1"></span>
                      Available
                    </span>
                  )}
                </div>
                {/* <p className="text-gray-500 text-sm text-center mb-2 line-clamp-2">
                {pro.description}
              </p> */}
                <div className="font-bold text-green-700 text-lg mb-2 flex items-center gap-2">
                  <span className="text-base md:text-lg lg:text-xl">
                    $
                    {pro.price
                      ? Number(pro.price) % 1 === 0
                        ? Number(pro.price).toLocaleString()
                        : Number(pro.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                      : "-"}
                  </span>
                  <span className="mx-2 text-gray-400 font-normal">|</span>
                  <span className="text-base md:text-lg lg:text-xl">
                    ៛
                    {pro.price
                      ? (pro.price * 4100).toLocaleString("km-KH", {
                          maximumFractionDigits: 0,
                        })
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto p-2">
                <div className="flex items-center justify-between mb-2 gap-3 bg-purple-50 rounded-full shadow px-4 py-2 mt-auto w-full">
                  <button
                    onClick={() => handleDecrement(pro.id)}
                    className="w-10 cursor-pointer h-10 pb-[3px] flex items-center justify-center bg-purple-200 text-purple-700 rounded-full text-2xl font-bold transition-all duration-150 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={quantities[pro.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(pro.id, Number(e.target.value))
                    }
                    className="w-16 h-10 text-center border-2 border-purple-300 rounded-full text-xl font-bold bg-white shadow focus:outline-purple-400 mx-2"
                  />
                  <button
                    onClick={() => handleIncrement(pro.id)}
                    className="w-10  cursor-pointer pb-[3px] h-10 flex items-center justify-center bg-purple-500 text-white rounded-full text-2xl font-bold transition-all duration-150 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <div class="relative h-[calc(550px-85px)] flex justify-center items-center flex-col">
              <svg
                width="314"
                height="171"
                viewBox="0 0 314 171"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M131.408 134.14L131.407 134.139C124.251 129.827 118.724 123.793 114.83 116.051L114.829 116.049C110.981 108.307 109.065 99.3201 109.065 89.1025C109.065 78.885 110.981 69.8983 114.829 62.156L114.83 62.1539C118.724 54.4117 124.251 48.3783 131.407 44.0663L131.408 44.0655C138.616 39.75 147.163 37.6025 157.029 37.6025C166.894 37.6025 175.419 39.7498 182.582 44.0659C189.784 48.3778 195.311 54.4115 199.16 62.1549C203.054 69.8975 204.993 78.8846 204.993 89.1025C204.993 99.3208 203.054 108.308 199.16 116.051C199.16 116.051 199.159 116.051 199.159 116.051L198.713 115.827C194.905 123.488 189.442 129.449 182.325 133.711L131.408 134.14ZM131.408 134.14C138.616 138.455 147.163 140.603 157.029 140.603C166.894 140.603 175.419 138.455 182.582 134.139L131.408 134.14ZM43.4542 138.063V138.563H43.9542H62.7222H63.2222V138.063V123.331H71.4262H71.9262V122.831V105.559V105.059H71.4262H63.2222V81.0785V80.5785H62.7222H43.9542H43.4542V81.0785V105.059H23.3911L53.9264 40.3559L54.2631 39.6425H53.4742H32.2582H31.9413L31.8061 39.9291L0.934056 105.345L0.88623 105.446V105.559V122.831V123.331H1.38623H43.4542V138.063ZM181.318 106.729L181.317 106.732C179.31 111.726 176.288 115.563 172.254 118.267C168.232 120.963 163.171 122.284 157.036 122.195C150.898 122.105 145.83 120.695 141.803 117.995C137.767 115.29 134.722 111.495 132.671 106.591C130.661 101.678 129.649 95.853 129.649 89.1025C129.649 82.3519 130.661 76.4793 132.672 71.4739C134.724 66.4795 137.769 62.6418 141.803 59.9379C145.825 57.2419 150.887 55.9209 157.021 56.0105C163.16 56.1001 168.227 57.5104 172.254 60.2099C176.29 62.9151 179.312 66.709 181.318 71.6119L181.319 71.6154C183.374 76.5274 184.409 82.3523 184.409 89.1025C184.409 95.8524 183.374 101.724 181.318 106.729ZM284.642 138.063V138.563H285.142H303.91H304.41V138.063V123.331H312.614H313.114V122.831V105.559V105.059H312.614H304.41V81.0785V80.5785H303.91H285.142H284.642V81.0785V105.059H264.579L295.114 40.3559L295.451 39.6425H294.662H273.446H273.129L272.994 39.9291L242.122 105.345L242.074 105.446V105.559V122.831V123.331H242.574H284.642V138.063Z"
                  fill="#EEF2FF"
                  stroke="#4F46E5"
                />
                <path
                  d="M176.88 0.632498L176.88 0.632384L176.869 0.630954C176.264 0.549581 175.654 0.5 175.04 0.5H109.399C102.772 0.5 97.4004 5.84455 97.4004 12.4473V142.715C97.4004 149.318 102.772 154.662 109.399 154.662H204.009C210.652 154.662 216.007 149.317 216.007 142.715V38.9309C216.007 38.0244 215.908 37.1334 215.709 36.2586L215.709 36.2584C215.178 33.9309 213.935 31.7686 212.127 30.1333C212.127 30.1331 212.126 30.1329 212.126 30.1327L183.129 3.65203C183.129 3.6519 183.128 3.65177 183.128 3.65164C181.372 2.03526 179.201 0.995552 176.88 0.632498Z"
                  fill="white"
                  stroke="#E5E7EB"
                />
                <ellipse
                  cx="160.123"
                  cy="81"
                  rx="28.0342"
                  ry="28.0342"
                  fill="#EEF2FF"
                />
                <path
                  d="M179.3 61.3061L179.3 61.3058C168.559 50.5808 151.17 50.5804 140.444 61.3061C129.703 72.0316 129.703 89.4361 140.444 100.162C151.17 110.903 168.559 110.903 179.3 100.162C190.026 89.4364 190.026 72.0317 179.3 61.3061ZM185.924 54.6832C200.31 69.0695 200.31 92.3985 185.924 106.785C171.522 121.171 148.208 121.171 133.806 106.785C119.419 92.3987 119.419 69.0693 133.806 54.683C148.208 40.2965 171.522 40.2966 185.924 54.6832Z"
                  stroke="#E5E7EB"
                />
                <path
                  d="M190.843 119.267L182.077 110.492C184.949 108.267 187.537 105.651 189.625 102.955L198.39 111.729L190.843 119.267Z"
                  stroke="#E5E7EB"
                />
                <path
                  d="M219.183 125.781L219.183 125.78L203.374 109.988C203.374 109.987 203.374 109.987 203.373 109.986C202.057 108.653 199.91 108.657 198.582 109.985L198.931 110.335L198.582 109.985L189.108 119.459C187.792 120.775 187.796 122.918 189.105 124.247L189.108 124.249L204.919 140.06C208.85 143.992 215.252 143.992 219.183 140.06C223.13 136.113 223.13 129.728 219.183 125.781Z"
                  fill="#A5B4FC"
                  stroke="#818CF8"
                />
                <path
                  d="M163.246 87.2285C162.6 87.2285 162.064 86.6926 162.064 86.0305C162.064 83.3821 158.06 83.3821 158.06 86.0305C158.06 86.6926 157.524 87.2285 156.862 87.2285C156.215 87.2285 155.679 86.6926 155.679 86.0305C155.679 80.2294 164.444 80.2451 164.444 86.0305C164.444 86.6926 163.908 87.2285 163.246 87.2285Z"
                  fill="#4F46E5"
                />
                <path
                  d="M173.414 77.0926H168.464C167.802 77.0926 167.266 76.5567 167.266 75.8946C167.266 75.2483 167.802 74.7123 168.464 74.7123H173.414C174.076 74.7123 174.612 75.2483 174.612 75.8946C174.612 76.5567 174.076 77.0926 173.414 77.0926Z"
                  fill="#4F46E5"
                />
                <path
                  d="M151.66 77.0925H146.71C146.048 77.0925 145.512 76.5565 145.512 75.8945C145.512 75.2481 146.048 74.7122 146.71 74.7122H151.66C152.306 74.7122 152.842 75.2481 152.842 75.8945C152.842 76.5565 152.306 77.0925 151.66 77.0925Z"
                  fill="#4F46E5"
                />
                <path
                  d="M118.413 22.8803C118.413 22.1251 119.025 21.5128 119.781 21.5128H158.071C158.827 21.5128 159.439 22.1251 159.439 22.8803C159.439 23.6356 158.827 24.2479 158.071 24.2479H119.781C119.025 24.2479 118.413 23.6356 118.413 22.8803Z"
                  fill="#4F46E5"
                />
                <path
                  d="M118.413 136.385C118.413 134.874 119.638 133.65 121.148 133.65H170.379C171.89 133.65 173.114 134.874 173.114 136.385C173.114 137.895 171.89 139.12 170.379 139.12H121.148C119.638 139.12 118.413 137.895 118.413 136.385Z"
                  fill="#A5B4FC"
                />
                <path
                  d="M118.413 31.0854C118.413 30.3302 119.025 29.7179 119.781 29.7179H130.721C131.476 29.7179 132.088 30.3302 132.088 31.0854C132.088 31.8407 131.476 32.4529 130.721 32.4529H119.781C119.025 32.4529 118.413 31.8407 118.413 31.0854Z"
                  fill="#4F46E5"
                />
                <circle cx="136.191" cy="31.0854" r="1.36752" fill="#4F46E5" />
                <circle cx="141.661" cy="31.0854" r="1.36752" fill="#4F46E5" />
                <circle cx="147.131" cy="31.0854" r="1.36752" fill="#4F46E5" />
              </svg>
              <div class="block text-center mt-5">
                <h5 class="md:text-xl text-lg leading-8 text-gray-900 font-medium mb-1.5">
                  <span class="text-indigo-600 font-semibold ">Oops!</span> It
                  seems like no product found!
                </h5>
                <p class="text-sm text-gray-500">
                  We're working to bring it back.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-8 text-center text-red-500 font-semibold text-lg">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
