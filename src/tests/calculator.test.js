const {
  calculate,
  formatUsage,
  modulo,
  normalizeOperation,
  parseNumber,
  power,
  run,
  squareRoot,
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
    expect(normalizeOperation('%')).toBe('modulo');
    expect(normalizeOperation('pow')).toBe('power');
    expect(normalizeOperation('sqrt')).toBe('squareRoot');
  });

  test('treats operation names case-insensitively', () => {
    expect(normalizeOperation('Addition')).toBe('addition');
    expect(normalizeOperation('MULTIPLY')).toBe('multiplication');
    expect(normalizeOperation('SquareRoot')).toBe('squareRoot');
  });

  test('returns undefined for unsupported or non-string operations', () => {
    expect(normalizeOperation('cube')).toBeUndefined();
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

describe('modulo', () => {
  test('returns the remainder', () => {
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(22, 5)).toBe(2);
  });

  test('throws for modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('raises a base to the exponent', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(9, 0.5)).toBe(3);
  });
});

describe('squareRoot', () => {
  test('returns the square root for non-negative numbers', () => {
    expect(squareRoot(9)).toBe(3);
    expect(squareRoot(2.25)).toBe(1.5);
  });

  test('throws for negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
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

  test('performs modulo, power, and square root operations', () => {
    expect(calculate('%', 10, 3)).toBe(1);
    expect(calculate('power', 2, 4)).toBe(16);
    expect(calculate('sqrt', 81)).toBe(9);
  });

  test('handles the extended image operation examples', () => {
    expect(calculate('%', 5, 2)).toBe(1);
    expect(calculate('^', 2, 3)).toBe(8);
    expect(calculate('sqrt', 16)).toBe(4);
  });

  test('throws on modulo by zero and negative square root', () => {
    expect(() => calculate('modulo', 8, 0)).toThrow('Modulo by zero is not allowed.');
    expect(() => calculate('squareRoot', -9)).toThrow('Square root of a negative number is not allowed.');
  });

  test('throws on unsupported operations', () => {
    expect(() => calculate('unknown', 2, 3)).toThrow(
      'Invalid operation: unknown. Supported operations are addition, subtraction, multiplication, division, modulo, power, and square root.'
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
    expect(run(['modulo', '10', '4'])).toBe('2');
    expect(run(['power', '3', '3'])).toBe('27');
    expect(run(['sqrt', '49'])).toBe('7');
  });

  test('runs the extended image CLI examples', () => {
    expect(run(['%', '5', '2'])).toBe('1');
    expect(run(['^', '2', '3'])).toBe('8');
    expect(run(['sqrt', '16'])).toBe('4');
  });

  test('throws when the argument count is invalid', () => {
    expect(() => run(['add', '10'])).toThrow(formatUsage());
    expect(() => run(['sqrt', '9', '1'])).toThrow(formatUsage());
  });

  test('throws when any CLI value is not numeric', () => {
    expect(() => run(['add', 'ten', '5'])).toThrow('Invalid numeric value: ten');
    expect(() => run(['sqrt', 'nine'])).toThrow('Invalid numeric value: nine');
  });

  test('throws when the CLI operation is unsupported', () => {
    expect(() => run(['unknown', '2', '3'])).toThrow(
      'Invalid operation: unknown. Supported operations are addition, subtraction, multiplication, division, modulo, power, and square root.'
    );
  });
});
