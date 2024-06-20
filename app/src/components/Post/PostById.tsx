import React from "react";
import Card from "react-bootstrap/Card";
import { Post } from "../../utils/interfacePost";
import { formatDate } from "../../utils/formatDate";

interface PostCardProps {
  post: Post;
}

const PostById: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="border-0 post-card">
      <Card.Title className="m-3">{post.title}</Card.Title>
      <Card.Text className="m-3">{formatDate(post.createdAt)}</Card.Text>
      {post.imagePath && (
        <div className="post-image-container">
          <Card.Img variant="top" src={post.imagePath} className="post-image" />
        </div>
      )}
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Text className="post-content">{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostById;
