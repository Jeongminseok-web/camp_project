const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { postAreas } = require("../controller/postAreas");
const { postTasks } = require("../controller/postTasks");
const { v4: uuidv4 } = require("uuid");

// 이미지 이름을 'image1.png', 'image2.png' 등으로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // uploads 폴더에 저장
  },
  filename: (req, file, cb) => {
    // 파일 이름을 정리하는 함수
    const ext = path.extname(file.originalname); // 파일 확장자
    const userName = req.body.userName || "default";
    const index = (req.fileIndex || 0) + 1; // 순서를 매기기 위해 인덱스 사용
    req.fileIndex = index; // 인덱스 업데이트
    const uniqueId = uuidv4();
    const newFileName = `${userName}_image${uniqueId}${ext}`; // 'image1.png', 'image2.png' 형식으로 이름 지정
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// upload.array("images", 5),
router.post("/post_areas", postAreas);
router.post("/post_tasks", upload.array("images", 5), postTasks);

module.exports = router;
