import React from 'react';
import { TimezoneEntry } from 'src/components/index';
import { DateUtils } from 'src/utils/index';
import { iSavedTimezoneEntry } from 'src/types/interfaces';

interface Props {
  entry: iSavedTimezoneEntry;
  minutes: string;
}

const TimezoneSearchResults: React.FC<Props> = ({ entry, minutes }) => {
  const date = new Date();
  if (!minutes) {
    minutes = DateUtils.convertShortTimeToLongTime(new Date().getHours());
  }
  const { name, cityName, differenceToGMT } = entry;
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
};

export default React.memo(TimezoneSearchResults);
