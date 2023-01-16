import React from "react";

const SaleItemRow = () => {
    return (
        <div>
            <tr className="bg-white border-b">
                <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                    <Select
                        name=""
                        id=""
                        options={options}
                        onChange={handleSelected}
                    />
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                    <input
                        type="number"
                        name=""
                        id=""
                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                    <h5>30,000/=</h5>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                    <input
                        type="number"
                        name=""
                        id=""
                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                    <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Item
                    </button>
                </td>
            </tr>
        </div>
    );
};

export default SaleItemRow;
