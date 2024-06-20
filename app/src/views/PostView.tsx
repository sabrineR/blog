import React, { useEffect, useState } from "react";
import "../styles/post.view.css";
import { useParams } from "react-router-dom";
import { Post } from "../utils/interfacePost";
import { getPostById } from "../services/post.service";
import PostById from "../components/Post/PostById";
import CommentForm from "../components/Comment/CommentForm";
import ListCommentOfPost from "../components/Comment/ListCommentsOfPost";
import { Divider } from "antd";
import BackToHomeButton from "../components/Button/BackToHomeButton";

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(Number(id));
        setPost(response);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article:", error);
        setError(
          "Une erreur s'est produite lors de la récupération de l'article."
        );
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div className="post-view-container">
      <BackToHomeButton />
      <div className="post-block">
        {error && <div className="error">{error}</div>}
        {post ? <PostById post={post} /> : <div>Chargement...</div>}
      </div>
      <div className="comment-form-block">
        <CommentForm postId={Number(id)} />
      </div>
      <Divider orientation="left">Liste des commentaires:</Divider>
      <div className="comment-list-block">
        <ListCommentOfPost comments={post?.Comments || []} />
      </div>
    </div>
  );
};

export default PostView;
