import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BackToHomeButton = () => {
  return (
    <div className="text-right">
      <Link to="/accueil">
        <Button variant="link">Retour à l'accueil</Button>
      </Link>
    </div>
  );
};

export default BackToHomeButton;
