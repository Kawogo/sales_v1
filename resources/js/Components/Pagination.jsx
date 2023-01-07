import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => {
                        // console.log(link.label);
                        let label = ``;
                        if (link.label === "&laquo; Previous") {
                            label = "Previous";
                        } else if (link.label === "Next &raquo;") {
                            label = "Next";
                        }
                        else{
                            label = link.label
                        }
                        let result;
                     
                        if (link.url === null){
                           return <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                            {label}
                        </div>
                        } 
                        return <Link
                                className={getClassName(link.active)}
                                href={link.url}
                                key={key}
                            >
                                {label}
                            </Link>
                    })}
                </div>
            </div>
        )
    );
}
