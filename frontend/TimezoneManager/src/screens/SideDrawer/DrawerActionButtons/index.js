import React from 'react';
import { View } from 'react-native';
import { CustomButton } from 'src/components';
import PropTypes from 'prop-types';
import { icons } from 'src/constants/icons';
import styles from 'src/screens/SideDrawer/DrawerActionButtons/styles';

const DrawerActionButtons = ({ handleLogout, closeDrawer, isSigningOut }) => {
  return (
    <View>
      <CustomButton
        viewStyle={styles.drawerItem}
        iconStyle={styles.drawerItemIcon}
        iconProps={{ name: icons.CLOSE_CIRCLE, color: '#aaa' }}
        text={'Close'}
        onPress={closeDrawer}
      />
      <CustomButton
        loaderStyle={styles.loaderStyle}
        viewStyle={styles.drawerItem}
        iconStyle={styles.drawerItemIcon}
        iconProps={{ name: icons.LOGOUT, color: '#aaa' }}
        onPress={handleLogout}
        text={'Logout'}
        isLoading={isSigningOut}
      />
    </View>
  );
};

DrawerActionButtons.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isSigningOut: PropTypes.bool.isRequired
};

export default React.memo(DrawerActionButtons);
