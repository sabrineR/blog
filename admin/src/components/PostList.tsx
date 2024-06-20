// PostList.tsx

import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Pagination from "./Pagination";
import { deletePost, fetchPosts } from "../services/post.service";
import { Post } from "../utils/interfacePost";
import { formatDate } from "../utils/formatDate";
import { truncateContent } from "../utils/formatContent";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const PostList: React.FC = () => {
  const ITEMS_PER_PAGE = 8; // Nombre d'articles par page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]); // Initial state as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { confirm } = Modal;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleDeletePost = (id: number) => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer cet article ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await deletePost(id);
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (error: any) {
          console.error("Échec de la suppression:", error?.message);
          setError(error?.message);
        }
      },
      onCancel() {
        console.log("Annulé");
      },
    });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  // Pagination
  const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // Ensure posts is always an array
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Article List</h1>
      <div className="overflow-x-auto text-center">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="w-1/12 py-3 px-1 uppercase font-semibold text-sm">
                Id
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Image
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Title
              </th>
              <th className="w-1/4 py-3 px-1 uppercase font-semibold text-sm">
                Content
              </th>
              <th className="w-1/12 py-3 px-1 uppercase font-semibold text-sm">
                Author Id
              </th>
              <th className="w-1/6 py-3 px-1 uppercase font-semibold text-sm">
                Comment Id
              </th>
              <th className="w-1/12 py-3 px-1 uppercase font-semibold text-sm">
                Date
              </th>
              <th className="w-1/12 py-3 px-1 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-300">
                <td className="py-3 px-1">{post.id}</td>
                <td className="py-3 px-1">
                  <img
                    src={post.imagePath}
                    alt="article"
                    className="w-10 h-8 full mx-auto"
                  />
                </td>
                <td className="py-3 px-1">{post.title}</td>
                <td className="py-3 px-1">
                  {truncateContent(post.content, 100)}
                </td>
                <td className="py-3 px-1">{post.userId}</td>
                <td className="py-3 px-1">
                  {post.Comments.length === 0
                    ? "No comment"
                    : post.Comments.map((comment) => (
                        <span key={comment.id}>{comment.id}, </span>
                      ))}
                </td>
                <td className="py-3 px-1">{formatDate(post.createdAt)}</td>
                <td className="py-3 px-1 flex justify-center items-center">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-1 py-2 rounded hover:bg-red-700 flex items-center text-center justify-center"
                  >
                    <FaTrash className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};

export default PostList;
