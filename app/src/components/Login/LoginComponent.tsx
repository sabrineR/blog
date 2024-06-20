import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { login } from "../../services/auth.service";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const data = await login({
        email: values.email,
        password: values.password,
      });
      if (data) window.location.href = "/accueil";
    } catch (error: any) {
      console.error("Login failed:", error?.message);
      setError(
        error?.message || "Une erreur s'est produite lors de la connexion."
      );
    }
  };

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Connexion</h2>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez saisir votre adresse e-mail!",
            },
          ]}
        >
          <Input aria-label="Email" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mot de passe"
          name="password"
          rules={[
            { required: true, message: "Veuillez saisir votre mot de passe!" },
          ]}
        >
          <Input.Password aria-label="Mot de passe" />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Se souvenir de moi</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
        {error && (
          <div className="error-message" aria-live="polite">
            {error}
          </div>
        )}
        <div className="signup-link">
          Vous n'avez pas de compte ? <Link to="/signup">Inscription</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginComponent;
