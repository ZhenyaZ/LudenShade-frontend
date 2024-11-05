import forge from 'node-forge';

export const generatePrivateKey = (): { publicKey: string; privateKey: string } => {
  const keypair = forge.pki.rsa.generateKeyPair(2048);
  return {
    publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
  };
};
