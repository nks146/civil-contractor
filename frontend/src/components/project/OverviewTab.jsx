import { useState } from "react";
import EditDropdown from "./EditPostDropdown";
import EditPostCommentModal from "./EditPostCommentModal";
import EditPostImageModal from "./EditPostImageModal";

export default function OverviewTab({ latestPost, onEdit }) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
 if(!latestPost)
   return <p>No updates yet</p>;

 return (

  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
     <div className="flex justify-between mb-4">
       <h3 className="text-lg text-white">
         Latest Update
       </h3>
       <EditDropdown
        onEditComment={() => setShowCommentModal(true)}
        onEditImages={() => setShowImageModal(true)}
       />
     </div>

    <p className="text-gray-400 text-sm">
     {latestPost.created_on.slice(0,10)}
    </p> 
     {/* Description */}

    <p className="text-gray-300 mb-3">
     {latestPost.post_comment}
    </p>
   
   {/* Images */}

   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">

     {Array.isArray(latestPost.images) && latestPost.images.map(img => (

       <img
        key={img}
        src={img}
        className="rounded-lg h-32 w-full object-cover"
       />

     ))}

   </div>
   {/* Modals */}
      {showCommentModal && (
        <EditPostCommentModal
          post={latestPost}
          onClose={() => setShowCommentModal(false)}
          onSave={onEdit}
        />
      )}

      {showImageModal && (
        <EditPostImageModal
          post={latestPost}
          onClose={() => setShowImageModal(false)}
          onSave={onEdit}
        />
      )}

  </div>

 );
}