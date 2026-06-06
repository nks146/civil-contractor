export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
    isDangerous = true
}) {
    if (!isOpen) return null;

    const confirmButtonColor = isDangerous 
        ? "bg-red-600 hover:bg-red-700" 
        : "bg-blue-600 hover:bg-blue-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
                {/* HEADER */}
                <h3 className="text-white text-lg font-semibold mb-2">
                    {title}
                </h3>

                {/* MESSAGE */}
                <p className="text-gray-300 mb-6">
                    {message}
                </p>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="border border-gray-600 px-4 py-2 rounded text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`${confirmButtonColor} px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed transition`}
                    >
                        {isLoading ? "..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
