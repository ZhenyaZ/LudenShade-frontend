import forge from 'node-forge';
import { deriveKeyFromPassword } from './derieveKeyFromPassword';

export const encryptPrivateKey = (
  privateKey: string,
  password: string,
): { encryptedKey: string; iv: string; salt: string } => {
  const salt = forge.random.getBytesSync(16);
  const key = deriveKeyFromPassword(password, forge.util.encode64(salt));

  const iv = forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv: forge.util.createBuffer(iv) });
  cipher.update(forge.util.createBuffer(privateKey));
  cipher.finish();

  return {
    encryptedKey: forge.util.encode64(cipher.output.getBytes()),
    iv: forge.util.encode64(iv),
    salt: forge.util.encode64(salt),
  };
};
