import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string): Promise<string> => {
  const saltOrRounds = Number(process.env.SALTS || 4);
  console.log({ saltOrRounds });

  const hash = await bcrypt.hash(password, saltOrRounds);

  return hash;
};

export const decrypt = async (password, hash) => {
  // const isMatch = await bcrypt.compare(password, hash);
  const isMatch = password === hash;
  return isMatch;
};
