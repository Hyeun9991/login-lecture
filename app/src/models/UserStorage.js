'use strict';

const fs = require('fs').promises;
class UserStorage {
  static #getUserInfo(data, id) {
    // 가독성 좋게 분리
    const users = JSON.parse(data); // 다룰 수 있는 데이터로 바꿔주기
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        // users에 field(키)값이 있다면
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {}); // 초기값 (= newUsers)

    return newUsers;
  }

  // 넘겨받은 인자의 데이터만 가져오는 메소드
  static getUsers(isAll, ...fields) {
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        // data: 버퍼 데이터
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  // 넘겨받은 'id의 키의 index'에 해당하는 요소들을 {} 넣어서 반환하는 메소드
  static getUserInfo(id) {
    return fs
      .readFile('./src/databases/users.json')
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);

    if (users.id.includes(userInfo.id)) { // 입력한 아이디가 db에 존재한다면
      throw '이미 존재하는 아이디입니다.';
    }

    // users db에 입력한값들 저장
    users.id.push(userInfo.id); 
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);

    // users obj를 json 문자열 타입으로 바꿔줌
    fs.writeFile('./src/databases/users.json', JSON.stringify(users));
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
