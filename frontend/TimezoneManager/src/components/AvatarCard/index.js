import React from 'react';
import { Text, View } from 'react-native';
import { StringUtils } from 'src/utils';
import PropTypes from 'prop-types';
import styles from 'src/components/AvatarCard/styles';

const AvatarCard = ({ name, emailAddress }) => {
  return (
    <View style={styles.inlineView}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{StringUtils.getNameInitials(name)}</Text>
      </View>
      <View style={styles.avatarInfoContainer}>
        <Text style={styles.avatarInfoTextTop}>{name}</Text>
        <Text style={styles.avatarInfoTextBottom}>{emailAddress}</Text>
      </View>
    </View>
  );
};

AvatarCard.propTypes = {
  name: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired
};

export default React.memo(AvatarCard);
