import React from 'react';
import { View } from 'react-native';
import EditButton from 'src/components/EditItemButtons/EditButton';
import styles from 'src/components/EditItemButtons/styles';

interface Props {
  itemId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  deletingItemId?: number;
  updatingItemId?: number;
}

const EditItemButtons: React.FC<Props> = ({ itemId, onEdit, onDelete, deletingItemId, updatingItemId }) => {
  const isEditing = itemId === updatingItemId;
  const isDeleting = itemId === deletingItemId;
  return (
    <View style={styles.buttonContainer}>
      <EditButton {...{ itemId, updatingItemId, onPress: onEdit, isEditButton: true, isEditing, isDeleting }} />
      <EditButton {...{ itemId, updatingItemId: deletingItemId, onPress: onDelete, isEditButton: false, isEditing, isDeleting }} />
    </View>
  );
};

export default React.memo(EditItemButtons);
