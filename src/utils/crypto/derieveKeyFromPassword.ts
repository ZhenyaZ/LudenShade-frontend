import forge from 'node-forge';

export const deriveKeyFromPassword = (password: string, salt: string): forge.util.ByteStringBuffer => {
  const saltBytes = forge.util.decode64(salt);
  const key = forge.pkcs5.pbkdf2(password, saltBytes, 10000, 32);
  return forge.util.createBuffer(key);
};
