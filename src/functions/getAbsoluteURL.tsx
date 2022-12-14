import { IncomingMessage } from 'http'

const getAbsoluteURL = (req?: IncomingMessage) => {
  // 로컬은 http, 프로덕션은 https 라는 가정
  const protocol = req ? 'https:' : 'http:'
  let host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host

  // 주소에 local이라는 문자열이 들어가 있다면,
  // 또는 별도의 환경변수를 주입하고 있다면 그것을 사용해도된다.
  // process.env.RECT_APP_PROFILES === 'local'
  if ((host || '').toString().indexOf('local') > -1) {
    // 개발자 머신에서 실행했을 때 로컬
    host = 'localhost:3000'
  }

  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
  }
}

export default getAbsoluteURL;