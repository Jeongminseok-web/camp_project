const express = require("express"); // express 모듈 가져오기
const cors = require("cors"); // cors 모듈 가져오기
const PORT = 8000;

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당한다.

// const corsOptions = {
//   origin: 'http://localhost:3000', // 허용할 주소
//   credentials: true, // 인증 정보 허용
// };

// const corsOption2 = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors()); //htpp, https 프로토콜을 사용하는 서버 간의 통신을 허용한다.
app.use(express.json()); // express 모듈의 json() 메소드를 사용한다.

app.get("/", (req, res) => {
  res.send("Hello Wolrd");
});

app.use(require("./routes/getRoutes"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
