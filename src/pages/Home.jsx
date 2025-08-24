import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/font.css";

// icon categories
import AllMenuIcon from "../assets/category/all-menu.png";
import AppetizerIcon from "../assets/category/appetizer.png";
import SeafoodIcon from "../assets/category/sea-food.png";
import ChickenIcon from "../assets/category/chicken.png";
import SteakIcon from "../assets/category/steak.png";
import SaladIcon from "../assets/category/salad.png";
import SpicyFoodIcon from "../assets/category/spicy-food.png";
import DessertIcon from "../assets/category/dessert.png";
import BeveragesIcon from "../assets/category/beverages.png";
import CocktailIcon from "../assets/category/cocktail.png";
import Header from "../components/Header";
import Loading from "../components/Loading";
const Home = () => {

    // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(true);

  const [category, setCategory] = useState("All Menu");

  const [quantities, setQuantities] = useState({});
  // Order items: array of {product, qty}
  const [orderItems, setOrderItems] = useState([]);
  // Add or update product in order
  const handleSelectProduct = (pro) => {
    setOrderItems((items) => {
      const idx = items.findIndex((item) => item.product.id === pro.id);
      if (idx !== -1) {
        // Already in order, increment qty
        const updated = [...items];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
        return updated;
      } else {
        // Add new product
        return [...items, { product: pro, qty: 1 }];
      }
    });
  };
  // Quantity controls for order items
  const handleOrderQtyChange = (id, value) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.product.id === id ? { ...item, qty: Math.max(1, value) } : item
      )
    );
  };
  const handleOrderIncrement = (id) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.product.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };
  const handleOrderDecrement = (id) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.product.id === id
          ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      )
    );
  };
  // Remove item from order
  const handleRemoveOrderItem = (id) => {
    setOrderItems((items) => items.filter((item) => item.product.id !== id));
  };

  const base_URL = "http://127.0.0.1:8000/api/pos/product";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(base_URL);
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
          // setLoading(false);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
          setLoading(false);
          console.log('Fetch all data');
        } else {
          setProducts([]);
          setError("No products found");
        }
      } catch (error) {
        setProducts([]);
        setError("Failed to fetch products");
      }finally{
        console.log("Error url")
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
      category_id: 1,
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
    if (category === "Salad") {
      return (
        ((pro.category && pro.category === "Salad") || pro.category_id === 1) &&
        (search === "" ||
          (pro.name && pro.name.toLowerCase().includes(search.toLowerCase())))
      );
    }
    if (category === "Dessert") {
      return (
        ((pro.category && pro.category === "Dessert") ||
          pro.category_id === 1) &&
        (search === "" ||
          (pro.name && pro.name.toLowerCase().includes(search.toLowerCase())))
      );
    }
    if (category === "Seafood") {
      return (
        ((pro.category && pro.category === "Seafood") ||
          pro.category_id === 3) &&
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


  if (loading) {
    return <Loading/>
  }
  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 p-6">
        <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <Header/>

      {/* Search and Categories */}
      <div className="bg-white rounded-xl shadow-md px-2 md:px-8 py-5 mb-8 flex flex-col gap-6">
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
          {/* <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-semibold shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400">
            New Order
          </button> */}
          {/* Add navigation to new order form */}
          <Link to="/new-order" onClick={()=> {alert('Hello')}}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-400 text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-semibold shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 mt-2"
            
          >
            New Order
          </Link>
        </div>
        <h1 className="text-xl font-kh-number">Categories</h1>
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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Menu Grid */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-xl font-kh-number mb-3">Select Menu</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((pro, i) => (
                <div
                  key={i}
                  className="bg-gray-300 hover:shadow-md hover:transition-all hover:duration-300 rounded-xl relative cursor-pointer animate-fadeIn"
                  style={{ animationDuration: `${0.3 + i * 0.07}s` }}
                  onClick={() => handleSelectProduct(pro)}
                >
                  {/* image */}
                  <div className="p-2">
                    <div className="w-full min-h-[120px] lg:min-h-[100px] bg-white flex items-center justify-center mb-2 rounded-lg ">
                      <img
                        src={
                          pro.image
                            ? `http://localhost:8000/uploads/products/${pro.image}`
                            : "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"
                        }
                        alt={pro.name}
                        className="w-22"
                      />
                    </div>
                  </div>
                  {/* Detail */}
                  <div className="pl-3">
                    <h2 className="font-bold text-[16px] text-gray-800 text-left mb-1">
                      {pro.name}
                    </h2>
                    {/* <div className="mb-2">
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
                    </div> */}
                    <div className="font-bold text-blue-600 text-lg mb-2 flex items-center gap-2">
                      <span className="text-base md:text-lg lg:text-xl font-kh-number">
                        <sup>$</sup>
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
                      <span className="text-base md:text-lg lg:text-xl font-kh-number">
                        <sup>៛</sup>
                        {pro.price
                          ? (pro.price * 4100).toLocaleString("km-KH", {
                              maximumFractionDigits: 0,
                            })
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                <div className="relative h-[calc(550px-85px)] flex justify-center items-center flex-col">
                  {/* You can add your empty state SVG and message here */}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Right: Order Details */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            Order Details
          </h2>
          {orderItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orderItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-purple-50 rounded-xl shadow p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <img
                        src={
                          item.product.image
                            ? `http://localhost:8000/uploads/products/${item.product.image}`
                            : "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"
                        }
                        alt={item.product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg object-cover border border-purple-200"
                      />
                      <div>
                        <div className="font-bold text-sm sm:text-base md:text-lg text-purple-700">
                          {item.product.name}
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-gray-400 flex items-center gap-1 sm:gap-2 mt-1">
                          Qty:
                          <button
                            className="w-7 h-7 pb-[3px] sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full text-base md:text-lg font-bold transition-all duration-150 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onClick={() => handleOrderDecrement(item.product.id)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => handleOrderQtyChange(item.product.id, Number(e.target.value))}
                            className="w-10 sm:w-12 md:w-14  pb-[3px] sm:h-8 md:h-9 text-center border-2 border-purple-300 rounded-full text-base md:text-lg font-bold bg-white shadow focus:outline-purple-400 mx-1 sm:mx-2"
                          />
                          <button
                            className="w-7 h-7 pb-[3px] sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center bg-purple-500 text-white rounded-full text-base md:text-lg font-bold transition-all duration-150 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            onClick={() => handleOrderIncrement(item.product.id)}
                          >
                            +
                          </button>
                          <button
                            className="ml-2 text-xs sm:text-sm md:text-base text-red-500 hover:underline cursor-pointer"
                            onClick={() => handleRemoveOrderItem(item.product.id)}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                    <div className="block sm:flex sm:items-center  mt-2 sm:mt-0">
                      <div className="font-bold text-blue-600 text-sm sm:text-base md:text-lg">
                        ${" "}
                        {item.product.price
                          ? Number(item.product.price) % 1 === 0
                            ? Number(item.product.price).toLocaleString()
                            : Number(item.product.price).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                          : "-"}
                      </div>
                     <span className="mx-2 text-gray-400 font-normal">|</span>
                      <div className="text-xs sm:text-sm md:text-base text-blue-400">
                        ៛{" "}
                        {item.product.price
                          ? (item.product.price * 4100).toLocaleString("km-KH", {
                              maximumFractionDigits: 0,
                            })
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Modern Order Summary UI for all items */}
              <div className="bg-white rounded-lg shadow p-2 sm:p-3 md:p-4 mt-2 border-t">
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-3">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                  <span className="font-bold text-sm sm:text-base md:text-lg text-purple-700">
                    Order Summary
                  </span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs sm:text-sm md:text-base">Subtotal</span>
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">
                      $
                      {orderItems
                        .reduce((sum, item) => sum + (item.product.price || 0) * item.qty, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs sm:text-sm md:text-base">Discount</span>
                    <span className="font-semibold text-green-600 text-xs sm:text-sm md:text-base">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs sm:text-sm md:text-base">Tax (10%)</span>
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">
                      $
                      {(orderItems.reduce((sum, item) => sum + (item.product.price || 0) * item.qty, 0) * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 border-t pt-2">
                <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Total</span>
                <span className="font-bold text-purple-700 text-base sm:text-lg md:text-xl">
                  $
                  {(orderItems.reduce((sum, item) => sum + (item.product.price || 0) * item.qty, 0) * 1.1).toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-10 text-xs sm:text-sm md:text-base">
              Select products to see details.
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
      {error && (
        <div className="mt-8 text-center text-red-500 font-semibold text-lg">
          {error}
        </div>
      )}
    </div>
  )
};

export default Home;
