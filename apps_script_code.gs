/**
 * Google Apps Script 코드
 * 사용 위치:
 * 1. Google Sheets 생성
 * 2. 확장 프로그램 → Apps Script
 * 3. 아래 코드 붙여넣기
 * 4. SHEET_NAME 확인
 * 5. 배포 → 새 배포 → 웹 앱
 * 6. 실행 권한: 본인
 * 7. 액세스 권한: 모든 사용자
 * 8. 생성된 웹 앱 URL을 script.js의 GOOGLE_SCRIPT_URL에 붙여넣기
 */

const SHEET_NAME = "results";

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = JSON.parse(e.postData.contents);

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

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
