import { S3 } from "aws-sdk";
export interface UploadParams {
  bucketName: string;
  dirName: string;
  s3Url: string;
  file: File;
}
const uploadFileToS3 = async ({
  bucketName,
  dirName,
  s3Url,
  file,
}: UploadParams): Promise<string | null> => {
  const s3Client = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });

  const params = {
    Bucket: bucketName,
    Key: `${dirName}/${file.name}`,
    Body: file,
    ACL: "public-read",
  };

  try {
    await s3Client.upload(params).promise();
    return `${s3Url}/${dirName}/${file.name}`; // Retourne l'URL complète du fichier chargé
  } catch (error) {
    console.error("Erreur lors de l'upload vers S3 :", error);
    return null;
  }
};

export default uploadFileToS3;
