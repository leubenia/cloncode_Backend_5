const authMiddleware = require('../middlewares/authmiddleware');
const { users } = require('../models');
jest.mock('../models');

test.skip('정상적인 토큰을 넣은 경우 users.findOne가 실행된다.', () => {
  users.findOne = jest.fn();

  authMiddleware(
    {
      headers: {
        'X-AUTH-TOKEN':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmF2aW5lc3RAbmF2ZXIuY29tIiwiaWF0IjoxNjM0Nzk2NTI2LCJleHAiOjE2MzQ4MDM3MjZ9.iJNhgr2MIUR1l8xvpYSuHyVk2A9-s7F9crXIsFx06N8',
      },
    },
    {
      status: () => ({
        send: () => {},
      }),
      locals: {},
    }
  );

  expect(users.findOne).toHaveBeenCalledTimes(1);
});

test.skip('변조된 토큰으로 요청한 경우 로그인 후 사용하세요 라는 에러 메세지가 뜬다.', () => {
  const mockedSend = jest.fn();

  authMiddleware(
    {
      headers: {
        'X-AUTH-TOKEN': 'Bearer ',
      },
    },
    {
      status: () => ({
        send: mockedSend,
      }),
      locals: {},
    }
  );

  expect(mockedSend).toHaveBeenCalledWith({
    errorMessage: '로그인 후 사용하세요.',
  });
});
