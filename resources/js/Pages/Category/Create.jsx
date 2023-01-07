import Authenticated from "@/Layouts/AuthenticatedLayout";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";

const CreateCategory = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        category_name: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/category");
        data.category_name = "";
    }

    return (
        <Authenticated auth={auth}>
            <div className="mt-3">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex justify-between">
                            <h2 className="text-left text-xl font-bold tracking-tight text-gray-900">
                                Add Category
                            </h2>
                            <InertiaLink
                                className="flex"
                                href={route("category.index")}
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
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label
                                        for="category_name"
                                        className="sr-only"
                                    >
                                        Category name
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "category_name",
                                                e.target.value
                                            )
                                        }
                                        value={data.category_name}
                                        id="category_name"
                                        name="category_name"
                                        type="text"
                                        autocomplete="email"
                                        className="block w-full leading-5 py-2 px-3 border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        placeholder="Category name"
                                    />
                                    {errors.category_name && (
                                        <span className="text-sm text-red-500">
                                            {errors.category_name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateCategory;
