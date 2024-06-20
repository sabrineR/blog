import React from "react";

interface PostCardProps {
  post: Post;
}
interface Post {
  id: number;
  title: string;
  imagePath: string;
  User: {
    imagePath?: string;
    username: string;
  };
  Comments: any[];
  createdAt: Date;
}

const NewPosts: React.FC<PostCardProps> = ({ post }) => {
  // Fonction pour calculer la durée depuis la création du post
  const formatTimeAgo = (createdAt: Date) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hours >= 24) {
      return `${Math.floor(hours / 24)} jours`;
    } else if (hours > 0) {
      return `il y a ${hours} heures`;
    } else {
      return `il y a quelques minutes`;
    }
  };

  return (
    <div>
      <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2 text-center">{post.title}</h2>
        <img
          src={post.imagePath}
          alt={post.title}
          className="rounded-lg mb-2"
        />
        <div className="flex items-center mb-2">
          {post.User && post.User.imagePath ? (
            <img
              src={post.User.imagePath}
              alt={post.User.username}
              className="w-10 h-10 rounded-full mr-2"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          )}
          <p className="text-sm text-gray-700">
            {post.User ? post.User.username : "Utilisateur inconnu"}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Commentaires : {post.Comments ? post.Comments.length : 0}
        </p>
        <p className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</p>
      </div>
    </div>
  );
};

export default NewPosts;
