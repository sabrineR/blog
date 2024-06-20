import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateComment } from "../../services/comment.service";
import { IEditComment } from "../../utils/commentInterface";

interface CommentCardProps {
  comment: IEditComment;
  onUpdateComment: (comment: IEditComment) => void;
}

const EditComment: React.FC<CommentCardProps> = ({
  comment,
  onUpdateComment,
}) => {
  const [editComment, setEditComment] = useState({ ...comment });
  const [show, setShow] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditComment({ ...editComment, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        content: editComment.content,
      };
      await updateComment(comment.id, payload);
      onUpdateComment(editComment); // Mise à jour de l'état dans le composant parent
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span className="edit-delt" onClick={handleShow}>
        Modifier
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contenu</Form.Label>
              <Form.Control
                type="text"
                name="content"
                placeholder="Contenu"
                value={editComment.content}
                onChange={handleChange}
              />
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

export default EditComment;
