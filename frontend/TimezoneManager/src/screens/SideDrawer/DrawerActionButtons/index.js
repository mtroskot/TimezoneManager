import React from 'react';
import { View } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import PropTypes from 'prop-types';
import { icons } from 'src/constants/icons';
import styles from 'src/screens/SideDrawer/DrawerActionButtons/styles';

const DrawerActionButtons = ({ handleLogout, closeDrawer }) => {
  return (
    <View>
      <CustomButton
        viewStyle={styles.drawerItem}
        iconStyle={styles.drawerItemIcon}
        iconProps={{ name: icons.CLOSE, color: '#aaa' }}
        text={'Close'}
        onPress={closeDrawer}
      />
      <CustomButton
        viewStyle={styles.drawerItem}
        iconStyle={styles.drawerItemIcon}
        iconProps={{ name: icons.LOGOUT, color: '#aaa' }}
        onPress={handleLogout}
        text={'Logout'}
      />
    </View>
  );
};

DrawerActionButtons.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default React.memo(DrawerActionButtons);
