export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 8) return 'Password must be at least 8 characters long.'
  return ''
}
export function rePasswordValidator(rePassword) {
  if (!rePassword) return "Re-Password can't be empty."
  return ''
}

export function currentPasswordValidator(currentPassword) {
  if (!currentPassword) return "Current Password can't be empty."
  return ''
}