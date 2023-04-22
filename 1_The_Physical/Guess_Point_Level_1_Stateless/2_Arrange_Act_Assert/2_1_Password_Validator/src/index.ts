export interface IPasswordValidatorResult {
  result: boolean;
  errors?: string[];
}

export type PasswordValidatorHandler = (
  password: string,
  errors: string[]
) => string[];

function lengthValidator(password: string, errors: string[]): string[] {
  if (password.length < 5) {
    return [...errors, "Password length must be at least 5 characters"];
  } else if (password.length > 15) {
    return [...errors, "Password length must be at most 15 characters"];
  }
  return errors;
}

function digitValidator(password: string, errors: string[]): string[] {
  if (!/[0-9]/.test(password)) {
    return [...errors, "Password must contain a digit"];
  }
  return errors;
}

function caseValidator(password: string, errors: string[]): string[] {
  const newErrors: string[] = [];
  if (!/[A-Z]/.test(password)) {
    newErrors.push("Password must contain an uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    newErrors.push("Password must contain a lowercase letter");
  }
  return [...errors, ...newErrors];
}

export function pipe(
  validators: PasswordValidatorHandler[]
): (password: string, errors: string[]) => string[] {
  return (password: string, errors: string[]) => {
    return validators.reduce(
      (accErrors, validator) => validator(password, accErrors),
      errors
    );
  };
}

export function passwordValidator(
  password: string,
  validators: PasswordValidatorHandler[] = [
    lengthValidator,
    digitValidator,
    caseValidator,
  ]
): IPasswordValidatorResult {
  let errors: string[] = [];
  for (const validator of validators) {
    errors = validator(password, errors);
  }

  return {
    result: errors.length === 0,
    errors,
  };
}
