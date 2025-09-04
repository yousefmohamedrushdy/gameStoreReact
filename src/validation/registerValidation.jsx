export const validateRegister = (formData) => {
  const errors = {};

  if (!formData.firstname || formData.firstname.length < 2)
    errors.firstname = "Firstname must be at least 2 characters.";

  if (!formData.lastname || formData.lastname.length < 2)
    errors.lastname = "Lastname must be at least 2 characters.";

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Invalid email address.";

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!formData.password || !passwordRegex.test(formData.password))
    errors.password =
      "Password must be at least 6 characters and include a letter, number, and special character.";

  if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
};
