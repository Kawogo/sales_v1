import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Select from "react-select";

const CreateSale = ({ auth, products }) => {
    const [search, setSearch] = useState("");
    const options = [];

    products.map((product, index) => {
        options.push({
            label: product.item_name,
            value: product.id,
        });
    });

    const [formFields, setFormFields] = useState([
        {
            item_id: "",
            sale_qty: "",
            sale_total: "",
            price: "",
        },
    ]);

    const [discount, setDiscount] = useState(0);
    const [saleTotal, setSaleTotal] = useState(0);

    const handleSelected = (selectedOption, index) => {
        let formData = [...formFields];
        formData[index]["item_id"] = selectedOption.value;
        //setting sale price
        products.forEach((product) => {
            if (product.id === formData[index]["item_id"]) {
                formData[index]["price"] = product.price;
                formData[index]["item_name"] = product.item_name;
            }
        });
        setFormFields(formData);
    };

    const handleInputChange = (e, index) => {
        e.preventDefault();
        let formData = [...formFields];
        formData[index][e.target.name] = e.target.value;
        formData[index]["sale_id"] = 1111;
        //setting sale total
        formData[index]["sale_total"] =
            formData[index]["sale_qty"] * formData[index]["price"];
        setFormFields(formData);

        //setting sale total
        let tempTotal = 0;
        formFields.forEach((field) => {
            tempTotal += field.sale_total;
        });
        setSaleTotal(tempTotal);
    };

    const addRow = (productId) => {
        // e.preventDefault();
        // console.log(product);
        let clickedProduct = products.forEach(product => {
          if (product.id === productId) {
            return product;
          }
        });

        let newRow = {
            item_id: productId,
            sale_qty: "",
            sale_total: "",
            price: "",
        };
        setFormFields([...formFields, newRow]);
    };

    const handleDiscount = (discount) => {
        setDiscount(discount);
    };

    function handleSubmit(e) {
        e.preventDefault();

        formFields.forEach((field) => {
            field.sale_discount = +discount;
        });

        console.log(formFields);
        Inertia.post("/sale", { formFields });
    }

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
                                                    <div key={product.id} onClick={(e) => {
                                                      addRow(product.id)
                                                    }} className="w-40 cursor-pointer rounded-sm border border-violet-300 p-3 hover:bg-blue-50">
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
                                {formFields.map((field) => {
                                    if (field.item_id) {
                                        return (
                                            <div key={field.item_id} className="flex w-auto justify-between rounded-sm bg-white p-5">
                                                <h4 className="text-sm font-medium uppercase text-violet-600">
                                                    Product 01
                                                </h4>
                                                <input
                                                    className="w-16 rounded-sm border border-violet-400 p-1 focus:outline-none"
                                                    type="number"
                                                    name=""
                                                    id=""
                                                />
                                                <h4 className="text-sm font-medium text-violet-600">
                                                    2,000/=
                                                </h4>
                                            </div>
                                        );
                                    }
                                })}
                                <div className="p-5 border-2 border-violet-400 border-dashed">
                                <input
                                        className="mb-2 w-full rounded-sm border border-violet-400 px-5 py-2 focus:outline-none focus:border-0"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter total discount.."
                                    />
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Total discount:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            5,000/=
                                        </h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Subtotal:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            5,000/=
                                        </h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <h2 className="text-sm font-medium">
                                            Total:
                                        </h2>
                                        <h2 className="text-sm font-medium">
                                            5,000/=
                                        </h2>
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
