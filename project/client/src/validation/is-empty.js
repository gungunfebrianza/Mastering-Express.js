const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;

// const isEmpty = value => {
//   return (
//     value === undefined ||
//     value === null ||
//     (typeof value === "object" && Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)
//   ); //trim Remove whitespace from both sides of a string:
// };

// function isEmpty(value) {
//   return (
//     value === undefined ||
//     value === null ||
//     (typeof value === "object" && Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)
//   ); //trim Remove whitespace from both sides of a string:
// }
