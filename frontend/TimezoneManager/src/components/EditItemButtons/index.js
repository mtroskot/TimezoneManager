import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomButton, Loader } from 'src/components/index';
import { icons } from 'src/constants/icons';
import { dimensions } from 'src/styles';
import styles from 'src/components/EditItemButtons/styles';

const { rem } = dimensions;

function renderButton(itemId, updatingItemId, onPress, isEditButton, isEditing, isDeleting) {
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
        name: isEditButton ? icons.CREATE : icons.TRASH,
        color: buttonColor,
        size: 40 * rem
      }}
      disabled={isDisabled}
      onPress={() => onPress(itemId)}
      tOpacityStyle={isEditButton ? null : styles.deleteButton}
    />
  );
}

const EditItemButtons = ({ itemId, onEdit, onDelete, deletingItemId, updatingItemId }) => {
  const isEditing = itemId === updatingItemId;
  const isDeleting = itemId === deletingItemId;
  return (
    <View style={styles.buttonContainer}>
      {renderButton(itemId, updatingItemId, onEdit, true, isEditing, isDeleting)}
      {renderButton(itemId, deletingItemId, onDelete, false, isEditing, isDeleting)}
    </View>
  );
};

EditItemButtons.propTypes = {
  itemId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletingItemId: PropTypes.number,
  updatingItemId: PropTypes.number
};

export default React.memo(EditItemButtons);
