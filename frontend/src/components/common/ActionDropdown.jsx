import { useState, useRef, useEffect } from "react";

export default function ActionDropdown({items}) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef} >
            <button onClick={() => setOpen(!open)} className="text-gray-300 hover:text-white px-2 py-1 text-xl">
                ⋮
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                            className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${item.color || "text-gray-300"}`}>
                            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

}