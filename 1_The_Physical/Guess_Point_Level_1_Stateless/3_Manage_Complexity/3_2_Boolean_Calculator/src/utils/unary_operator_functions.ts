import { OPERATOR } from "../enums";

type UnaryOperatorFunction = (value: boolean) => boolean;

export const unaryOperatorFunctions: Record<string, UnaryOperatorFunction> = {
  [OPERATOR.NOT]: (value) => !value,
};
