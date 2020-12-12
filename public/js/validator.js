exports.lengthValid = function (input, min, max) {
  console.log(`input: ${input}`);
  console.log(`min: ${min}`);
  console.log(`max: ${max}`);
  console.log(`min len: ${input.length >= min}`);
  console.log(`max len: ${input.length <= max}`);
  console.log(`condition: ${input.length >= min && input.length <= max}`);
    return input ? input.length >= min && input.length <= max: false;
};

exports.alphabetOnly = function (input) {
  return /^[A-Za-z0-9]+$/.test(input);
};

exports.numbersOnly = function (input) {
  return /^[0-9]+$/.test(input);
};

exports.isEmail = function (input) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
};