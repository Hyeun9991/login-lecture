'use strict';

class UserStorage {
  static #users = {
    id: ['test01', '테스트공이', 'test03'],
    psword: ['1234', '5678', '12345678'],
    name: ['르네상스', '루브르', '케이지'],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field]; // 키 = 값
      }
      return newUsers; // return되는 newUsers가 다음 파라미터로 들어감
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;

