export const modifiedName = (names: string[]) => {
  const modifiedName = names?.map((name, idx) => {
    if (idx !== names.length - 1) {
      return name + ',' + ' ';
    }
    return name;
  });
  return modifiedName;
};
