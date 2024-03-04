import CryptoJS from "crypto-js";

const keyApp = import.meta.env.VITE_APP_ENCRYPTION_KEY;

export function encryptData(data) {
  const encrypt = CryptoJS.AES.encrypt(data, keyApp).toString();

  return encrypt;
}

export function decryptData(data) {
  if (data) {
    const decrypt = CryptoJS.AES.decrypt(data, keyApp).toString(
      CryptoJS.enc.Utf8
    );

    return decrypt;
  }
}
