const BOOLEAN_VALUE = {
  TRUE: "TRUE",
  FALSE: "FALSE",
};

const OPERATOR = {
  NOT: "NOT",
  AND: "AND",
};

export const parseBooleanValue = (value: string): boolean => {
  switch (value.toUpperCase()) {
    case BOOLEAN_VALUE.TRUE:
      return true;
    case BOOLEAN_VALUE.FALSE:
      return false;
    default:
      throw new Error("Invalid boolean value");
  }
};

type UnaryOperatorFunction = (value: boolean) => boolean;
type BinaryOperatorFunction = (left: boolean, right: boolean) => boolean;

export const unaryOperatorFunctions: Record<string, UnaryOperatorFunction> = {
  [OPERATOR.NOT]: (value) => !value,
};

export const binaryOperatorFunctions: Record<string, BinaryOperatorFunction> = {
  [OPERATOR.AND]: (left, right) => left && right,
};
