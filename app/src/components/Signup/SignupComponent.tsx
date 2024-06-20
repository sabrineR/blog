import React, { ChangeEvent, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import uploadFileToS3 from "../../services/upload.file.service";
import { register } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
type FieldType = {
  username: string;
  email: string;
  password: string;
  imagePath: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SignupComponent: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<string | null> => {
    if (selectedFile) {
      const uploadParams = {
        bucketName: "blog-app-react",
        dirName: "images",
        s3Url: "https://blog-app-react.s3.eu-west-3.amazonaws.com",
        file: selectedFile,
      };

      try {
        const uploadedUrl = await uploadFileToS3(uploadParams);
        if (uploadedUrl) {
          return uploadedUrl;
        } else {
          console.error("Erreur lors de l'upload vers S3.");
          return null;
        }
      } catch (error) {
        console.error("Erreur lors de l'upload vers S3 :", error);
        return null;
      }
    }
    return null;
  };

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      let uploadedUrl = null;
      if (selectedFile) {
        uploadedUrl = await handleUpload();
      }
      const data = await register({
        userName: values.username,
        email: values.email,
        password: values.password,
        imagePath: uploadedUrl || "",
        role: false,
      });
      // Réinitialiser les états et les champs du formulaire
      setSelectedFile(null);
      form.resetFields();
      setLoading(false);
      if (data) navigate("/login");
    } catch (error: any) {
      console.error("Login failed:", error?.message);
      setError(error?.message);
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="max-w-xl mx-auto border border-gray-300 p-4 rounded-lg"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h4 className="text-center text-lg mb-4">Inscription</h4>
        <Form.Item
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
        <Form.Item
          label="Nom complet:"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          className="mb-4"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mot de passe:"
          name="password"
          rules={[
            {
              required: true,
              message: "Veuillez saisir votre mot de passe!",
            },
          ]}
          className="mb-4"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Photo de profil"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          className="mb-4"
        >
          <input type="file" onChange={handleFileInput} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Valider"
            )}
          </Button>
        </Form.Item>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        <div className="text-center mt-4">
          Vous avez déjà un compte ? <Link to="/login">Connexion</Link>
        </div>
      </Form>
    </>
  );
};

export default SignupComponent;
