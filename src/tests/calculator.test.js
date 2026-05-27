const {
  calculate,
  formatUsage,
  normalizeOperation,
  parseNumber,
  run,
} = require('../calculator');

describe('normalizeOperation', () => {
  test('maps all supported aliases to canonical operations', () => {
    expect(normalizeOperation('+')).toBe('addition');
    expect(normalizeOperation('add')).toBe('addition');
    expect(normalizeOperation('-')).toBe('subtraction');
    expect(normalizeOperation('subtract')).toBe('subtraction');
    expect(normalizeOperation('*')).toBe('multiplication');
    expect(normalizeOperation('x')).toBe('multiplication');
    expect(normalizeOperation('/')).toBe('division');
    expect(normalizeOperation('divide')).toBe('division');
  });

  test('treats operation names case-insensitively', () => {
    expect(normalizeOperation('Addition')).toBe('addition');
    expect(normalizeOperation('MULTIPLY')).toBe('multiplication');
  });

  test('returns undefined for unsupported or non-string operations', () => {
    expect(normalizeOperation('power')).toBeUndefined();
    expect(normalizeOperation()).toBeUndefined();
    expect(normalizeOperation(123)).toBeUndefined();
  });
});

describe('parseNumber', () => {
  test('parses integers, decimals, and signed values', () => {
    expect(parseNumber('7')).toBe(7);
    expect(parseNumber('2.5')).toBe(2.5);
    expect(parseNumber('-3')).toBe(-3);
  });

  test('throws for invalid numeric input', () => {
    expect(() => parseNumber('hello')).toThrow('Invalid numeric value: hello');
  });
});

describe('calculate', () => {
  test('adds numbers', () => {
    expect(calculate('addition', 5, 4)).toBe(9);
    expect(calculate('+', -2, 3)).toBe(1);
  });

  test('subtracts numbers', () => {
    expect(calculate('-', 9, 4)).toBe(5);
    expect(calculate('subtraction', 4, 9)).toBe(-5);
  });

  test('multiplies numbers', () => {
    expect(calculate('multiply', 3, 7)).toBe(21);
    expect(calculate('*', -2, 6)).toBe(-12);
  });

  test('divides numbers', () => {
    expect(calculate('/', 8, 2)).toBe(4);
    expect(calculate('division', 7.5, 2.5)).toBe(3);
  });

  test('throws on division by zero', () => {
    expect(() => calculate('division', 8, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws on unsupported operations', () => {
    expect(() => calculate('power', 2, 3)).toThrow(
      'Invalid operation: power. Supported operations are addition, subtraction, multiplication, and division.'
    );
  });
});

describe('run', () => {
  test('handles the image example operations', () => {
    expect(run(['+', '2', '3'])).toBe('5');
    expect(run(['-', '10', '4'])).toBe('6');
    expect(run(['*', '45', '2'])).toBe('90');
    expect(run(['/', '20', '5'])).toBe('4');
  });

  test('returns string results for valid commands', () => {
    expect(run(['add', '10', '5'])).toBe('15');
    expect(run(['divide', '9', '4.5'])).toBe('2');
  });

  test('throws when the argument count is invalid', () => {
    expect(() => run(['add', '10'])).toThrow(formatUsage());
  });

  test('throws when any CLI value is not numeric', () => {
    expect(() => run(['add', 'ten', '5'])).toThrow('Invalid numeric value: ten');
  });

  test('throws when the CLI operation is unsupported', () => {
    expect(() => run(['power', '2', '3'])).toThrow(
      'Invalid operation: power. Supported operations are addition, subtraction, multiplication, and division.'
    );
  });
});
