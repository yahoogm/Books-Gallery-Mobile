export const modifiedName = (names: string[] | undefined) => {
  if (!Array.isArray(names) || names.length === 0) {
    return '';
  }

  if (names == undefined) {
    return '';
  }

  const nonEmptyNames = names.filter(name => name.trim() !== '');

  if (nonEmptyNames.length === 0) {
    return '';
  }

  return nonEmptyNames.join(', ');
};
