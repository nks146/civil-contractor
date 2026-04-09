import { useState } from "react";
export default function EditPostCommentModal({
    post,
    onClose,
    onSave
}) {
    /* ---------- STATES ---------- */
    const [description, setDescription] = useState(post.post_comment);    

    /* ---------- SAVE ---------- */
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("description", description);
        onSave(post.id, formData);
    };

    /* ---------- UI ---------- */
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-lg">
                <h3 className="text-white text-lg mb-4">
                    Edit Project Update
                </h3>

                {/* DESCRIPTION */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white mb-4"
                    rows="4"
                />            

                {/* BUTTONS */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="border border-gray-600 px-4 py-2 rounded text-gray-300"
                    > Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 px-4 py-2 rounded text-white"
                    > Save
                    </button>
                </div>
            </div>
        </div>
    );
}