'use strict';

const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
};

const users = {
  id: ['test01', '테스트공이', 'test03'],
  psword: ['1234', '5678', '12345678'],
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    // 프론트에서 전달받은 id가 users에 있는 id가 맞다면
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id); 

      // 프론트에서 전달받은 psword가 users안에 idx 위치에 있는 psword와 맞다면
      if (users.psword[idx] === psword) { 
        return res.json({ // 프론트엔드로 응답
          success: true,
        });
      }
    }

    return res.json({
      success: false,
      msg: '로그인에 실패했습니다.',
    });
  },
};

module.exports = {
  output,
  process,
};

// 컨트롤러 분리
