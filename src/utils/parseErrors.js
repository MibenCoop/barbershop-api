import _ from "lodash";

export default function(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
  // console.log('errors In parseErrors.js', result);
  return result;
}
