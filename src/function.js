// TimeTreeと通信するための関数（fetchを使う）
function throwToTimeTree(method, POSTURL, payload){
  let headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + TOKEN,
    accept: "application/vnd.timetree.v1+json"
  };
  // なんか小文字じゃないとだめだった
  // しかも""をつけるとダメ…
  let options = {
    "method": method,
    "headers": headers,
    "payload": payload
  };
  let res = UrlFetchApp.fetch(POSTURL, options);
  return JSON.parse(res)
}

// カレンダーのIDを取得する関数
function getCalendarId() {
  const POSTURL = "https://timetreeapis.com/calendars";
  let res = throwToTimeTree("GET", POSTURL, {}, {});
  Logger.log(res)
};

// カレンダー内のイベントを取得する関数
function getEvents(calendarId){
  const POSTURL = `https://timetreeapis.com/calendars/${calendarId}/upcoming_events?days=7`;
  let res = throwToTimeTree("GET", POSTURL, {});
  return res.data
}

// カレンダーのラベルの一覧を取得する関数
function getLabels(calendarId){
  var calendarId = CALENDARID.myself;
  const POSTURL = `https://timetreeapis.com/calendars/${calendarId}/labels`;
  let res = throwToTimeTree("GET", POSTURL, {});
  Logger.log(res.data)
  return res.data
}

// 自分のIDとかを確認する用の関数
function getUser(){
  let POSTURL = "https://timetreeapis.com/user";
  let res = throwToTimeTree("GET", POSTURL, {})
  Logger.log(res.data)
}