import React from 'react';
import { Picker, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DrawerActionButtons from 'src/screens/SideDrawer/DrawerActionButtons';
import { NavigationService } from 'src/services';
import { screenNames } from 'src/constants/navigation';
import { roles } from 'src/constants/userRoles';
import styles from 'src/screens/SideDrawer/styles';

const SideDrawer = () => {
  const handleRoleChange = () => {};

  const handleLogout = () => {
    NavigationService.navigate(screenNames.AUTH);
  };

  const closeDrawer = () => {
    NavigationService.closeDrawer();
  };

  //RENDER
  const user = {
    isAuthenticated: true,
    displayName: 'Marko Troskot'
  };
  const { displayName } = user;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.regular}>
        Logged in as<Text style={styles.italic}> {displayName}</Text>
      </Text>
      <DrawerActionButtons {...{ handleLogout, closeDrawer }} />
      <Text style={[styles.regular, styles.topMargin]}>Current user role</Text>
      <Picker selectedValue={'regular'} style={styles.picker} onValueChange={handleRoleChange}>
        {roles.map(item => {
          return <Picker.Item key={item.value} label={item.label} value={item.value} />;
        })}
      </Picker>
    </SafeAreaView>
  );
};

export default React.memo(SideDrawer);
