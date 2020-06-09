import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Loader } from 'src/components';
import DrawerActionButtons from 'src/screens/SideDrawer/DrawerActionButtons';
import styles from 'src/screens/SideDrawer/styles';
import { NavigationService } from 'src/services';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { changeUserRole, logoutUser } from 'src/store/user/userActions';
import { mainUserRoleSelector, userInfoSelector } from 'src/store/user/userSelectors';
import { StoreState } from 'src/store/rootReducer';
import { iUser } from 'src/types/interfaces';
import { UserActionTypes } from 'src/types/store/actionTypes';

interface Props {
  user: iUser;
  role: string;
  isLoading: boolean;
  logoutUser: typeof logoutUser;
  changeUserRole: typeof changeUserRole;
  isSigningOut: boolean;
}

const SideDrawer: React.FC<Props> = (props) => {
  //STATE
  const { user, isLoading, isSigningOut, role } = props;
  const { firstName, lastName } = user as iUser;

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
        Logged in as <Text style={styles.italic}>{` ${firstName} ${lastName}`}</Text>
      </Text>
      <DrawerActionButtons {...{ handleLogout, closeDrawer, isSigningOut }} />
      {isLoading ? <Loader viewStyle={styles.loader} /> : <Text style={[styles.regular, styles.topMargin]}>Current user role {role}</Text>}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: userInfoSelector(state),
  role: mainUserRoleSelector(state),
  isLoading: checkIfLoadingSelector(state)([UserActionTypes.CHANGE_USER_ROLE]),
  isSigningOut: checkIfLoadingSelector(state)([UserActionTypes.LOGOUT])
});

const mapDispatchToProps = {
  logoutUser,
  changeUserRole
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SideDrawer));
