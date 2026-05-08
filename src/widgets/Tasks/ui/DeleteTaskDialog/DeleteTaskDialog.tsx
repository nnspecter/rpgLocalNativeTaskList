import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';
import { Task, useTasksStore } from '@/entities/tasks';
import i18n from '@/shared/config/i18n';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';

export default function DeleteTaskDialog({ task }: { task: Task }) {
  const theme = useTheme<AppTheme>();
  const [visible, setVisible] = useState(false);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const hideDialog = () => setVisible(false);
  const styles = makeStyles(theme);

  const handleDelete = () => {
    if (task.taskId) deleteTask(task.taskId);
    hideDialog();
  };

  return (
    <View>
      <IconButton
        mode="contained"
        onPress={() => setVisible(true)}
        icon="delete"
        containerColor={theme.colors.errorText}
        iconColor={theme.colors.onPrimary}
        style={styles.deleteBtn}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>{i18n.t('taskDialog.deleteTask.title')}</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={{ color: theme.colors.onSurface }}>
              {i18n.t('taskDialog.deleteTask.confirm', { name: task.taskName })}
            </Text>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button onPress={hideDialog} textColor={theme.colors.secondary}>
              {i18n.t('taskDialog.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              buttonColor={theme.colors.errorDeleteBtn}
              style={styles.actionBtn}
            >
              {i18n.t('taskDialog.deleteTask.submit')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const makeStyles = (theme: AppTheme) => StyleSheet.create({
  dialog: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  content: {
    alignItems: 'center',
  },
  deleteBtn: {
    borderRadius: 10,
  },
  actions: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});