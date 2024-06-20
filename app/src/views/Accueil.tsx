import "../styles/accueil.css";
import CreatePost from "../components/Post/CreatePost";
import { Divider } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Post } from "../utils/interfacePost";
import { deletePost, fetchPosts } from "../services/post.service";
import LastPost from "../components/Accueil/LastPost";
import { MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col, Container, Row } from "react-bootstrap";
import {
  getPhotoFromLocalStorage,
  getUserFromLocalStorage,
} from "../utils/auth";
import EditPost from "../components/Post/EditPost";
import NewPosts from "../components/Post/NewPosts";
const Accueil: React.FC = () => {
  const userId = getUserFromLocalStorage();
  const imagePath = getPhotoFromLocalStorage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { confirm } = Modal;
  const getPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const latestPosts = posts.filter((post) => {
    const createdDate = new Date(post.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    return hoursDiff <= 24;
  });

  const handleDelete = (id: number) => {
    confirm({
      title: "Êtes-vous sûre de supprimer cet article ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          const data = await deletePost(id);
          if (data) getPosts();
        } catch (error: any) {
          console.error("Delete failed:", error?.message);
          setError(error?.message);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="container full-width">
      <div className="block-post bloc-create ">
        <img
          src={
            imagePath !== null
              ? imagePath
              : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
          }
          alt="Avatar"
          className="avatar"
        />
        <CreatePost />
      </div>
      <Divider className="divider">Articles</Divider>
      {error && (
        <div style={{ color: "red", textAlign: "center", marginTop: "1em" }}>
          {error}
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {posts.map((post) => (
              <div className="border-rounded-card mb-4">
                {post.userId === Number(userId) && (
                  <div className="mb-2 delete-edit items-center">
                    <Container>
                      <Row className="delete-edit">
                        <Col className="col-border">
                          {" "}
                          <EditPost
                            key={post.id}
                            post={post}
                            setPosts={setPosts}
                            posts={posts}
                          />
                        </Col>
                        <Col>
                          {" "}
                          <DeleteOutlined
                            onClick={() => handleDelete(post.id)}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
                <LastPost post={post} />
                <div className="border-top-bottom flex items-center mt-2">
                  <MessageOutlined className="mr-1" /> {post.Comments.length}{" "}
                  Commentaires
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="container mx-auto p-4">
              <Divider className="divider">Articles dans derniers 24h</Divider>
              {latestPosts.map((post) => (
                <div className="border-rounded-card mb-4">
                  <NewPosts post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
