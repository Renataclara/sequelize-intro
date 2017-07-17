//
// function  translate(value) {
//   value.forEach(  data_subjectstudent => {
//   if (data_subjectstudent.Score > 85) {return 'A';}
//   if (data_subjectstudent.Score > 70 && data_subjectstudent.Score <= 85) {return 'B';}
//   if (data_subjectstudent.Score > 55 && data_subjectstudent.Score <= 70) {return 'C';}
//   if (data_subjectstudent.Score <= 55 && data_subjectstudent.Score > 0) {return 'E';}
//   if (data_subjectstudent.Score == null) {return 'empty';}
//   })
// }
//
// module.exports = translate;
// //
module.exports = function (value) {
  let letter = [];
  value.forEach(  data_subjectstudent => {
  if (data_subjectstudent.Score > 85) {letter.push('A');}
  if (data_subjectstudent.Score > 70 && data_subjectstudent.Score <= 85) {letter.push('B');}
  if (data_subjectstudent.Score > 55 && data_subjectstudent.Score <= 70) {letter.push('C');}
  if (data_subjectstudent.Score <= 55 && data_subjectstudent.Score > 0) {letter.push('E');}
  if (data_subjectstudent.Score == null) {letter.push('empty');}
  })
  return letter;
}
