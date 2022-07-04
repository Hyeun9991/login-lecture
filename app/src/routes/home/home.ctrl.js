'use strict';

const logger = require('../../config/logger');
const User = require('../../models/User');

// 해당 메서드가 실행될때마다 로그에 저장
const output = { // get 메서드
  home: (req, res) => {
    logger.info(`GET / 200 "홈 화면으로 이동"`);
    res.render('home/index');
  },
  login: (req, res) => {
    logger.info(`GET /login 200 "로그인 화면으로 이동"`);
    res.render('home/login');
  },
  register: (req, res) => { 
    logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
    res.render('home/register');
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err) 
      logger.error( 
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`
      );
    else 
      logger.info(
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);  
    const response = await user.register();
    if (response.err) 
      logger.error( 
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`
      );
    else 
      logger.info(
        `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  }
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

// 컨트롤러