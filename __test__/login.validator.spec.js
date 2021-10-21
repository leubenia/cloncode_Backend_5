const Validators = require('../validators/login.validator');

test.skip('loginSchema : email이 email형식이고 pw가 4자 이상이면 성공', async () => {
  await expect(
    Validators.validateAsync({ email: 'stravinest@naver.com', pw: '1234' })
  );
  await expect(
    Validators.validateAsync({ email: 's@yahoo.co.kr', pw: '1234' })
  );
});
test.skip('loginSchema : email이 email형식이 아닐경우 실패', async () => {
  await expect(
    Validators.validateAsync({ email: 'hello', pw: '1234' })
  ).rejects.toThrowError();
  await expect(
    Validators.validateAsync({ email: 'a', pw: '1234' })
  ).rejects.toThrowError();
  await expect(
    Validators.validateAsync({ email: [], pw: '1234' })
  ).rejects.toThrowError();
  await expect(
    Validators.validateAsync({ email: {}, pw: '1234' })
  ).rejects.toThrowError();
  await expect(
    Validators.validateAsync({ email: true, pw: '1234' })
  ).rejects.toThrowError();
});

test.skip('loginSchema : pw가 3자리 이하면 실패', async () => {
  await expect(
    Validators.validateAsync({ email: 'stravinest@naver.com', pw: '123' })
  ).rejects.toThrowError();
  await expect(
    Validators.validateAsync({ email: 'stravinest@naver.com', pw: 'asd' })
  ).rejects.toThrowError();
});

test.skip('loginSchema : email이 없거나 pw 가 없으면 실패', async () => {
  await expect(
    Validators.validateAsync({ email: 'stravinest@naver.com' })
  ).rejects.toThrowError();
  await expect(Validators.validateAsync({ pw: '1234' })).rejects.toThrowError();
});
