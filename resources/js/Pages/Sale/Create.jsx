import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Select from "react-select";

const CreateSale = ({ auth, products }) => {
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

    const addRow = (e) => {
        e.preventDefault();
        let newRow = {
            item_id: "",
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
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="space-y-8 rounded-md shadow-sm md:col-span-1">
                                <form
                                    className="space-y-2"
                                    onSubmit={handleSubmit}
                                    action={route("sale.store")}
                                >
                                    {formFields.map((form, index) => {
                                        return (
                                            <>
                                                <div>
                                                    <label htmlFor="">
                                                        Item
                                                    </label>
                                                    <Select
                                                        name="item_id"
                                                        id=""
                                                        options={options}
                                                        onChange={(value) =>
                                                            handleSelected(
                                                                value,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="">
                                                        Qty
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        type="number"
                                                        name="sale_qty"
                                                        id=""
                                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <span onClick={addRow}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 cursor-pointer text-blue-600"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M12 4.5v15m7.5-7.5h-15"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 cursor-pointer text-red-600"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <hr />
                                            </>
                                        );
                                    })}
                                    <hr />
                                    <div>
                                        <label htmlFor="">Discount</label>
                                        <input
                                            onChange={(e) =>
                                                handleDiscount(e.target.value)
                                            }
                                            type="number"
                                            name="sale_discount"
                                            id=""
                                            className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                    <button
                                        className="px-3 py-2 mt-8 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div className="md:col-span-2">
                                <h5>SALE SUMMARY</h5>
                                <div className="">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full text-center">
                                                    <thead className="border-b bg-white">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="text-sm font-medium text-gray-900 px-6 py-2"
                                                            >
                                                                Item
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="text-sm font-medium text-gray-900 px-6 py-2"
                                                            >
                                                                Qty
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="text-sm font-medium text-gray-900 px-6 py-2"
                                                            >
                                                                Price
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formFields.map(
                                                            (field, index) => {
                                                                return (
                                                                    <tr
                                                                        className="bg-white border-b"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                            {
                                                                                field.item_name
                                                                            }
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                                            {
                                                                                field.sale_qty
                                                                            }
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                                            {field.sale_total.toLocaleString()}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                    SUBTOTAL AMOUNT: {saleTotal} <br />
                                                    DISCOUNT: {discount} <br />
                                                    TOTAL AMOUNT:{" "}
                                                    {saleTotal - discount}
                                                </table>
                                            </div>
                                        </div>
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
