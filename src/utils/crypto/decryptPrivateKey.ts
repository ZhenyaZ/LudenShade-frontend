// decryptPrivateKey.ts
import forge from 'node-forge';
import { deriveKeyFromPassword } from './derieveKeyFromPassword';

type EncryptedPrivateKey = {
  encryptedKey: string;
  salt: string;
  iv: string;
};

export const decryptPrivateKey = ({ encryptedKey, iv, salt }: EncryptedPrivateKey, password: string): string => {
  const key = deriveKeyFromPassword(password, salt);

  const ivBuffer = forge.util.decode64(iv);
  const encryptedBuffer = forge.util.decode64(encryptedKey);

  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv: forge.util.createBuffer(ivBuffer) });
  decipher.update(forge.util.createBuffer(encryptedBuffer));

  const result = decipher.finish();
  if (!result) {
    throw new Error('Decryption failed');
  }

  return decipher.output.getBytes();
};

export const validatePrivateKey = (privateKey: string): boolean => {
  try {
    const key = forge.pki.privateKeyFromPem(privateKey);
    if (key.n && key.e) {
      return true;
    } else {
      throw new Error('Invalid private key');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
