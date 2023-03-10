import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Select from "react-select";

const CreateProduct = ({ auth, categories }) => {
    const options = [];

    categories.map((category, index) => {
        options.push({
            label: category.category_name,
            value: category.id,
        });
    });

    const { data, setData, post, processing, errors } = useForm({
        item_name: "",
        item_code: "",
        price: "",
        stock_qty: "",
        category_id: "",
    });

    const handleSelected = (selectedOption) => {
        setData("category_id", selectedOption.value);
    };

    function submit(e) {
        e.preventDefault();
        post("/product");
    }

    return (
        <Authenticated auth={auth}>
            <div className="mt-3">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex justify-between">
                            <h2 className="text-left text-xl font-bold tracking-tight text-gray-900">
                                Add Product
                            </h2>
                            <InertiaLink
                                className="flex"
                                href={route("product.index")}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    ></path>
                                </svg>
                            </InertiaLink>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={submit}
                            action=""
                            method="POST"
                        >
                            <div className="space-y-3 rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="">Category</label>
                                    <Select
                                        // isSearchable={true}
                                        name="category_id"
                                        id="category_id"
                                        options={options}
                                        onChange={handleSelected}
                                    />
                                    {errors.item_code && (
                                        <span className="text-sm text-red-500">
                                            {errors.item_code}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label for="item_name">Product code</label>
                                    <input
                                        onChange={(e) =>
                                            setData("item_code", e.target.value)
                                        }
                                        value={data.item_code}
                                        id="item_code"
                                        name="item_code"
                                        type="text"
                                        autocomplete="email"
                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    {errors.item_code && (
                                        <span className="text-sm text-red-500">
                                            {errors.item_code}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label for="item_name">Product name</label>
                                    <input
                                        onChange={(e) =>
                                            setData("item_name", e.target.value)
                                        }
                                        value={data.item_name}
                                        id="item_name"
                                        name="item_name"
                                        type="text"
                                        autocomplete="email"
                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    {errors.item_name && (
                                        <span className="text-sm text-red-500">
                                            {errors.item_name}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label for="price">Product price</label>
                                    <input
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        value={data.price}
                                        id="price"
                                        name="price"
                                        type="text"
                                        autocomplete="email"
                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    {errors.price && (
                                        <span className="text-sm text-red-500">
                                            {errors.price}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label for="stock_qty">
                                        Stock Quantity
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setData("stock_qty", e.target.value)
                                        }
                                        value={data.stock_qty}
                                        id="stock_qty"
                                        name="stock_qty"
                                        type="text"
                                        autocomplete="email"
                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    {errors.stock_qty && (
                                        <span className="text-sm text-red-500">
                                            {errors.stock_qty}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateProduct;
