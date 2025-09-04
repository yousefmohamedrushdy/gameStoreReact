export const validateSignIn = (formData) => {
  const errors = {};

  if (!formData.email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Invalid email address.";

  if (!formData.password) errors.password = "Password is required.";

  return errors;
};
