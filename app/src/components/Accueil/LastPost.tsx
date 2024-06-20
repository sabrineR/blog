import React from "react";
import { Avatar, Card } from "antd";
import { Post } from "../../utils/interfacePost";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { truncateContent } from "../../utils/formatContent";

const { Meta } = Card;
interface PostCardProps {
  post: Post;
}
const LastPost: React.FC<PostCardProps> = ({ post }) => (
  <Link to={`/post/${post.id}`} className="no-underline">
    <Card
      cover={
        <img
          alt="example"
          src={
            post.imagePath
              ? post.imagePath
              : "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
          }
        />
      }
    >
      <Meta
        title={<div style={{ textAlign: "center" }}>{post.title}</div>}
        description={
          <div style={{ textAlign: "left", marginBottom: "2em" }}>
            {truncateContent(post.content, 300)}
          </div>
        }
      />
      <Meta
        avatar={
          <Avatar
            src={
              post.User.imagePath
                ? post.User.imagePath
                : "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
            }
          />
        }
        title={<div style={{ textAlign: "left" }}>{post.User.username}</div>}
        description={
          <div style={{ textAlign: "left" }}>{formatDate(post.createdAt)}</div>
        }
      />
    </Card>
  </Link>
);

export default LastPost;
