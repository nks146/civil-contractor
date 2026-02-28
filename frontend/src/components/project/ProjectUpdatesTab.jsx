export default function ProjectUpdatesTab({ posts }) {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id}
          className="bg-gray-800 border border-gray-700 rounded-xl p-5"
        >
          <p className="text-gray-400 text-sm mb-3">
            Date: {post.created_on.slice(0, 10)}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {Array.isArray(post.images) && post.images.map(img => (
              <img
                key={img}
                src={img}
                className="rounded-lg h-32 w-full object-cover"
              />
            ))}
          </div>
          <p className="text-gray-300">
            {post.post_comment}
          </p>          
          <button onClick={()=>onEdit(post)} className="text-blue-400 text-sm hover:text-blue-300" >Edit</button>
        </div>
      ))}
    </div>
  );
}