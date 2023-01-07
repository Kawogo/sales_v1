import MessageAlert from "@/Components/MessageAlert";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

const Index = ({ auth, categories, flash }) => {
    const deleteHandler = (id) => {
        confirm("Are you sure") &&
            Inertia.delete(route("category.destroy", id));
    };
    return (
        <Authenticated auth={auth}>
            <div className="mt-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {flash.message && (
                    <MessageAlert message={flash.message}></MessageAlert>
                )}
                <div className="mb-3">
                    <InertiaLink
                        href={route("category.create")}
                        class="focus:outline-none px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add new category
                    </InertiaLink>
                </div>
                <hr />
                <div class="mt-3 relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                    <table class="w-full text-sm text-left text-white-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Category name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.data.map((category) => {
                                return (
                                    <tr class="bg-white border-b">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-dark-900 whitespace-nowrap"
                                        >
                                            {category.category_name}
                                        </th>
                                        <td class="px-6 py-4 flex">
                                            <InertiaLink
                                                href={route(
                                                    "category.edit",
                                                    category.id
                                                )}
                                                class="font-medium text-blue-600 hover:underline"
                                            >
                                                <svg
                                                    class="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    ></path>
                                                </svg>
                                            </InertiaLink>

                                            <a
                                                href="#"
                                                class="font-medium text-red-600 hover:underline"
                                                onClick={deleteHandler.bind(
                                                        null,
                                                        category.id
                                                    )
                                                }
                                            >
                                                <svg
                                                    class="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination links={categories.links} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
