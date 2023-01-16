import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink} from "@inertiajs/inertia-react";
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
            sale_discount: "",
            sale_total: "",
            price: "",
        },
    ]);

    const handleSelected = (selectedOption, index) => {
        let formData = [...formFields];
        formData[index]["item_id"] = selectedOption.value;
        //setting sale price
        products.forEach((product) => {
            if (product.id === formData[index]["item_id"]) {
                formData[index]["price"] = product.price;
            }
        });
        setFormFields(formData);
    };

    const handleInputChange = (e, index) => {
        e.preventDefault();
        let formData = [...formFields];
        formData[index][e.target.name] = e.target.value;
        //setting sale discount
        formData[index]["sale_total"] =
            formData[index]["sale_qty"] * formData[index]["price"] -
            formData[index]["sale_discount"];
        setFormFields(formData);
    };

    const addRow = (e) => {
        e.preventDefault();
        let newRow = {
            item_id: "",
            sale_qty: "",
            sale_discount: "",
            sale_total: "",
            price: "",
        };
        setFormFields([...formFields, newRow]);
    };

    // console.log(formFields);

    function handleSubmit(e) {
        e.preventDefault();
        alert("hello");
        Inertia.post("/sale");
    }

    return (
        <Authenticated auth={auth}>
            <div className="mt-3">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-auto space-y-8">
                        <div className="flex justify-between">
                            <h2 className="text-left text-xl font-bold tracking-tight text-gray-900">
                                Create Sale dddddd
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
                        <div>
                            <button
                                onClick={addRow}
                                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                New salezzzzzzzzzzzzzz
                            </button>
                        </div>
                        <form
                            className=""
                            onSubmit={handleSubmit}
                            action={route("sale.store")}
                        >
                            <div className="space-y-3 rounded-md shadow-sm">
                                <div className="flex flex-col">
                                    <div className="sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="">
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
                                                            <th
                                                                scope="col"
                                                                className="text-sm font-medium text-gray-900 px-6 py-2"
                                                            >
                                                                Discount
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="text-sm font-medium text-gray-900 px-6 py-2"
                                                            ></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formFields.map(
                                                            (form, index) => {
                                                                return (
                                                                    <tr
                                                                        className="bg-white border-b"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                                                                            <Select
                                                                                name="item_id"
                                                                                id=""
                                                                                options={
                                                                                    options
                                                                                }
                                                                                onChange={(
                                                                                    value
                                                                                ) =>
                                                                                    handleSelected(
                                                                                        value,
                                                                                        index
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                                                                            <input
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
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
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                                                                            <h5>
                                                                                {
                                                                                    form.price
                                                                                }
                                                                            </h5>
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                                                                            <input
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleInputChange(
                                                                                        e,
                                                                                        index
                                                                                    )
                                                                                }
                                                                                type="number"
                                                                                name="sale_discount"
                                                                                id=""
                                                                                className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                                            />
                                                                        </td>
                                                                        <td className="text-sm text-gray-900 font-bold px-6 py-2 whitespace-nowrap">
                                                                            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                                Add
                                                                                Item
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Submit fffffff</button>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateSale;
