const router = require("express").Router(); // api path를 전달해 주는 메서드
const { getAreas } = require("../controller/getAreas");
const { getTasks } = require("../controller/getTasks");

router.get("/get_areas/:googleId", getAreas); // 컨트롤러 함수 연결 - :은 정해지지 않은 문자열 표시
router.get("/get_tasks/:created_at", getTasks);

module.exports = router; // router 모듈 내보내기
