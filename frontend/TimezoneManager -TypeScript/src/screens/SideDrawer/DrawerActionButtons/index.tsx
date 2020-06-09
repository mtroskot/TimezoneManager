import React from 'react';
import { View } from 'react-native';
import { CustomButton } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/SideDrawer/DrawerActionButtons/styles';
import { eIcons } from 'src/types/enums';

interface Props {
  handleLogout: () => void;
  closeDrawer: () => void;
  isSigningOut: boolean;
}

const DrawerActionButtons: React.FC<Props> = ({ handleLogout, closeDrawer, isSigningOut }) => (
  <View>
    <CustomButton
      viewStyle={styles.drawerItem}
      iconStyle={styles.drawerItemIcon}
      iconProps={{ name: eIcons.CLOSE_CIRCLE, color: '#aaa' }}
      text={'Close'}
      onPress={closeDrawer}
    />
    <CustomButton
      loaderStyle={styles.loaderStyle}
      viewStyle={styles.drawerItem}
      iconStyle={styles.drawerItemIcon}
      iconProps={{ name: eIcons.LOGOUT, color: '#aaa' }}
      onPress={handleLogout}
      text={'Logout'}
      isLoading={isSigningOut}
    />
  </View>
);

DrawerActionButtons.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isSigningOut: PropTypes.bool.isRequired
};

export default React.memo(DrawerActionButtons);
