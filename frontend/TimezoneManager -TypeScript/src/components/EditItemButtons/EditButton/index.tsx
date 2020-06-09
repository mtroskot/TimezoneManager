import React from 'react';
import { View } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import Loader from 'src/components/Loader';
import styles from 'src/components/EditItemButtons/styles';
import { dimensions } from 'src/styles';
import { eIcons } from 'src/types/enums';
const { rem } = dimensions;

interface Props {
  itemId: number;
  updatingItemId: number | undefined;
  onPress: (itemId: number) => void;
  isEditButton: boolean;
  isEditing: boolean;
  isDeleting: boolean;
}

const EditButton: React.FC<Props> = ({ itemId, updatingItemId, onPress, isEditButton, isEditing, isDeleting }) => {
  if (updatingItemId === itemId) {
    return (
      <View style={styles.deleteButton}>
        <Loader size={'small'} />
      </View>
    );
  }
  const isDisabled = isEditing || isDeleting;
  let buttonColor = isEditButton ? '#04c2dc' : '#f64812';
  if (isDisabled) {
    buttonColor = isEditButton ? '#b6cdd0' : '#ff8f87';
  }
  return (
    <CustomButton
      iconProps={{
        name: isEditButton ? eIcons.CREATE : eIcons.TRASH,
        color: buttonColor,
        size: 40 * rem
      }}
      disabled={isDisabled}
      onPress={() => onPress(itemId)}
      tOpacityStyle={isEditButton ? undefined : styles.deleteButton}
    />
  );
};

export default React.memo(EditButton);
