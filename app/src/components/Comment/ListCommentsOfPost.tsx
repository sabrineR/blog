import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteComment } from "../../services/comment.service";
import EditComment from "./EditComment";
import { IEditComment } from "../../utils/commentInterface";
import { getUserFromLocalStorage } from "../../utils/auth";

interface CommentListProps {
  comments: IEditComment[] | null;
}

const ListCommentOfPost: React.FC<CommentListProps> = ({
  comments: initialComments,
}) => {
  const userId = getUserFromLocalStorage();
  const { confirm } = Modal;
  const [comments, setComments] = useState<IEditComment[] | null>(
    initialComments
  );

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleUpdateComment = (updatedComment: IEditComment) => {
    if (comments) {
      setComments((prevComments) =>
        prevComments
          ? prevComments.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment
            )
          : null
      );
    }
  };

  const handleDelete = (id: number) => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer ce commentaire ?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          await deleteComment(id);
          if (comments) {
            setComments(comments.filter((comment) => comment.id !== id));
          }
        } catch (error: any) {
          console.error("Échec de la suppression:", error?.message);
        }
      },
      onCancel() {
        console.log("Annulé");
      },
    });
  };
  return (
    <Container>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Row key={index} className="mb-3 comment-row">
            <Col xs="auto">
              <Image
                src={
                  comment.User.imagePath
                    ? comment.User.imagePath
                    : "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
                }
                roundedCircle
                style={{ width: "50px", height: "50px" }}
              />
            </Col>
            <Col style={{ textAlign: "left" }}>
              <p>
                <strong>{comment.User.username}</strong>
              </p>
              <div className="comment-container">
                <p>{comment.content}</p>
              </div>
              <div className="actionComment flex flex-col sm:flex-row items-center mt-2 sm:mt-0">
                <span>{formatDate(comment.createdAt)}</span>
                {comment.userId === Number(userId) ? (
                  <>
                    {" "}
                    <EditComment
                      comment={comment}
                      onUpdateComment={handleUpdateComment}
                    />
                    <span
                      className="edit-delt"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Supprimer
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <p>0 commentaire</p>
      )}
    </Container>
  );
};

export default ListCommentOfPost;
