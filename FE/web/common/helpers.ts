import CryptoJS from 'crypto-js';

const SECRET = process.env.NEXT_PUBLIC_LS_ENCRYPTION_KEY as string;

export const encryptToLocalStorage = (key: string, value: string) => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET).toString();
  localStorage.setItem(key, encryptedValue);
};

export const decryptFromLocalStorage = (key: string) => {
  const encryptedValue = localStorage.getItem(key);

  if (!encryptedValue) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting data', error);
    return null;
  }
};
