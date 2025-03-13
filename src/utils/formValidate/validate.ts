export const emailPattern = {
  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  message: 'Некорректный e-mail',
};

export const minLength = (length: number, message: string) => ({
  value: length,
  message,
});

export const maxLength = (length: number, message: string) => ({
  value: length,
  message,
});