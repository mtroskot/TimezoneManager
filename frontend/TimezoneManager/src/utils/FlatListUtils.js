import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AvatarCard, EditItemButtons, TimezoneEntry } from 'src/components';
import DateUtils from 'src/utils/DateUtils';

function renderAvatars(item) {
  const { firstName, lastName, emailAddress } = item;
  return <AvatarCard {...{ name: `${firstName} ${lastName}`, emailAddress }} />;
}

function renderEntries(item, minutes) {
  const date = new Date();
  if (!minutes) {
    minutes = DateUtils.convertShortTimeToLongTime(new Date().getHours());
  }
  const { name, cityName, differenceToGMT } = item;
  const timezoneTime = DateUtils.convertTimeToSelectedTimezoneTime(date, differenceToGMT);
  const timezoneHours = timezoneTime.getHours();
  const differenceToBrowser = DateUtils.getDifferenceInHours(timezoneTime, new Date());
  return (
    <TimezoneEntry
      {...{
        name,
        cityName,
        differenceToGMT,
        differenceToBrowser,
        time: `${DateUtils.convertShortTimeToLongTime(timezoneHours)}:${minutes}`
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inlineView: { flexDirection: 'row' }
});
function withEditButtons(component, itemId, onEdit, onDelete, deletingItemId, updatingItemId) {
  return (
    <View style={styles.inlineView}>
      <View style={styles.container}>{component}</View>
      <EditItemButtons {...{ itemId, onEdit, onDelete, deletingItemId, updatingItemId }} />
    </View>
  );
}

export default {
  renderAvatars,
  renderEntries,
  withEditButtons
};
