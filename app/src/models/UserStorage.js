'use strict';

const fs = require('fs').promises;
class UserStorage {

  static #getUserInfo(data,id) { // 가독성 좋게 분리
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    
    return userInfo;
  }

  // 넘겨받은 인자의 데이터만 가져오는 메소드
  static getUsers(...fields) {
    // const users = this.#users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        // users에 field(키)값이 있다면
        newUsers[field] = users[field]; // 키(id) = 값(['test01', '테스트공이', 'test03'])
      }
      return newUsers;
    }, {}); // 초기값 (= newUsers)

    return newUsers;
  }

  // 넘겨받은 'id의 키의 index'에 해당하는 요소들을 {} 넣어서 반환하는 메소드
  static getUserInfo(id) {
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        return this.#getUserInfo(data,id);
      })
      .catch(console.error);
  }

  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    return { success: true };
  }
}

module.exports = UserStorage;

/* getUsers
  은닉화된 #users 반환하는 메서드

  인자로 넘겨받은 데이터만 새로운 obj를 만들어서 전달하기
*/

/* getUserInfo
  idx: User에서 넘긴 id(클라이언트가 입력한)의 index

  usersKeys: users의 키값으로 리스트 만들기
    [id, psword, name]

  userInfo
    newUser(빈 객체)[key]에 users[key][index]값 넣기
    return newUser
    { id: 'test01', psword: '1234', name: '르네상스' }
*/

/* save
  클라이언트에서 데이터를 전달하면 users obj안에 해당 데이터들이 저장되야함
  => 새로 작성된 회원가입 데이터들이 서버를 껏다 키면 사라짐 (저장이 안됨)
*/
