#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add, addition)
 * - subtraction (-, subtract, subtraction)
 * - multiplication (*, x, multiply, multiplication)
 * - division (/, divide, division)
 * - modulo (%, mod, modulo)
 * - power (^, pow, power, exponentiation)
 * - square root (sqrt, squareRoot, square-root)
 */

const OPERATION_ALIASES = new Map([
  ['+', 'addition'],
  ['add', 'addition'],
  ['addition', 'addition'],
  ['-', 'subtraction'],
  ['subtract', 'subtraction'],
  ['subtraction', 'subtraction'],
  ['*', 'multiplication'],
  ['x', 'multiplication'],
  ['multiply', 'multiplication'],
  ['multiplication', 'multiplication'],
  ['/', 'division'],
  ['divide', 'division'],
  ['division', 'division'],
  ['%', 'modulo'],
  ['mod', 'modulo'],
  ['modulo', 'modulo'],
  ['^', 'power'],
  ['pow', 'power'],
  ['power', 'power'],
  ['exponentiation', 'power'],
  ['sqrt', 'squareRoot'],
  ['squareroot', 'squareRoot'],
  ['square-root', 'squareRoot'],
  ['squareRoot', 'squareRoot'],
]);

function normalizeOperation(operation) {
  if (typeof operation !== 'string') {
    return undefined;
  }

  return OPERATION_ALIASES.get(operation.toLowerCase());
}

function parseNumber(value) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  return parsedValue;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
}

function calculate(operation, left, right) {
  const normalizedOperation = normalizeOperation(operation);

  if (!normalizedOperation) {
    throw new Error(
      `Invalid operation: ${operation}. Supported operations are addition, subtraction, multiplication, division, modulo, power, and square root.`
    );
  }

  switch (normalizedOperation) {
    case 'addition':
      return left + right;
    case 'subtraction':
      return left - right;
    case 'multiplication':
      return left * right;
    case 'division':
      if (right === 0) {
        throw new Error('Division by zero is not allowed.');
      }

      return left / right;
    case 'modulo':
      return modulo(left, right);
    case 'power':
      return power(left, right);
    case 'squareRoot':
      return squareRoot(left);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function formatUsage() {
  return [
    'Usage:',
    '  node src/calculator.js <operation> <left> <right>',
    '  node src/calculator.js <operation> <value>',
    '',
    'Supported operations:',
    '  addition       (+, add, addition)',
    '  subtraction    (-, subtract, subtraction)',
    '  multiplication (*, x, multiply, multiplication)',
    '  division       (/, divide, division)',
    '  modulo         (%, mod, modulo)',
    '  power          (^, pow, power, exponentiation)',
    '  square root    (sqrt, squareRoot, square-root)',
  ].join('\n');
}

function run(argv = process.argv.slice(2)) {
  if (argv.length < 2 || argv.length > 3) {
    throw new Error(formatUsage());
  }

  const [operation, leftValue, rightValue] = argv;
  const normalizedOperation = normalizeOperation(operation);

  if (!normalizedOperation) {
    throw new Error(
      `Invalid operation: ${operation}. Supported operations are addition, subtraction, multiplication, division, modulo, power, and square root.`
    );
  }

  if (normalizedOperation === 'squareRoot') {
    if (argv.length !== 2) {
      throw new Error(formatUsage());
    }

    const value = parseNumber(leftValue);

    return String(calculate(operation, value));
  }

  if (argv.length !== 3) {
    throw new Error(formatUsage());
  }

  const left = parseNumber(leftValue);
  const right = parseNumber(rightValue);
  const result = calculate(operation, left, right);

  return String(result);
}

if (require.main === module) {
  try {
    console.log(run());
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  calculate,
  formatUsage,
  modulo,
  normalizeOperation,
  parseNumber,
  power,
  run,
  squareRoot,
};
