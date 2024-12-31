export const checkValidText = (
  text: string,
  type: string,
  minChar?: number,
  maxChar?: number,
  containSpace?: boolean,
  containNumbers?: boolean,
  containSymbols?: boolean
) => {
  if (text !== text.trim() || !text) {
    return `${type} should not be empty`;
  }

  if (minChar && maxChar && (text.length < minChar || text.length > maxChar)) {
    return `${type} should be between ${minChar} and ${maxChar} characters`;
  }

  if (!containSpace && /\s/.test(text)) {
    return `${type} should not contain spaces`;
  }

  if (!containNumbers && /\d/.test(text)) {
    return `${type} should not contain any numbers`;
  }

  if (!containSymbols && /[^a-zA-Z0-9\s]/.test(text)) {
    return `${type} should not contain any symbols`;
  }

  return ""
};

export const checkValidPassword = (
  password: string,
  confirmPassword?: string
) => {
  if (!password) {
    return `Password is required.`;
  }

  if (password !== password.trim()) {
    return `Password cannot contain leading or trailing spaces.`;
  }

  if (password.length < 6 || password.length > 60) {
    return `Password must be between 6 and 60 characters.`;
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return `Passwords do not match.`;
  }

  return ""
};

export const checkValidEmail = (email: string) => {
  if (!email) {
    return `Email is required.`;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return `Please enter a valid email.`;
  }

  return "";
};
