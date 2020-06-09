import React from 'react';
import {Text, View} from 'react-native';
import StringUtils from 'src/utils/StringUtils';
import styles from 'src/components/AvatarCard/styles';

interface Props {
    name: string;
    emailAddress: string;
}

const AvatarCard:React.FC<Props> = ({name, emailAddress}) => (
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

export default React.memo(AvatarCard);
