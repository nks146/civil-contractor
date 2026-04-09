import { useState } from "react";
import EditDropdown from "./EditPostDropdown";
import EditPostCommentModal from "./EditPostCommentModal";
import EditPostImageModal from "./EditPostImageModal";

export default function ProjectUpdatesTab({ posts, onEdit }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  if (!posts.length) return <p>No updates yet</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-800 border border-gray-700 rounded-xl p-5"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-400 text-sm mb-1">
                Date: {post.created_on.slice(0, 10)}
              </p>
              <p className="text-gray-300">{post.post_comment}</p>
            </div>

            <EditDropdown
              onEditComment={() => {
                setSelectedPost(post);
                setShowCommentModal(true);
              }}
              onEditImages={() => {
                setSelectedPost(post);
                setShowImageModal(true);
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {Array.isArray(post.images) &&
              post.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  className="rounded-lg h-32 w-full object-cover"
                />
              ))}
          </div>
        </div>
      ))}

      {showCommentModal && selectedPost && (
        <EditPostCommentModal
          post={selectedPost}
          onClose={() => setShowCommentModal(false)}
          onSave={onEdit}
        />
      )}

      {showImageModal && selectedPost && (
        <EditPostImageModal
          post={selectedPost}
          onClose={() => setShowImageModal(false)}
          onSave={onEdit}
        />
      )}
    </div>
  );
}