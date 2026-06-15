import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';
import { Task, useTasksStore } from '@/entities/tasks';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import i18n from '@/shared/config/i18n';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTaskBottomSheetsStore } from '../../model/TaskBottomSheetsControl/TaskBottomSheetsStore';
import { FadeIn } from 'react-native-reanimated';
import { FadeSlideIn } from '@/shared/ui/Animations/FadeSlideIn';

const EMPTY_TASK: Task = {
  taskId: 0,
  taskName: '',
  description: '',
  time: 0,
  isComplete: false,
};

export const ChangeTaskBottomSheet = () => {
  const theme = useTheme<AppTheme>();
  const editTask = useTasksStore((state) => state.editTask);

  const task = useTaskBottomSheetsStore((s) => s.changeTaskBottomSheet.task);
  const visible = useTaskBottomSheetsStore((s) => s.changeTaskBottomSheet.visible);
  const closeChangeTaskDialog = useTaskBottomSheetsStore((s) => s.closeChangeTaskBottomSheet);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%', '85%'], []);

  const [newTask, setNewTask] = useState<Task>(task ?? EMPTY_TASK);

  // Синхронизация с задачей из стора при открытии
  useEffect(() => {
    if (visible && task) {
      setNewTask(task);
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible, task]);

  const hideSheet = useCallback(() => {
    Keyboard.dismiss();
    closeChangeTaskDialog();
  }, [closeChangeTaskDialog]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeChangeTaskDialog();
      }
    },
    [closeChangeTaskDialog]
  );

  const setTime = useCallback((time: number) => {
    setNewTask((prev) => ({ ...prev, time }));
  }, []);

  const handleSave = () => {
    if (!newTask.taskName || newTask.time <= 0) return;
    editTask(newTask);
    hideSheet();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="none"
      />
    ),
    []
  );

  const styles = makeStyles(theme);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t('taskDialog.editTask.title')}</Text>
        <TextInput
          label={i18n.t('taskDialog.fields.taskName')}
          mode="outlined"
          value={newTask.taskName}
          onChangeText={(name) => setNewTask({ ...newTask, taskName: name })}
          style={styles.input}
          outlineStyle={styles.inputOutline}
          activeOutlineColor={theme.colors.primary}
        />
        <TextInput
          label={i18n.t('taskDialog.fields.description')}
          mode="outlined"
          multiline
          numberOfLines={3}
          value={newTask.description}
          onChangeText={(desc) => setNewTask({ ...newTask, description: desc })}
          style={[styles.input, styles.textArea]}
          outlineStyle={styles.inputOutline}
          activeOutlineColor={theme.colors.primary}
        />

        <View style={styles.timeSetterWrapper}>
          <TimeSetter time={0} key={newTask.taskId} setTime={setTime} />
        </View>
        

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={hideSheet}
            textColor={theme.colors.secondary}
            style={styles.cancelBtn}
          >
            {i18n.t('taskDialog.cancel')}
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={!newTask.taskName}
            style={styles.actionBtn}
          >
            {i18n.t('taskDialog.editTask.submit')}
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>

  );
}

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    sheetBackground: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    handleIndicator: {
      backgroundColor: theme.colors.outline,
      width: 40,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 32,
      gap: 12,
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    input: {
      width: '100%',
      backgroundColor: theme.colors.inputBackground,
      fontSize: 15,
    },
    inputOutline: {
      borderRadius: 12,
      borderWidth: 1,
    },
    textArea: {
      minHeight: 80,
    },
    timeSetterWrapper: {
      marginTop: 4,
      width: '100%',
      alignItems: 'center',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 8,
    },
    cancelBtn: {
      flex: 1,
      borderRadius: 10,
      borderColor: theme.colors.secondary,
    },
    actionBtn: {
      flex: 1,
      borderRadius: 10,
    },
  });