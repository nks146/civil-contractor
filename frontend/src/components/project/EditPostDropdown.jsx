import { useState } from "react";

export default function EditDropdown({ onEditComment, onEditImages }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} className="border px-3 py-1 rounded">
        ... ▼
      </button>

      {open && (
        <div className="absolute right-0 bg-white border rounded shadow-md">
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              onEditComment();
              setOpen(false);
            }}
          >
            Edit Comment
          </button>

          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              onEditImages();
              setOpen(false);
            }}
          >
            Edit Images
          </button>
        </div>
      )}
    </div>
  );
}