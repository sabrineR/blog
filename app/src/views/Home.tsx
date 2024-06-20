import React from "react";
import { useEffect, useState } from "react";
import { Divider } from "antd";
import "../styles/home.css";
import { fetchPosts } from "../services/post.service";
import { Post } from "../utils/interfacePost";
import Welcome from "../components/Home/Welcome";
import PostCard from "../components/Post/PostCard";
import { isAdmin, isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = isAuthenticated();
    const role = isAdmin;
    setAdmin(role);
    setIsAuth(authStatus);
    if (isAuth && admin) {
      console.log("dddd")
      navigate("/accueil");
    }
  }, [navigate,isAuth,admin]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          "Une erreur s'est produite lors de la récupération des articles."
        );
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <Welcome />
      <Divider>Article le plus récent</Divider>
      {error && <div className="error">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Home;
