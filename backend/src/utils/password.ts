import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hashSync(password, saltRounds);
};

export const compareHashPassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(password, hashedPassword);
};
