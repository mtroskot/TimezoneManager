import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import RegisterForm from 'src/screens/Auth/RegisterForm';

describe('RegisterForm wrapper', () => {
  it('renders correctly, form empty, isEdit false', () => {
    const props = {
      submitButtonText: 'Register',
      headerText: 'Register Account',
      registerForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        matchingPassword: ''
      },
      errors: {},
      handleInput: jest.fn(),
      handleRegister: jest.fn(),
      isLoading: false,
      isEdit: false
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(5);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.registerForm.firstName);
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
    ).toEqual('First Name');
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
    ).toEqual(props.registerForm.lastName);
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
    ).toEqual('Last Name');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('next');
    //3rd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('value')
    ).toEqual(props.registerForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('returnKeyType')
    ).toEqual('next');
    //4th text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('value')
    ).toEqual(props.registerForm.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('floatingLabel')
    ).toEqual('Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('returnKeyType')
    ).toEqual('next');
    //5th text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('value')
    ).toEqual(props.registerForm.matchingPassword);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('floatingLabel')
    ).toEqual('Matching Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
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
  it('renders correctly, form empty, isEdit true', () => {
    const props = {
      submitButtonText: 'Register',
      headerText: 'Register Account',
      registerForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        matchingPassword: ''
      },
      errors: {},
      handleInput: jest.fn(),
      handleRegister: jest.fn(),
      isLoading: false,
      isEdit: true
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(3);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.registerForm.firstName);
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
    ).toEqual('First Name');
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
    ).toEqual(props.registerForm.lastName);
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
    ).toEqual('Last Name');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('next');
    //3rd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('value')
    ).toEqual(props.registerForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('error')
    ).toEqual(undefined);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
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

  it('renders correctly, form filled, isEdit false', () => {
    const props = {
      submitButtonText: 'Register',
      headerText: 'Register Account',
      registerForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        matchingPassword: ''
      },
      errors: {
        firstName: { display: true, errorMessage: 'errorMessage' },
        lastName: { display: true, errorMessage: 'errorMessage' },
        emailAddress: { display: true, errorMessage: 'errorMessage' },
        password: { display: true, errorMessage: 'errorMessage' },
        matchingPassword: { display: true, errorMessage: 'errorMessage' }
      },
      handleInput: jest.fn(),
      handleRegister: jest.fn(),
      isLoading: true,
      isEdit: false
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(5);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.registerForm.firstName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('error')
    ).toEqual(props.errors.firstName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('floatingLabel')
    ).toEqual('First Name');
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
    ).toEqual(props.registerForm.lastName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('error')
    ).toEqual(props.errors.lastName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('floatingLabel')
    ).toEqual('Last Name');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('next');
    //3rd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('value')
    ).toEqual(props.registerForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('error')
    ).toEqual(props.errors.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('returnKeyType')
    ).toEqual('next');
    //4th text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('value')
    ).toEqual(props.registerForm.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('error')
    ).toEqual(props.errors.password);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('floatingLabel')
    ).toEqual('Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(3)
        .prop('returnKeyType')
    ).toEqual('next');
    //5th text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('value')
    ).toEqual(props.registerForm.matchingPassword);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('error')
    ).toEqual(props.errors.matchingPassword);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
        .prop('floatingLabel')
    ).toEqual('Matching Password');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(4)
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

  it('renders correctly, form filled, isEdit true', () => {
    const props = {
      submitButtonText: 'Register',
      headerText: 'Register Account',
      registerForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        matchingPassword: ''
      },
      errors: {
        firstName: { display: true, errorMessage: 'errorMessage' },
        lastName: { display: true, errorMessage: 'errorMessage' },
        emailAddress: { display: true, errorMessage: 'errorMessage' },
        password: { display: true, errorMessage: 'errorMessage' },
        matchingPassword: { display: true, errorMessage: 'errorMessage' }
      },
      handleInput: jest.fn(),
      handleRegister: jest.fn(),
      isLoading: false,
      isEdit: true
    };

    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.headerText);
    expect(wrapper.find('Memo(FloatingLabelTextInput)')).toHaveLength(3);
    //first text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('value')
    ).toEqual(props.registerForm.firstName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('error')
    ).toEqual(props.errors.firstName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(0)
        .prop('floatingLabel')
    ).toEqual('First Name');
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
    ).toEqual(props.registerForm.lastName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('error')
    ).toEqual(props.errors.lastName);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('floatingLabel')
    ).toEqual('Last Name');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(1)
        .prop('returnKeyType')
    ).toEqual('next');
    //3rd text input
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('value')
    ).toEqual(props.registerForm.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('error')
    ).toEqual(props.errors.emailAddress);
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
        .prop('floatingLabel')
    ).toEqual('Email Address');
    expect(
      wrapper
        .find('Memo(FloatingLabelTextInput)')
        .at(2)
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
    submitButtonText: 'Register',
    headerText: 'Register Account',
    registerForm: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      matchingPassword: ''
    },
    errors: {
      firstName: { display: true, errorMessage: 'errorMessage' },
      lastName: { display: true, errorMessage: 'errorMessage' },
      emailAddress: { display: true, errorMessage: 'errorMessage' },
      password: { display: true, errorMessage: 'errorMessage' },
      matchingPassword: { display: true, errorMessage: 'errorMessage' }
    },
    handleInput: jest.fn(),
    handleRegister: jest.fn(),
    isLoading: false,
    isEdit: false
  };

  const wrapper = shallow(<RegisterForm {...props} />);

  it('calling handleRegister,handleInput, should trigger callbacks', () => {
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
      .at(2)
      .prop('onChangeText')();
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(3)
      .prop('onChangeText')();
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(4)
      .prop('onChangeText')();
    wrapper
      .find('Memo(FloatingLabelTextInput)')
      .at(4)
      .prop('onSubmitEditing')();
    wrapper
      .find('Memo(CustomButton)')
      .at(0)
      .prop('onPress')();
    expect(props.handleInput).toHaveBeenCalledTimes(5);
    expect(props.handleRegister).toHaveBeenCalledTimes(2);
  });
});
