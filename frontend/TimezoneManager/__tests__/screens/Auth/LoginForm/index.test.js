import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import LoginForm from 'src/screens/Auth/LoginForm';

describe('LoginForm wrapper', () => {
  it('renders correctly, form empty', () => {
    const props = {
      loginForm: {
        emailAddress: '',
        password: ''
      },
      errors: {},
      handleInput: jest.fn(),
      handleLogin: jest.fn(),
      isLoading: false,
      headerText: 'Welcome Back',
      submitButtonText: 'Login'
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(2);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.loginForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('returnKeyType')
    ).toEqual('next');
    //2nd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('value')
    ).toEqual(props.loginForm.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('floatingLabel')
    ).toEqual('Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('go');
    // button
    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(1);
    expect(
      wrapper
        .find('Memo(CustomButton)')
        .at(0)
        .prop('isLoading')
    ).toEqual(props.isLoading);
    expect(
      wrapper
        .find('Memo(CustomButton)')
        .at(0)
        .prop('text')
    ).toEqual(props.submitButtonText);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly, form filled', () => {
    const props = {
      loginForm: {
        emailAddress: 'emailAddress',
        password: 'password'
      },
      errors: {
        emailAddress: { display: true, errorMessage: 'errorMessage' },
        password: { display: true, errorMessage: 'errorMessage' }
      },
      handleInput: jest.fn(),
      handleLogin: jest.fn(),
      isLoading: true,
      headerText: 'Welcome Back',
      submitButtonText: 'Login'
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(2);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.loginForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('error')
    ).toEqual(props.errors.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('returnKeyType')
    ).toEqual('next');
    //2nd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('value')
    ).toEqual(props.loginForm.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('error')
    ).toEqual(props.errors.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('floatingLabel')
    ).toEqual('Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('go');
    // button
    expect(wrapper.find('Memo(CustomButton)')).toHaveLength(1);
    expect(
      wrapper
        .find('Memo(CustomButton)')
        .at(0)
        .prop('isLoading')
    ).toEqual(props.isLoading);
    expect(
      wrapper
        .find('Memo(CustomButton)')
        .at(0)
        .prop('text')
    ).toEqual(props.submitButtonText);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  const props = {
    loginForm: {
      emailAddress: 'emailAddress',
      password: 'password'
    },
    errors: {
      emailAddress: { display: true, errorMessage: 'errorMessage' },
      password: { display: true, errorMessage: 'errorMessage' }
    },
    handleInput: jest.fn(),
    handleLogin: jest.fn(),
    isLoading: false
  };

  const wrapper = shallow(<LoginForm {...props} />);
  it('calling handleLogin,handleInput, should trigger callbacks', () => {
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(0)
      .prop('onChangeText')();
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(1)
      .prop('onChangeText')();
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(1)
      .prop('onSubmitEditing')();
    wrapper
      .find('Memo(CustomButton)')
      .at(0)
      .prop('onPress')();
    expect(props.handleInput).toHaveBeenCalledTimes(2);
    expect(props.handleLogin).toHaveBeenCalledTimes(2);
  });
});
