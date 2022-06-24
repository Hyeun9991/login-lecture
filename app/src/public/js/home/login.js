'use strict';

const id = document.querySelector('#id'),
  password = document.querySelector('#password'),
  loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', login);

function login() {
  const req = {
    id: id.value,
    password: password.value,
  };

  fetch('/login', {
    method: "POST",
    headers: { // 전달 데이터가 json형태라는 걸 알려주기
      "Content-Type": "application/json" // 데이터 타입 명시
    },
    body: JSON.stringify(req), // 문자열로
  });
}

