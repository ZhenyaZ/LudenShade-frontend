import forge from 'node-forge';

export default async function encryptMessage(message: string, symKey: string) {
  const iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher('AES-CBC', symKey);
  cipher.start({ iv: forge.util.createBuffer(iv) });
  cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(message)));
  cipher.finish();
  return {
    message: forge.util.encode64(cipher.output.getBytes()),
    iv: forge.util.encode64(iv),
  };
}
