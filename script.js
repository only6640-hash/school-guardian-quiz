const SHEET_NAME = "results";

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.school) {
      saveData_(e.parameter);
      return ContentService
        .createTextOutput("GET 저장 성공")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    return ContentService
      .createTextOutput("웹앱 연결 OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput("GET 오류: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  try {
    let data = {};

    // FormData 방식으로 들어온 경우
    if (e && e.parameter) {
      data = e.parameter;
    }

    // JSON 방식으로 들어온 경우도 혹시 몰라 지원
    if (e && e.postData && e.postData.contents) {
      try {
        const jsonData = JSON.parse(e.postData.contents);
        data = Object.keys(jsonData).length ? jsonData : data;
      } catch (err) {
        // FormData면 JSON 파싱이 안 되는 것이 정상입니다.
      }
    }

    saveData_(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveData_(data) {
  const sheet = getOrCreateSheet_();

  sheet.appendRow([
    new Date(),
    data.school || "",
    data.grade || "",
    data.classNo || "",
    data.studentNo || "",
    data.studentName || "",
    data.score || 0,
    data.total || 10,
    data.certified || "",
    data.totalWrongCount || 0,
    data.answers || ""
  ]);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "제출시간",
      "학교",
      "학년",
      "반",
      "번호",
      "이름",
      "점수",
      "전체문항",
      "인증여부",
      "다시생각한횟수",
      "문항별응답"
    ]);
  }

  return sheet;
}

function testDoPost() {
  const fakeEvent = {
    parameter: {
      school: "테스트초",
      grade: "5",
      classNo: "1",
      studentNo: "1",
      studentName: "테스트",
      score: "10",
      total: "10",
      certified: "인증",
      totalWrongCount: "0",
      answers: "테스트 저장"
    }
  };

  doPost(fakeEvent);
}
