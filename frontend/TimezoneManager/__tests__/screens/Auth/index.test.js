import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import AuthScreen from 'src/screens/Auth';
import { screenNames } from 'src/constants/navigation';
import { userActionTypes } from 'src/constants/actionTypes';
import { authenticateUser, registerUser, updateUserInfo } from 'src/store/user/userActions';

describe('AuthScreen wrapper', () => {
  it('AuthScreen renders correctly, Login form shown, isLoading=false ', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      ui: { loader: { actions: [], refreshing: [] } }
    });
    const navigation = { state: { routeName: screenNames.AUTH }, getParam: () => ({}) };

    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    expect(wrapper.find('SafeAreaView')).toHaveLength(1);
    expect(wrapper.find('Memo(KeyboardAvoidAndDismissView)')).toHaveLength(1);
    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(0);
    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(1);

    expect(wrapper.find('Memo(LoginForm)').prop('loginForm')).toEqual({ emailAddress: '', password: '' });
    expect(wrapper.find('Memo(LoginForm)').prop('errors')).toEqual({});
    expect(wrapper.find('Memo(LoginForm)').prop('isLoading')).toEqual(false);

    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual("Don't have an account?");
    expect(wrapper.find('Memo(CustomButton)').prop('text')).toEqual('Create Account');
    expect(wrapper).toMatchSnapshot();
  });

  it('AuthScreen renders correctly, Login form shown, isLoading=true ', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      ui: {
        loader: {
          actions: [{ name: userActionTypes.AUTH_USER }],
          refreshing: []
        }
      }
    });
    const navigation = { state: { routeName: screenNames.AUTH }, getParam: () => ({}) };

    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    expect(wrapper.find('SafeAreaView')).toHaveLength(1);
    expect(wrapper.find('Memo(KeyboardAvoidAndDismissView)')).toHaveLength(1);
    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(1);

    expect(wrapper.find('Memo(LoginForm)').prop('loginForm')).toEqual({ emailAddress: '', password: '' });
    expect(wrapper.find('Memo(LoginForm)').prop('errors')).toEqual({});
    expect(wrapper.find('Memo(LoginForm)').prop('isLoading')).toEqual(true);

    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(0);
    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(0);
    expect(wrapper.find('Text')).toHaveLength(0);
  });

  it('AuthScreen renders correctly, Register form shown, isEdit=true ', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      ui: {
        loader: { actions: [], refreshing: [] }
      }
    });
    const navigation = {
      state: { routeName: screenNames.AUTH_EDIT },
      getParam: () => ({ id: 1, firstName: 'Marko', lastName: 'Troskot', emailAddress: 'marko@hotmail.com' })
    };

    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    expect(wrapper.find('SafeAreaView')).toHaveLength(1);
    expect(wrapper.find('Memo(KeyboardAvoidAndDismissView)')).toHaveLength(1);
    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(0);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)').prop('registerForm')).toEqual({
      id: 1,
      firstName: 'Marko',
      lastName: 'Troskot',
      emailAddress: 'marko@hotmail.com',
      password: '',
      matchingPassword: ''
    });
    expect(wrapper.find('Memo(RegisterForm)').prop('headerText')).toEqual('Update user account');
    expect(wrapper.find('Memo(RegisterForm)').prop('submitButtonText')).toEqual('Update Account');
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({});
    expect(wrapper.find('Memo(RegisterForm)').prop('isEdit')).toEqual(true);
    expect(wrapper.find('Memo(RegisterForm)').prop('isLoading')).toEqual(false);

    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(0);
    expect(wrapper.find('Text')).toHaveLength(0);
  });

  it('AuthScreen renders correctly, Register form shown, isEdit=true, isLoading=true ', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      ui: {
        loader: { actions: [{ name: userActionTypes.REGISTER_USER }], refreshing: [] }
      }
    });
    const navigation = {
      state: { routeName: screenNames.AUTH_EDIT },
      getParam: () => ({ id: 1, firstName: 'Marko', lastName: 'Troskot', emailAddress: 'marko@hotmail.com' })
    };

    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    expect(wrapper.find('SafeAreaView')).toHaveLength(1);
    expect(wrapper.find('Memo(KeyboardAvoidAndDismissView)')).toHaveLength(1);
    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(0);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)').prop('registerForm')).toEqual({
      id: 1,
      firstName: 'Marko',
      lastName: 'Troskot',
      emailAddress: 'marko@hotmail.com',
      password: '',
      matchingPassword: ''
    });
    expect(wrapper.find('Memo(RegisterForm)').prop('headerText')).toEqual('Update user account');
    expect(wrapper.find('Memo(RegisterForm)').prop('submitButtonText')).toEqual('Update Account');
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({});
    expect(wrapper.find('Memo(RegisterForm)').prop('isEdit')).toEqual(true);
    expect(wrapper.find('Memo(RegisterForm)').prop('isLoading')).toEqual(true);

    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(0);
    expect(wrapper.find('Text')).toHaveLength(0);
  });
});

describe('interaction', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    ui: {
      loader: { actions: [], refreshing: [] }
    },
    authenticateUser: jest.fn(),
    registerUser: jest.fn(),
    updateUserInfo: jest.fn()
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('calling handleInput should update searchInput state, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    wrapper.find('Memo(LoginForm)').prop('handleInput')('abc', 'emailAddress');
    expect(wrapper.find('Memo(LoginForm)').prop('loginForm')).toEqual({ emailAddress: 'abc', password: '' });

    wrapper.find('Memo(LoginForm)').prop('handleInput')('abc', 'password');
    expect(wrapper.find('Memo(LoginForm)').prop('loginForm')).toEqual({ emailAddress: 'abc', password: 'abc' });

    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(0);
  });

  it('click create account should open register form and clicking again should return loginForm, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();
    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(0);

    wrapper.find('Memo(CustomButton)').prop('onPress')();

    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(0);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(1);

    wrapper.find('Memo(CustomButton)').prop('onPress')();

    expect(wrapper.find('Memo(LoginForm)')).toHaveLength(1);
    expect(wrapper.find('Memo(RegisterForm)')).toHaveLength(0);
  });

  it('clicking login should fail, validation not passed, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(LoginForm)').prop('handleLogin')();
    expect(wrapper.find('Memo(LoginForm)').prop('errors')).toEqual({
      emailAddress: { display: true, errorMessage: 'Email Address is invalid' },
      password: { display: true, errorMessage: 'Password is invalid' }
    });

    expect(store.getActions()).toEqual([]);
  });

  it('clicking register should fail, validation not passed, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(CustomButton)').prop('onPress')();
    wrapper.find('Memo(RegisterForm)').prop('handleRegister')();
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({
      firstName: { display: true, errorMessage: 'First Name is invalid' },
      lastName: { display: true, errorMessage: 'Last Name is invalid' },
      emailAddress: { display: true, errorMessage: 'Email Address is invalid' },
      password: { display: true, errorMessage: 'Password is invalid' },
      matchingPassword: { display: true, errorMessage: 'Matching Password is invalid' }
    });

    expect(store.getActions()).toEqual([]);
  });

  it('clicking login should dispatch authenticate action, validation passed, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(LoginForm)').prop('handleInput')('marko@hotmail.com', 'emailAddress');
    wrapper.find('Memo(LoginForm)').prop('handleInput')('123456', 'password');
    wrapper.find('Memo(LoginForm)').prop('handleLogin')();
    expect(wrapper.find('Memo(LoginForm)').prop('errors')).toEqual({});

    expect(store.getActions()).toEqual([authenticateUser('marko@hotmail.com', '123456')]);
  });

  it('clicking register should dispatch registerUser action, validation passed, isEdit=false', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH },
      getParam: () => ({})
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(CustomButton)').prop('onPress')();
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('Marko', 'firstName');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('Troskot', 'lastName');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('marko@hotmail.com', 'emailAddress');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('123456', 'password');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('123456', 'matchingPassword');
    wrapper.find('Memo(RegisterForm)').prop('handleRegister')();
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({});

    expect(store.getActions()).toEqual([
      registerUser({
        id: null,
        firstName: 'Marko',
        lastName: 'Troskot',
        emailAddress: 'marko@hotmail.com',
        password: '123456',
        matchingPassword: '123456'
      })
    ]);
  });

  it('clicking update userInfo should fail, validation not passed, isEdit=true', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH_EDIT },
      getParam: () => ({ id: 1, firstName: 'Marko', lastName: 'Troskot', emailAddress: 'marko@hotmail.com' })
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(RegisterForm)').prop('handleInput')('', 'firstName');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('', 'lastName');
    wrapper.find('Memo(RegisterForm)').prop('handleInput')('', 'emailAddress');
    wrapper.find('Memo(RegisterForm)').prop('handleRegister')();
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({
      firstName: { display: true, errorMessage: 'First Name is invalid' },
      lastName: { display: true, errorMessage: 'Last Name is invalid' },
      emailAddress: { display: true, errorMessage: 'Email Address is invalid' }
    });

    expect(store.getActions()).toEqual([]);
  });

  it('clicking update userInfo should dispatch changeUserInfo action, validation  passed, isEdit=true', () => {
    const navigation = {
      state: { routeName: screenNames.AUTH_EDIT },
      getParam: () => ({ id: 1, firstName: 'Marko', lastName: 'Troskot', emailAddress: 'marko@hotmail.com' })
    };
    const wrapper = shallow(<AuthScreen store={store} navigation={navigation} />)
      .dive()
      .dive();

    wrapper.find('Memo(RegisterForm)').prop('handleRegister')();
    expect(wrapper.find('Memo(RegisterForm)').prop('errors')).toEqual({});

    expect(store.getActions()).toEqual([
      updateUserInfo({
        id: 1,
        firstName: 'Marko',
        lastName: 'Troskot',
        emailAddress: 'marko@hotmail.com'
      })
    ]);
  });
});
