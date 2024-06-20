import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import uploadFileToS3, {
  UploadParams,
} from "../../services/upload.file.service";
import { addPost } from "../../services/post.service";
import { ICreatePost } from "../../utils/interfacePost";

const CreateArticle: React.FC = () => {
  const [newPost, setNewPost] = useState<ICreatePost>({
    title: "",
    content: "",
    imagePath: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [show, setShow] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSaveChanges = async () => {
    if (imageFile) {
      const uploadParams: UploadParams = {
        bucketName: "blog-app-react",
        dirName: "images",
        s3Url: "https://blog-app-react.s3.eu-west-3.amazonaws.com",
        file: imageFile,
      };

      try {
        const imagePath = await uploadFileToS3(uploadParams);
        if (imagePath) {
          const payload = {
            title: newPost.title,
            content: newPost.content,
            imagePath: imagePath,
          };
          await addPost(payload);
          handleClose();
          window.location.reload();
        }
      } catch (error) {
        console.error("Error uploading image to S3:", error);
      }
    } else {
      const payload = {
        title: newPost.title,
        content: newPost.content,
        imagePath: newPost.imagePath,
      };

      await addPost(payload);
      handleClose();
      window.location.reload();
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ width: "80%", backgroundColor: "#e9ecef", color: "gray" }}
      >
        Créer votre article
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="titre"
                value={newPost.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Contenu de l'article</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={newPost.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Image </Form.Label>
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

export default CreateArticle;
