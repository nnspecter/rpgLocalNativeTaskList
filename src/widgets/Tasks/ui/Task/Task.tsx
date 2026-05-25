// OneTask.tsx
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import ChangeTaskDialog from '../ChangeTaskDialog/ChangeTaskDialog';
import DeleteTaskDialog from '../DeleteTaskDialog/DeleteTaskDialog';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Task } from '@/entities/tasks';
import { useTimerStore } from '@/entities/timer';
import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';
import { formatMinutes } from '@/shared/config/TimeFormatters/formatMinutes';
import { expValidation } from '@/features/expValidation/expValidation';

export default function OneTask({ data }: { data: Task }) {
  const { setSelectedTask, setIsTimer } = useTimerStore();
  const swipeableRef = useRef<any>(null);
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);

  const renderRightActions = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => (
    <Reanimated.View
      style={[
        styles.rightActions,
        useAnimatedStyle(() => ({
          transform: [{ translateX: drag.value + 130 }],
        })),
      ]}
    >
      <ChangeTaskDialog task={data} />
      <DeleteTaskDialog task={data} />
    </Reanimated.View>
  );

  const handleStart = () => {
    setSelectedTask(data.taskId, data.taskName, data.time);
    setIsTimer(true);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      containerStyle={styles.swipeableContainer}
    >
      <View style={styles.card}>
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.taskName} numberOfLines={1}>
            {data.taskName}
          </Text>

          {data.description ? (
            <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
              {data.description}
            </Text>
          ) : null}
          <View style={{display: "flex", flexDirection: "row", gap: 10}}>
            {data.time ? (
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>
                  {expValidation(data.time)}xp
                </Text>
              </View>
            ) : null}
            {data.time ? (
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>
                  {formatMinutes(data.time)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <Button
          mode="contained"
          style={[styles.button, data.isComplete && styles.buttonDisabled]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={handleStart}
          disabled={data.isComplete}
        >
          <MaterialCommunityIcons
            name="play"
            size={22}
            color={theme.colors.onPrimary}
          />
        </Button>
      </View>
    </Swipeable>
  );
}

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    swipeableContainer: {
      width: '100%',
      padding: 2,
      borderRadius: 20,
      marginBottom: 8,
    },
    card: {
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 3,
      gap: 12,
    },
    info: {
      flex: 1,
      gap: 4,
    },
    taskName: {
      fontWeight: '700',
      color: theme.colors.onSurface,
    },
    description: {
      color: theme.colors.onSurfaceVariant,
      lineHeight: 18,
    },
    timeBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.avatarBackground,
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginTop: 2,
    },
    timeText: {
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 12,
    },
    button: {
      borderRadius: 12,
      alignSelf: 'center',
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.buttonDisabled,
      borderColor: theme.colors.buttonDisabled,
    },
    buttonContent: {
      paddingVertical: 2,
    },
    buttonLabel: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 0,
      paddingHorizontal: 10
    },
  });