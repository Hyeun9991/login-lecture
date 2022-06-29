'use strict';

const UserStorage = require('./UserStorage');

class User {
  constructor(body) { 
    this.body = body;
  } 

  async login() {
    const client = this.body;
    const { id, psword } = await UserStorage.getUserInfo(client.id);

    if (id) {
      if (id === client.id && psword === client.psword) {
        return { success: true };
      }
      return { success: false, msg: '비밀번호가 틀렸습니다.'};
    }
    return { success: false, msg: '존재하지 않는 아이디입니다.'};
  }

  register() {
    const client = this.body;
    const response = UserStorage.save(client); // 데이터 저장
    return response;
  }
}

module.exports = User;

/*
  constructor(body): 컨트롤러에서 인스턴스를 생성하면서 넘겨준 req.body
  body.id: 클라이언트가 입력한 id값
  { id, psword }: UserStorage에서 id,psword값 받아오기
*/ 

/* 로그인 인증 로직
  1. 클라이언트가 입력한 아이디가 UserStorage에 있으면
  (1)id,psword가 같으면 => succuess: true
  (2)id는 같은데 psword가 틀리면 => succuess: false, msg

  2. 없으면
    succuess: false, msg
*/

// 로그인 인증