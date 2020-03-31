import React from 'react';
import { Picker, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DrawerActionButtons from 'src/screens/SideDrawer/DrawerActionButtons';
import { Loader } from 'src/components';
import { changeUserRole, logoutUser } from 'src/store/user/userActions';
import { connect } from 'react-redux';
import { NavigationService } from 'src/services';
import { rolePicker } from 'src/constants/userRoles';
import styles from 'src/screens/SideDrawer/styles';
import PropTypes from 'prop-types';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { userActionTypes } from 'src/constants/actionTypes';
import { mainUserRoleSelector, userInfoSelector } from 'src/store/user/userSelectors';
import { userPropTypes } from 'src/constants/propTypes';

const SideDrawer = props => {
  //STATE
  const { user, isLoading, isSigningOut, role } = props;
  const { firstName, lastName } = user;

  const handleRoleChange = selectedRole => {
    if (selectedRole !== role) {
      props.changeUserRole(selectedRole);
    }
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const closeDrawer = () => {
    NavigationService.closeDrawer();
  };

  //RENDER
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.regular}>
        Logged in as
        <Text style={styles.italic}>{` ${firstName} ${lastName}`}</Text>
      </Text>
      <DrawerActionButtons {...{ handleLogout, closeDrawer, isSigningOut }} />
      {isLoading ? (
        <Loader viewStyle={styles.loader} />
      ) : (
        <>
          <Text style={[styles.regular, styles.topMargin]}>Current user role</Text>
          <Picker selectedValue={role} style={styles.picker} onValueChange={handleRoleChange}>
            {rolePicker.map(item => {
              return <Picker.Item key={item.value} label={item.label} value={item.value} />;
            })}
          </Picker>
        </>
      )}
    </SafeAreaView>
  );
};

SideDrawer.propTypes = {
  user: userPropTypes.isRequired,
  role: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  changeUserRole: PropTypes.func.isRequired,
  isSigningOut: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: userInfoSelector(state),
  role: mainUserRoleSelector(state),
  isLoading: checkIfLoadingSelector(state)([userActionTypes.CHANGE_USER_ROLE]),
  isSigningOut: checkIfLoadingSelector(state)([userActionTypes.LOGOUT])
});

const mapDispatchToProps = {
  logoutUser,
  changeUserRole
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SideDrawer));
