import crypto from "crypto";
import config from "../config/config";

const encryptStringWithRsaPublicKey = function (toEncrypt: string) {
  const rawPublicKey = config.RSA_PUBLIC_KEY;
  const publicKey = Buffer.from(rawPublicKey, "base64").toString("ascii"); //Base64 to public key
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = function (toDecrypt: string) {
  const rawPrivateKey = config.RSA_PRIVATE_KEY;
  const privateKey = Buffer.from(rawPrivateKey, "base64").toString("ascii"); //Base64 to private key
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return decrypted.toString("utf8");
};

export default {
  encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey,
};
