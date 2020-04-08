import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Loader } from 'src/components';
import { userActionTypes } from 'src/constants/actionTypes';
import { userPropTypes } from 'src/constants/propTypes';
import DrawerActionButtons from 'src/screens/SideDrawer/DrawerActionButtons';
import styles from 'src/screens/SideDrawer/styles';
import { NavigationService } from 'src/services';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { changeUserRole, logoutUser } from 'src/store/user/userActions';
import { mainUserRoleSelector, userInfoSelector } from 'src/store/user/userSelectors';

const SideDrawer = props => {
  //STATE
  const { user, isLoading, isSigningOut, role } = props;
  const { firstName, lastName } = user;

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
          <Text style={[styles.regular, styles.topMargin]}>Current user role {role}</Text>
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
