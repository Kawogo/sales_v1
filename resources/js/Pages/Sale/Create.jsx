import MessageAlert from "@/Components/MessageAlert";
import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Select from "react-select";

const CreateSale = ({ auth, products }) => {
    const [search, setSearch] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [alert, setAlert] = useState(false);
    const [discount, setDiscount] = useState(0);
    // const [subTotal, setSubTotal] = useState(0);

    //calculating a subtotal
    let subTotal = 0;

    cartItems.forEach((item) => {
        subTotal += item.sale_total;
    });

    //add item to cart
    const addToCart = (product) => {
        let newItem = {
            item_id: product.id,
            sale_qty: 1,
            sale_total: product.price,
            item_name: product.item_name,
            price: product.price,
        };
        //check if the item is on the cart
        let isItemExists = cartItems.find(
            (item) => item.item_id === product.id
        );
        if (isItemExists) {
            setAlert(true);
            return;
        }
        setCartItems([...cartItems, newItem]);
        setAlert(false);
    };

    //increase cart quantity
    const increaseCartItem = (productId) => {
        let updatedCartItems = cartItems.map((item) => {
            if (item.item_id === productId) {
                item.sale_qty++;
                item.sale_total = item.sale_qty * item.price;
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    //decrease cart quantity
    const decreaseCartItem = (productId) => {
        let updatedCartItems = cartItems.map((item) => {
            if (item.item_id === productId) {
                if (item.sale_qty > 1) {
                    item.sale_qty--;
                    item.sale_total = item.sale_qty * item.price;
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    //remove item from cart
    const removeItem = (productId) => {
        let newItems = cartItems.filter((item) => item.item_id !== productId);
        setCartItems(newItems);
    };

    const submitSale = (e) => {
        e.preventDefault();
        //add discount
        cartItems.forEach((item) => {
            item.sale_discount = discount;
        });
        Inertia.post("/sale", { cartItems });
    };

    return (
        <Authenticated auth={auth}>
            <div className="mt-3">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-auto space-y-8">
                        <div className="flex justify-between">
                            <h2 className="text-left text-xl font-bold tracking-tight text-gray-900">
                                Create Sale
                            </h2>
                            <InertiaLink
                                className="flex"
                                href={route("sale.index")}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    ></path>
                                </svg>
                            </InertiaLink>
                        </div>
                        <div className="mt-4 grid gap-3 p-3 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <div className="flex gap-2">
                                    <input
                                        className="w-full rounded-sm border border-violet-400 px-5 py-2 focus:outline-none"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Search product by name..."
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                    />
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div>
                                    {alert && (
                                        <div>
                                            <MessageAlert
                                                message="Product already on cart!"
                                                type="error"
                                            ></MessageAlert>
                                        </div>
                                    )}

                                    <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-1 sm:grid-cols-2 md:grid-cols-4">
                                        {products
                                            .filter((product) => {
                                                return search.toLowerCase() ===
                                                    ""
                                                    ? product
                                                    : product.item_name
                                                          .toLowerCase()
                                                          .includes(search);
                                            })
                                            .map((product) => {
                                                return (
                                                    <div
                                                        key={product.id}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addToCart(product);
                                                        }}
                                                        className="w-40 cursor-pointer rounded-sm border border-violet-300 p-3 hover:bg-blue-50"
                                                    >
                                                        <h6 className="text-center">
                                                            {product.item_name}
                                                        </h6>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 rounded-md bg-violet-50 p-5 md:col-span-1">
                                <h2 className="text-lg font-medium">
                                    CART (4)
                                </h2>

                                {cartItems.map((product) => {
                                    return (
                                        <div
                                            key={product.item_id}
                                            className="flex w-auto justify-between items-center rounded-sm bg-white p-5"
                                        >
                                            <h4 className="text-sm font-sm text-violet-600">
                                                {product.item_name}
                                            </h4>
                                            <div className="flex justify-between items-center gap-4">
                                                <span
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        increaseCartItem(
                                                            product.item_id
                                                        );
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-5 w-5 cursor-pointer"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </span>
                                                <span>{product.sale_qty}</span>
                                                {/* <input
                                                    value={product.sale_qty}
                                                    className="w-10 text-center rounded-sm border border-violet-400 p-1 focus:outline-none"
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        updateCartItem(
                                                            product.item_id,
                                                            "increase"
                                                        );
                                                    }}
                                                /> */}
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-5 w-5 cursor-pointer"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            decreaseCartItem(
                                                                product.item_id
                                                            );
                                                        }}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-medium text-violet-600">
                                                {product.sale_total.toLocaleString()}
                                            </h4>
                                            <span>
                                                <svg
                                                    className="w-5 h-5 text-red-600 cursor-pointer"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeItem(
                                                            product.item_id
                                                        );
                                                    }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </div>
                                    );
                                })}

                                <div className="p-5 border-2 border-violet-400 border-dashed">
                                    <input
                                        className="mb-2 w-full rounded-sm border border-violet-400 px-5 py-2 focus:outline-none focus:border-0"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter total discount.."
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setDiscount(+e.target.value);
                                        }}
                                    />
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Subtotal:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            {subTotal.toLocaleString()}
                                        </h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Total discount:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            {discount.toLocaleString()}
                                        </h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Total:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            {(
                                                subTotal - discount
                                            ).toLocaleString()}
                                        </h2>
                                    </div>
                                    <div>
                                        <button
                                            onClick={submitSale}
                                            className="bg-violet-400 w-full py-2 text-white mt-2 rounded-sm"
                                        >
                                            Submit sale
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateSale;
