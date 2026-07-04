// NOTE: this pattern is inherited verbatim from the original Yup-based
// validation (previously duplicated in UsersController and PetsController).
// It is double-escaped inside a regex literal, so `\\+`/`\\-` match literal
// backslash characters instead of `+`/`-`/parentheses - it barely validates
// anything. Kept as-is here so the Yup->Zod port is a pure mechanical move;
// fixed in a separate, isolated commit right after this one.
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default phoneRegExp;
