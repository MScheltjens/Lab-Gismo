export const generateInitials = (name: string) => {
  // if name has multiple words
  if (name.includes(' ')) {
    name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  }
  // if name is one word
  return name[0].toUpperCase();
};
