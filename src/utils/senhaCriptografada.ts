import bcrypt from 'bcryptjs';
// import crypto from 'crypto';

export const criaSenhaCriptografada = async (senha: string) => {
  const senhaHash = await bcrypt.hash(senha, 8);
  return senhaHash;

  //   const salt = crypto.randomBytes(16).toString('hex');
  //   const hash = crypto.createHmac('sha256', salt);
  //   hash.update(senha);

  //   return hash.digest('hex');
};
