import React from "react";
import { Avatar, Card } from "antd";
import { Post } from "../../utils/interfacePost";
import { formatDate } from "../../utils/formatDate";

const { Meta } = Card;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <Card
    cover={
      <img
        alt="example"
        src={
          post.imagePath
            ? post.imagePath
            : "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
        }
        className="w-full h-48 object-cover"
      />
    }
  >
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
      title={post.title}
      description={formatDate(post.createdAt)}
    />
  </Card>
);

export default PostCard;
