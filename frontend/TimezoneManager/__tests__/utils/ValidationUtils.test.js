import { ValidationUtils } from 'src/utils';

describe('ValidationUtils isValidName tests', () => {
  it('all inputs should be valid', () => {
    const result1 = ValidationUtils.isValidName('Marko');
    expect(result1).toEqual({
      isValid: true,
      message: null
    });

    const result2 = ValidationUtils.isValidName('MT');
    expect(result2).toEqual({
      isValid: true,
      message: null
    });

    const result3 = ValidationUtils.isValidName('Marko T');
    expect(result3).toEqual({
      isValid: true,
      message: null
    });

    const result4 = ValidationUtils.isValidName('Luka Marko');
    expect(result4).toEqual({
      isValid: true,
      message: null
    });

    const result5 = ValidationUtils.isValidName('ivan');
    expect(result5).toEqual({
      isValid: true,
      message: null
    });

    const result6 = ValidationUtils.isValidName('IVAN');
    expect(result6).toEqual({
      isValid: true,
      message: null
    });
  });

  it('all inputs should be invalid', () => {
    const result1 = ValidationUtils.isValidName('Marko Troskot Marko Troskot');
    expect(result1).toEqual({
      isValid: false,
      message: null
    });

    const result2 = ValidationUtils.isValidName('M');
    expect(result2).toEqual({
      isValid: false,
      message: null
    });

    const result3 = ValidationUtils.isValidName('Marko T1');
    expect(result3).toEqual({
      isValid: false,
      message: null
    });

    const result4 = ValidationUtils.isValidName('Luka. Marko');
    expect(result4).toEqual({
      isValid: false,
      message: null
    });

    const result5 = ValidationUtils.isValidName('ivan,');
    expect(result5).toEqual({
      isValid: false,
      message: null
    });

    const result6 = ValidationUtils.isValidName('3IVAN');
    expect(result6).toEqual({
      isValid: false,
      message: null
    });

    const result7 = ValidationUtils.isValidName('');
    expect(result7).toEqual({
      isValid: false,
      message: null
    });

    const result8 = ValidationUtils.isValidName(undefined);
    expect(result8).toEqual({
      isValid: false,
      message: null
    });

    const result9 = ValidationUtils.isValidName(null);
    expect(result9).toEqual({
      isValid: false,
      message: null
    });
  });
});

describe('ValidationUtils isValidEmail tests', () => {
  it('all inputs should be valid', () => {
    const result1 = ValidationUtils.isValidEmail('Marko@hotmail.com');
    expect(result1).toEqual({
      isValid: true,
      message: null
    });

    const result2 = ValidationUtils.isValidEmail('marko.troskot@gmail.com');
    expect(result2).toEqual({
      isValid: true,
      message: null
    });

    const result3 = ValidationUtils.isValidEmail('luka123@live.com');
    expect(result3).toEqual({
      isValid: true,
      message: null
    });

    const result4 = ValidationUtils.isValidEmail('IVAN@rccl.com');
    expect(result4).toEqual({
      isValid: true,
      message: null
    });

    const result5 = ValidationUtils.isValidEmail('a@a.com');
    expect(result5).toEqual({
      isValid: true,
      message: null
    });

    const result6 = ValidationUtils.isValidEmail('b.a.a@rccl.com');
    expect(result6).toEqual({
      isValid: true,
      message: null
    });
  });

  it('all inputs should be invalid', () => {
    const result1 = ValidationUtils.isValidEmail('@hotmail.com');
    expect(result1).toEqual({
      isValid: false,
      message: null
    });

    const result2 = ValidationUtils.isValidEmail('@com');
    expect(result2).toEqual({
      isValid: false,
      message: null
    });

    const result3 = ValidationUtils.isValidEmail('marko@@a.com');
    expect(result3).toEqual({
      isValid: false,
      message: null
    });

    const result4 = ValidationUtils.isValidEmail('marko@hotma l.com');
    expect(result4).toEqual({
      isValid: false,
      message: null
    });

    const result5 = ValidationUtils.isValidEmail('mark o@hotmal.com');
    expect(result5).toEqual({
      isValid: false,
      message: null
    });

    const result6 = ValidationUtils.isValidEmail('');
    expect(result6).toEqual({
      isValid: false,
      message: null
    });

    const result7 = ValidationUtils.isValidEmail(undefined);
    expect(result7).toEqual({
      isValid: false,
      message: null
    });

    const result8 = ValidationUtils.isValidEmail(null);
    expect(result8).toEqual({
      isValid: false,
      message: null
    });
  });
});

describe('ValidationUtils isValidPassword tests', () => {
  it('all inputs should be valid', () => {
    const result1 = ValidationUtils.isValidPassword('123456');
    expect(result1).toEqual({
      isValid: true,
      message: null
    });

    const result2 = ValidationUtils.isValidPassword('marko123');
    expect(result2).toEqual({
      isValid: true,
      message: null
    });

    const result3 = ValidationUtils.isValidPassword('Marko!"34');
    expect(result3).toEqual({
      isValid: true,
      message: null
    });

    const result4 = ValidationUtils.isValidPassword('IVAN@rccl.com');
    expect(result4).toEqual({
      isValid: true,
      message: null
    });

    const result5 = ValidationUtils.isValidPassword('a@a.com');
    expect(result5).toEqual({
      isValid: true,
      message: null
    });

    const result6 = ValidationUtils.isValidPassword('b.a.a@rccl.com');
    expect(result6).toEqual({
      isValid: true,
      message: null
    });
  });

  it('all inputs should be invalid', () => {
    const result1 = ValidationUtils.isValidPassword('12');
    expect(result1).toEqual({
      isValid: false,
      message: null
    });

    const result2 = ValidationUtils.isValidPassword('12345');
    expect(result2).toEqual({
      isValid: false,
      message: null
    });

    const result3 = ValidationUtils.isValidPassword('123456789009876543212');
    expect(result3).toEqual({
      isValid: false,
      message: null
    });

    const result4 = ValidationUtils.isValidPassword('abc');
    expect(result4).toEqual({
      isValid: false,
      message: null
    });

    const result5 = ValidationUtils.isValidPassword('');
    expect(result5).toEqual({
      isValid: false,
      message: null
    });

    const result6 = ValidationUtils.isValidPassword(' ');
    expect(result6).toEqual({
      isValid: false,
      message: null
    });

    const result7 = ValidationUtils.isValidPassword('');
    expect(result7).toEqual({
      isValid: false,
      message: null
    });

    const result8 = ValidationUtils.isValidPassword(undefined);
    expect(result8).toEqual({
      isValid: false,
      message: null
    });

    const result9 = ValidationUtils.isValidPassword(null);
    expect(result9).toEqual({
      isValid: false,
      message: null
    });
  });
});

describe('ValidationUtils isValidMatchingPassword tests', () => {
  it('all inputs should be valid', () => {
    const result1 = ValidationUtils.isValidMatchingPassword('123456', '123456');
    expect(result1).toEqual({
      isValid: true,
      message: null
    });

    const result2 = ValidationUtils.isValidMatchingPassword('marko123', 'marko123');
    expect(result2).toEqual({
      isValid: true,
      message: null
    });

    const result3 = ValidationUtils.isValidMatchingPassword('Marko!"34', 'Marko!"34');
    expect(result3).toEqual({
      isValid: true,
      message: null
    });

    const result4 = ValidationUtils.isValidMatchingPassword('IVAN@rccl.com', 'IVAN@rccl.com');
    expect(result4).toEqual({
      isValid: true,
      message: null
    });

    const result5 = ValidationUtils.isValidMatchingPassword('a@a.com', 'a@a.com');
    expect(result5).toEqual({
      isValid: true,
      message: null
    });

    const result6 = ValidationUtils.isValidMatchingPassword('b.a.a@rccl.com', 'b.a.a@rccl.com');
    expect(result6).toEqual({
      isValid: true,
      message: null
    });
  });

  it('all inputs should be invalid', () => {
    const result1 = ValidationUtils.isValidMatchingPassword('12', '12');
    expect(result1).toEqual({
      isValid: false,
      message: null
    });

    const result2 = ValidationUtils.isValidMatchingPassword('123456abc', '12345');
    expect(result2).toEqual({
      isValid: false,
      message: null
    });

    const result3 = ValidationUtils.isValidMatchingPassword('abc123', '123456789009876543212');
    expect(result3).toEqual({
      isValid: false,
      message: null
    });

    const result4 = ValidationUtils.isValidMatchingPassword('abc123', '');
    expect(result4).toEqual({
      isValid: false,
      message: null
    });

    const result5 = ValidationUtils.isValidMatchingPassword('abc123', undefined);
    expect(result5).toEqual({
      isValid: false,
      message: null
    });

    const result6 = ValidationUtils.isValidMatchingPassword('abc123', null);
    expect(result6).toEqual({
      isValid: false,
      message: null
    });

    const result7 = ValidationUtils.isValidMatchingPassword('', 'abc123');
    expect(result7).toEqual({
      isValid: false,
      message: "Passwords don't match"
    });

    const result8 = ValidationUtils.isValidMatchingPassword('abc123', 'abc1243');
    expect(result8).toEqual({
      isValid: false,
      message: "Passwords don't match"
    });

    const result9 = ValidationUtils.isValidMatchingPassword('abc1234', 'abc123');
    expect(result9).toEqual({
      isValid: false,
      message: "Passwords don't match"
    });
  });
});
