function main() {
    // コピー時に投稿するURL
    const POSTURL = `https://timetreeapis.com/calendars/${CALENDARID.family}/events`;
    // 自分のカレンダーを検索して、予定のリストを作成する
    let eventData = getEvents(CALENDARID.myself);
    // 家族のカレンダーを検索して、すでにある予定の名前のリストを作成する
    let data = getEvents(CALENDARID.family);
    // 自分の予定だけを抜き出す
    let eventNameData = [];
    for (i = 0; i < data.length; i++) {
        if (data[i].relationships.label.data.id == labelOfMe.id) {
            eventNameData.push(data[i].attributes.title)
        }
    };
    Logger.log(eventNameData)

    // 予定をコピーする
    for (j = 0; j < eventData.length; j++) {
        let label = eventData[j].relationships.label.data.id;
        let title = eventData[j].attributes.title;
        // 委員会用ラベル・どうでもいいラベルがついている予定をはじく
        // すでに家族用のカレンダーにある予定をはじく
        if (label != labelOfCommittee && label != labelOfdoudemo && !eventNameData.includes(title)) {
            // 投稿するデータを整形
            let postData = {
                "data": {
                  "attributes": {
                      "category": "schedule",
                      "title": title,
                      "all_day": eventData[j].attributes.all_day,
                      "start_at": eventData[j].attributes.start_at,
                      "start_timezone": eventData[j].attributes.start_timezone,
                      "end_at": eventData[j].attributes.end_at,
                      "end_timezone": eventData[j].attributes.end_timezone,
                      "description": eventData[j].attributes.description,
                      "location": eventData[j].attributes.location,
                      "url": eventData[j].attributes.url
                  },
                  "relationships": {
                      "label": {
                          "data": labelOfMe
                      },
                      "attendees":{
                          "data": [{
                              "id": "",
                              "type": "user"
                          }]
                      }
                  }
                }
            };
            Logger.log(postData)
            // TimeTreeに投稿
            throwToTimeTree("POST", POSTURL, JSON.stringify(postData));
        }
    }
}