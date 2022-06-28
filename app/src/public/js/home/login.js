'use strict';

const id = document.querySelector('#id'),
  psword = document.querySelector('#psword'),
  loginBtn = document.querySelector('#button');

loginBtn.addEventListener('click', login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      // 전달 데이터 타입 알려주기
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req), // json파일을 문자열 바꿔서 전달 (데이터 크기 절약)
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error('로그인 중 에러 발생');
    });
}

// 프론트 js - 로그인