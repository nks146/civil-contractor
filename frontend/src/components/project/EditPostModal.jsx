import { useState } from "react";
export default function EditPostModal({
    post,
    onClose,
    onSave
}) {
    /* ---------- STATES ---------- */
    const [description, setDescription] = useState(post.post_comment);
    const [existingImages, setExistingImages] = useState(post.images || []);
    const [newImages, setNewImages] = useState([]);
    const [preview, setPreview] = useState([]);

    /* ---------- HANDLE IMAGE SELECT ---------- */
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        const previewUrls = files.map(file =>
            URL.createObjectURL(file)
        );
        setPreview(previewUrls);
    };

    /* ---------- REMOVE EXISTING IMAGE ---------- */
    const removeExistingImage = (img) => {
        setExistingImages( existingImages.filter(i => i !== img) );
    };


    /* ---------- REMOVE NEW IMAGE ---------- */
    const removeNewImage = (index) => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
        const updatedPreview = [...preview];
        updatedPreview.splice(index, 1);
        setPreview(updatedPreview);
    };


    /* ---------- SAVE ---------- */
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("description", description);
        formData.append(
            "existingImages",
            JSON.stringify(existingImages)
        );

        newImages.forEach(file => {
            formData.append("images", file);
        });
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

                {/* EXISTING IMAGES */}
                <h4 className="text-gray-300 mb-2">
                    Existing Images
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {existingImages.map(img => (
                        <div key={img} className="relative">
                            <img
                                src={img}
                                className="rounded h-24 w-full object-cover"
                            />
                            <button
                                onClick={() => removeExistingImage(img)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                            >X
                            </button>
                        </div>
                    ))}
                </div>

                {/* UPLOAD */}
                <input type="file" multiple onChange={handleImageChange} className="mb-4 text-gray-300"/>

                {/* NEW IMAGE PREVIEW */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {preview.map((img, index) => (
                        <div key={index} className="relative">
                            <img src={img} className="rounded h-24 w-full object-cover"/>
                            <button
                                onClick={() => removeNewImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                            > X </button>
                        </div>
                    ))}
                </div>

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