import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { EditOutlined } from "@ant-design/icons";
import { Post } from "../../utils/interfacePost";
import uploadFileToS3, {
  UploadParams,
} from "../../services/upload.file.service";
import { updatePost } from "../../services/post.service";

interface PostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
}

const EditPost: React.FC<PostCardProps> = ({ post, setPosts, posts }) => {
  const [editPost, setEditPost] = useState<Post>({ ...post });
  const [imageChanged, setImageChanged] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [show, setShow] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isImageUpdated = useRef(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageChanged(true);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSaveChanges = async () => {
    const payload = {
      title: editPost.title,
      content: editPost.content,
      imagePath: editPost.imagePath,
    };

    if (imageChanged && imageFile) {
      const uploadParams: UploadParams = {
        bucketName: "blog-app-react",
        dirName: "images",
        s3Url: "https://blog-app-react.s3.eu-west-3.amazonaws.com",
        file: imageFile,
      };

      try {
        const imageUrl = await uploadFileToS3(uploadParams);
        if (imageUrl) {
          payload.imagePath = imageUrl;
          setEditPost((prevState) => ({ ...prevState, imagePath: imageUrl }));
          isImageUpdated.current = true;
        }
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        return;
      }
    }

    try {
      await updatePost(post.id, payload);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, ...payload } : p))
      );
      handleClose();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    if (isImageUpdated.current) {
      const payload = {
        title: editPost.title,
        content: editPost.content,
        imagePath: editPost.imagePath,
      };

      updatePost(post.id, payload).then(() => {
        handleClose();
        isImageUpdated.current = false;
      });
    }
  }, [editPost, post.id]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <>
      <EditOutlined onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Titre"
                value={editPost.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Contenu de l'article</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={editPost.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="imagePath"
                onChange={handleImageChange}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  style={{ maxWidth: "100%", marginTop: 10 }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPost;
