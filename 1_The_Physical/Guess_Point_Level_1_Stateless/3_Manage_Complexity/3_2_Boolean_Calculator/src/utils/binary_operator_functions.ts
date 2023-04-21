import { OPERATOR } from "../enums";

type BinaryOperatorFunction = (left: boolean, right: boolean) => boolean;

export const binaryOperatorFunctions: Record<string, BinaryOperatorFunction> = {
  [OPERATOR.AND]: (left, right) => left && right,
  [OPERATOR.OR]: (left, right) => left || right,
};
