export const bcryptPasswordCompare = async (
  password: string,
  hashedpassword: string
) => {
  const { default: bcrypt } = await import("bcryptjs");
  return bcrypt.compare(password, hashedpassword);
};

export const bcryptPasswordhashed = async (password: string) => {
  const { default: bcrypt } = await import("bcryptjs");
  const bcryptSaltRound = Number.parseInt("10", 10);
  return bcrypt.hash(password, bcryptSaltRound);
};
