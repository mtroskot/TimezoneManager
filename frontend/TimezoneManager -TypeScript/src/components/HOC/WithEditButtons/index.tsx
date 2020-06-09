import React from 'react';
import { View } from 'react-native';
import { EditItemButtons } from 'src/components/index';
import styles from 'src/components/HOC/WithEditButtons/styles';

interface Props {
  WrappedComponent: Element;
  itemId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  deletingItemId?: number;
  updatingItemId?: number;
}

const WithEditButtons: React.FC<Props> = ({ WrappedComponent, itemId, onEdit, onDelete, deletingItemId, updatingItemId }) => {
  return (
    <View style={styles.inlineView}>
      <View style={styles.container}>{WrappedComponent}</View>
      <EditItemButtons {...{ itemId, onEdit, onDelete, deletingItemId, updatingItemId }} />
    </View>
  );
};

export default React.memo(WithEditButtons);
