const fs = require('fs');
const appRoot = require('app-root-path');

const accessLogStream = fs.createWriteStream( // 로그
  `${appRoot}/log/access.log`, // 스트림 최종 도착지에 저장 | access.log
  { flags: 'a' }
);

module.exports = accessLogStream;