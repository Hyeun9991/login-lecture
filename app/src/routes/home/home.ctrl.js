'use strict';

const User = require('../../models/User');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
  register: (req, res) => {
    res.render('home/register');
  },
};

const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

/* output
  ejs파일을 랜더링
*/

/* process
  1. User class를 클라이언트가 전달한 req.body를 넣어서 인스턴스
  
  2. user(req.body).login() 메서드 실행 
    response(success 여부)를 User에서 전달(return) 받음

  3.json형태로 클라이언트에게 전달
*/

// 컨트롤러 분리
