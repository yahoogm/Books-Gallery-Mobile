import {modifiedName} from './const';

describe('modified name function', () => {
  it('should add a comma and space after each name except the last one', () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    const result = modifiedName(names);
    expect(result).toEqual(['Alice, ', 'Bob, ', 'Charlie']);
  });

  it('should handle an single name', () => {
    const names = ['Alice'];
    const result = modifiedName(names);
    expect(result).toEqual(['Alice']);
  });

  it('should handle an array with multiple empty strings', () => {
    const names = ['', '', ''];
    const result = modifiedName(names);
    expect(result).toEqual([', ', ', ', '']);
  });

  it('should handle array with one empty string', () => {
    const names = [''];
    const result = modifiedName(names);
    expect(result).toEqual(['']);
  });

  it('should handle an undefined parameter', () => {
    const names = undefined;
    const result = modifiedName(names);
    expect(result).toEqual(['']);
  });
});
