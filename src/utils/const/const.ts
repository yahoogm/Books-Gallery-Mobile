export const modifiedName = (names: string[] | undefined) => {
  if (!Array.isArray(names)) {
    return [''];
  }

  if (names == undefined) {
    return [''];
  }

  const DescribeNames = names?.map((name, idx) => {
    if (idx !== names.length - 1) {
      return name + ',' + ' ';
    }
    return name;
  });
  return DescribeNames;
};
