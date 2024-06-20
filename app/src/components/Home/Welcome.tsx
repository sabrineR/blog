import React from "react";
import { Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";

export const Welcome: React.FC = () => {
  return (
    <Card hoverable className="p-4">
      <div className="md:flex md:justify-between">
        <div className="md:w-1/2 md:p-8">
          <Typography.Title level={3} className="mb-4">
            “Bienvenue sur notre blog ! Prenez un moment pour parcourir nos
            articles et n'hésitez pas à laisser vos commentaires et partagez vos
            pensées.”
          </Typography.Title>
          <Link to="/login">
            <Button type="primary">Commencer</Button>
          </Link>
        </div>
        <div className="md:w-1/4">
          <img
            alt="avatar"
            src="https://static.vecteezy.com/system/resources/previews/000/518/208/original/man-working-with-computer-bright-colorful-vector-illustration.jpg"
            className="w-full h-auto"
          />
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
