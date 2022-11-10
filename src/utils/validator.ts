export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
   if (value) return undefined;
   return "Field is required!";
}

export const maxLength = (maxLength: number): ValidatorType => (value) => {
   if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
   return undefined;
}

export const email: ValidatorType = (value) =>
   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
