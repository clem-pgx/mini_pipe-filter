module.exports = async function(str) {
  console.log(str[0].split(' ').reverse().join(' '));
  return str[0].split('').reverse().join('');
};