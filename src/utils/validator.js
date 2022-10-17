export const required = (value) => {
   if (value) return undefined;
   return "Field is required!";
}

export const maxLength = (maxLength) => (value) => {
   if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
   return undefined;
}

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
