import forge from 'node-forge';

export const decryptMessage = ({ message, iv }: { message: string; iv: string }, symKey: string) => {
  const decipher = forge.cipher.createDecipher('AES-CBC', symKey);
  decipher.start({ iv: forge.util.decode64(iv) });
  decipher.update(forge.util.createBuffer(forge.util.decode64(message)));
  const res = decipher.finish();

  const messageText = forge.util.decodeUtf8(decipher.output.getBytes());
  if (!res) {
    throw new Error('Decryption failed');
  }
  return messageText;
};
