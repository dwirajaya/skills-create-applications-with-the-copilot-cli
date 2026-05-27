#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add, addition)
 * - subtraction (-, subtract, subtraction)
 * - multiplication (*, x, multiply, multiplication)
 * - division (/, divide, division)
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

function calculate(operation, left, right) {
  const normalizedOperation = normalizeOperation(operation);

  if (!normalizedOperation) {
    throw new Error(
      `Invalid operation: ${operation}. Supported operations are addition, subtraction, multiplication, and division.`
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
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function formatUsage() {
  return [
    'Usage: node src/calculator.js <operation> <left> <right>',
    '',
    'Supported operations:',
    '  addition       (+, add, addition)',
    '  subtraction    (-, subtract, subtraction)',
    '  multiplication (*, x, multiply, multiplication)',
    '  division       (/, divide, division)',
  ].join('\n');
}

function run(argv = process.argv.slice(2)) {
  if (argv.length !== 3) {
    throw new Error(formatUsage());
  }

  const [operation, leftValue, rightValue] = argv;
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
  normalizeOperation,
  parseNumber,
  run,
};
