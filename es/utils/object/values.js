export default (function (object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
});