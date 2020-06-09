import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { Loader } from 'src/components';

describe('Loader wrapper', () => {
  it('Loader renders correctly without text', () => {
    const props = {
      size: 'small',
      color: 'black'
    };
    const wrapper = shallow(<Loader {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('ActivityIndicator')).toHaveLength(1);
    expect(wrapper.find('ActivityIndicator').prop('size')).toEqual('small');
    expect(wrapper.find('ActivityIndicator').prop('color')).toEqual('black');
    expect(wrapper.find('Text')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('Loader renders correctly with text', () => {
    const props = { text: 'text' };
    const wrapper = shallow(<Loader {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('ActivityIndicator')).toHaveLength(1);
    expect(wrapper.find('ActivityIndicator').prop('size')).toEqual('large');
    expect(wrapper.find('ActivityIndicator').prop('color')).toEqual('#1e5ad4');
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('Text').props().children).toEqual(props.text);
    expect(wrapper).toMatchSnapshot();
  });
});
