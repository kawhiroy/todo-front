//  今日の日付を取得
const nowDate = new Date();
export const nowDateTypeString =
  nowDate.getFullYear() +
  "-" +
  ("0" + (nowDate.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + nowDate.getDate()).slice(-2);
