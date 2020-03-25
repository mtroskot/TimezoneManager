import React from 'react';
import { View } from 'react-native';
import { AvatarCard, CustomButton, TimezoneEntry } from 'src/components';
import DateUtils from 'src/utils/DateUtils';
import { icons } from 'src/constants/icons';
import styles from 'src/screens/Search/SearchResults/styles';
import { dimensions } from 'src/styles';
const { rem } = dimensions;

function renderAvatars(item) {
  const { firstName, lastName, emailAddress } = item;
  return <AvatarCard {...{ name: `${firstName} ${lastName}`, emailAddress }} />;
}

function renderEntries(item, minutes) {
  const date = new Date();
  if (!minutes) {
    minutes = DateUtils.convertShortTimeToLongTime(new Date().getHours());
  }
  const { name, city, differenceToGMT } = item;
  const convertedTime = DateUtils.convertTimeToSelectedTimezoneTime(date, differenceToGMT);
  const timezoneHours = new Date(convertedTime).getHours();
  const differenceToBrowser = timezoneHours - date.getHours();
  return (
    <TimezoneEntry
      {...{
        name,
        city,
        differenceToGMT,
        differenceToBrowser,
        time: `${DateUtils.convertShortTimeToLongTime(timezoneHours)}:${minutes}`
      }}
    />
  );
}

function withEditButtons(component, itemId, onEdit, onDelete) {
  return (
    <View style={styles.inlineView}>
      <View style={{ flex: 1 }}>{component}</View>
      <View style={styles.buttonContainer}>
        <CustomButton
          iconProps={{ name: icons.CREATE, color: '#04c2dc', size: 40 * rem }}
          onPress={() => onEdit(itemId)}
        />
        <CustomButton
          iconProps={{ name: icons.TRASH, color: '#f64812', size: 40 * rem }}
          onPress={() => onDelete(itemId)}
          tOpacityStyle={styles.deleteButton}
        />
      </View>
    </View>
  );
}

export default {
  renderAvatars,
  renderEntries,
  withEditButtons
};
