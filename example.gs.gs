//ここは各自変更してください。
const SPREAD_SHEET_ID = '1l9SRpbiQpulTrUGLjLU-d7Zl0TD7BDBsh6I2snlDu1k';
const SHEET_NAME = 'シート1';

//GETリクエスト時に呼び出される関数
function doGet(e) {
  //スプレッドシートをIDで取得
  const app = SpreadsheetApp.openById(SPREAD_SHEET_ID);
  //シートをシート名で取得
  const sheet = app.getSheetByName(SHEET_NAME);
  //シートの入力内容を全て配列で取得
  const values = sheet.getDataRange().getValues();
  const data = [];

  //シートの入力内容をオブジェクトに詰め替え
  for(let i=0; i<values.length; i++){
    //ヘッダー部(1行目)はスキップ
    if(i === 0)continue;
    const param = {};
    for(let j=0; j<values[i].length; j++){
      param[values[0][j]] = values[i][j];
    }
    data.push(param);
  }
  //返却情報を生成
  const result = ContentService.createTextOutput();

    //Mime TypeをJSONに設定
    result.setMimeType(ContentService.MimeType.JSON);

    //JSONテキストをセットする
    result.setContent(JSON.stringify(data));

    return result;
}
