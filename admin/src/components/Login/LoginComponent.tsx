import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../services/auth.service";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const LoginComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { token, isAdmin } = await login({
        email: values.email,
        password: values.password,
      });
      if (token && isAdmin) {
        window.location.href = "/news";
      } else {
        setError("Unauthorized");
      }
    } catch (error: any) {
      console.error("Login failed:", error?.message);
      setError(error?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Primaa Blog</h2>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h4 className="text-2xl font-bold mb-4 text-center">Connexion</h4>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez saisir votre adresse e-mail!",
            },
          ]}
          className="mb-4"
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mot de passe"
          name="password"
          rules={[
            { required: true, message: "Veuillez saisir votre mot de passe!" },
          ]}
          className="mb-4"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          className="flex items-center justify-center mb-4"
        >
          <Checkbox>Se souvenir de moi</Checkbox>
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </Form>
    </div>
  );
};

export default LoginComponent;
