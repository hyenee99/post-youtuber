//express 모듈 셋팅
const express = require('express')
const app = express() 
app.listen(1234)

// 데이터 셋팅
let youtubers = [
  {
    channelTitle: "리쥬라이크",
    sub: "81.8만명",
    videoNum: "373개"
  },
  {
    channelTitle: "침착맨",
    sub: "227만명",
    videoNum: "6600개"
  },
  {
    channelTitle: "토모토모",
    sub: "106만명",
    videoNum: "266개"
  }
];

let db=new Map()
var id = 1
for(let i=0;i<youtubers.length;i++){
  db.set(id, youtubers[i])
  id++
}

// REST API 설계
app.get('/youtubers', function(req, res){
  const youtubers = Array.from(db.values()); // Map의 값을 배열로 변환
  res.json(youtubers);
})

app.get('/youtuber/:id', function (req, res) {
  let {id} = req.params
  id=parseInt(id)

  const youtuber = db.get(id)
  if(youtuber==undefined) {
    res.json({
      message: "유튜버 정보를 찾을 수 없습니다."
    })
  }
  else
    res.json(youtuber)
})

app.use(express.json()) //http 외 모듈인 '미들웨어':json 설정
app.post('/youtuber', (req, res) => {
  // 등록하기
  db.set(id++,req.body)
  res.json({
    message:`${db.get(id-1).channelTitle} 님을 즐겨찾기에 추가했습니다! `
  })
})