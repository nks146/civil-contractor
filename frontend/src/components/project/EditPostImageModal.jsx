import { useState } from "react";
import { deletePostImage } from "../../services/projectService";
import ConfirmationModal from "../common/ConfirmationModal";
export default function EditPostImageModal({
    post,
    onClose,
    onSave
}) {
    /* ---------- STATES ---------- */
    const [existingImages, setExistingImages] = useState(post.images || []);
    const [newImages, setNewImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    /* ---------- HANDLE IMAGE SELECT ---------- */
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        const previewUrls = files.map(file =>
            URL.createObjectURL(file)
        );
        setPreview(previewUrls);
    };

    /* ---------- HANDLE DRAG AND DROP ---------- */
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            setNewImages(files);
            const previewUrls = files.map(file =>
                URL.createObjectURL(file)
            );
            setPreview(previewUrls);
        }
    };

    /* ---------- REMOVE EXISTING IMAGE ---------- */
    const removeExistingImage = (imgId) => {
        setImageToDelete(imgId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePostImage(imageToDelete);
            setExistingImages(existingImages.filter(i => i.id !== imageToDelete));
            setShowConfirmation(false);
            setImageToDelete(null);
        } catch (error) {
            console.error("Failed to delete image:", error);
            alert("Failed to delete image. Please try again.");
            setShowConfirmation(false);
        } finally {
            setIsDeleting(false);
        }
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
    const handleSubmit = async () => {
        const formData = new FormData();
        /*formData.append(
            "existingImages",
            JSON.stringify(existingImages)
        );*/

        newImages.forEach(file => {
            formData.append("images", file);
        }); 
        await onSave(post.id, formData);
        onClose();
    };

    /* ---------- UI ---------- */
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-lg">
                <h3 className="text-white text-lg mb-4">
                    Edit Project Update
                </h3>

                {/* EXISTING IMAGES */}
                {existingImages.filter(img => img.id > 0).length > 0 ? (
                    <h4 className="text-gray-300 mb-2">
                        Existing Images
                    </h4>
                ) : (
                    <h4 className="text-gray-300 mb-2">
                        Upload Images
                    </h4>
                )}
                <div className="grid grid-cols-3 gap-3 mb-4"> 
                    {Array.isArray(existingImages.filter(img => img.id > 0)) && existingImages.filter(img => img.id > 0).map(img => (
                        <div key={img.id} className="relative">
                            <img
                                src={img.image_path}
                                className="rounded h-24 w-full object-cover"
                            />
                            <button
                                onClick={() => removeExistingImage(img.id)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                            >X
                            </button>
                        </div>
                    ))}
                </div>

                {/* UPLOAD */}
                <div className="mb-4">
                    <label className="block">
                        <div 
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                                isDragOver 
                                    ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                                    : 'border-gray-600 hover:border-blue-500'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-gray-300 font-medium">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-gray-400 text-sm">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleImageChange} 
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

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

            {/* CONFIRMATION MODAL */}
            <ConfirmationModal
                isOpen={showConfirmation}
                title="Delete Image"
                message="Are you sure you want to delete this image? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowConfirmation(false)}
            />
        </div>
    );
}
