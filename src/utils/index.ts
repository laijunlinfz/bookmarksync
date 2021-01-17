export const isEmail = (email: string): boolean => {
  const emailrule = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  return emailrule.test(email);
};
