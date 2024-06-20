import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Pagination from "./Pagination";
import { Comment } from "../utils/commentInterface";
import { formatDate } from "../utils/formatDate";
import { truncateContent } from "../utils/formatContent";
import { deleteComment, getComments } from "../services/comment.service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const CommentList: React.FC = () => {
  const ITEMS_PER_PAGE = 8; // Nombre de commentaires par page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { confirm } = Modal;

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const comments = await getComments();
        setComments(comments);
      } catch (error) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };
    getAllComments();
  }, []);

  const handleDeleteComment = (id: number) => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce commentaire ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await deleteComment(id);
          setComments(comments.filter((comment) => comment.id !== id));
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
  const indexOfLastComment = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstComment = indexOfLastComment - ITEMS_PER_PAGE;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Comment List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="w-1/8 py-3 px-4 uppercase font-semibold text-sm">
                Id
              </th>
              <th className="w-1/7 py-3 px-4 uppercase font-semibold text-sm">
                Post Id
              </th>
              <th className="w-1/8 py-3 px-4 uppercase font-semibold text-sm">
                User Id
              </th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                Content
              </th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">
                Date
              </th>
              <th className="w-1/8 py-3 px-4 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-300">
                <td className="py-3 px-4 text-sm">{comment.id}</td>
                <td className="py-3 px-4 text-sm">{comment.postId}</td>
                <td className="py-3 px-4 text-sm">{comment.userId}</td>
                <td className="py-3 px-4 text-sm">
                  {truncateContent(comment.content, 100)}
                </td>
                <td className="py-3 px-4 text-sm">
                  {formatDate(comment.createdAt)}
                </td>
                <td className="py-3 px-4 flex justify-center items-center text-sm">
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center"
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

export default CommentList;
