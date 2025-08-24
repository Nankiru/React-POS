import React from "react";

const NewOrder = () => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="bg-purple-50 rounded-xl shadow-md px-8 py-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">New Order</h1>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Customer Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400" placeholder="Enter customer name" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400" placeholder="Enter phone number" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Order Notes</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400" placeholder="Add notes (optional)" rows={3}></textarea>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 mt-2">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
