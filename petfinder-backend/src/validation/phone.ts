// Accepts a Brazilian phone number as plain digits (the format every real
// row in this app's database actually uses, e.g. "17997196185") or loosely
// formatted with an optional country code, parentheses around the area
// code, and spaces/hyphens between groups (e.g. "+55 (17) 99719-6185").
// Previously a double-escaped pattern that matched literal backslash
// characters instead of `+`/`-`/parentheses, so it barely validated
// anything - see git history for the original.
const phoneRegExp =
  /^(\+?\d{1,3}[\s-]?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/;

export default phoneRegExp;
