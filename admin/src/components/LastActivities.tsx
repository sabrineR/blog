import React, { useEffect, useState } from "react";
import { getLastCommentUsers } from "../services/comment.service";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Pagination from "./Pagination";
import { truncateContent } from "../utils/formatContent";
import { Divider } from "antd";

// Interfaces pour typer les données
interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  postId: number;
  title: string;
  content: string;
  imagePost: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  userId: number;
  userName: string;
  imagePath: string;
  posts: Post[];
}

const LastActivities: React.FC = () => {
  const [news, setNews] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data: User[] = await getLastCommentUsers();
        setNews(data);
      } catch (error) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // Nombre de posts par page

  // Index des posts actuellement affichés
  const ITEMS_PER_PAGE = 3; // Nombre d'articles par page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Latest Activity</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {currentPosts.map((user) => (
        <div key={user.id} className="mb-8">
          <div className="flex items-center mb-4">
            <img
              src={user.imagePath}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <h2 className="text-xl font-bold">{user.userName}</h2>
          </div>
          <div className="space-y-4">
            {user.posts.map((post) => (
              <div
                key={post.postId}
                className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center"
              >
                <div className="md:w-1/3 w-full relative h-48 flex justify-center items-center mb-4 md:mb-0">
                  <img
                    src={post.imagePost}
                    alt="Post"
                    className="max-h-full w-auto rounded"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-75 text-white px-2 py-1">
                    <p className="text-xs">
                      {truncateContent(post.title, 100)}
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 w-full pl-0 md:pl-4">
                  <p className="mb-4">{truncateContent(post.content,100)}</p>
                  <Divider orientation="left">Commentaires</Divider>
                  <div className="pt-2">
                    <div className="space-y-2">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="border-b pt-2">
                          <p className="text-gray-600">{truncateContent(comment.content,100)}</p>
                          <p className="text-gray-400 text-sm">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};

export default LastActivities;
