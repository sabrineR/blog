import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { getPhotoFromLocalStorage } from "../../utils/auth";
import { addComment } from "../../services/comment.service";

interface CommentFormProps {
  postId: number;
}
interface FormData {
  content: string;
}
const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const photo = getPhotoFromLocalStorage();
  const [formData, setFormData] = useState<FormData>({
    content: "",
  });
  const [error, setError] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addComment({ postId, ...formData });
      // Réinitialisation du formulaire après soumission si nécessaire
      setFormData({
        content: "",
      });
      setError(null); // Efface les erreurs précédentes
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      setError("Une erreur s'est produite lors de l'ajout du commentaire.");
    }
  };
  return (
    <Container>
      <Row className="mt-4">
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "1em" }}>
            {error}
          </div>
        )}
        <Col xs={2}>
          <Image 
            src={  
              photo
                ? photo
                : "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
            }
            roundedCircle
          />
        </Col>
        <Col xs={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Laisser un commentaire..."
                style={{ height: "100px" }}
                value={formData.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentForm;
