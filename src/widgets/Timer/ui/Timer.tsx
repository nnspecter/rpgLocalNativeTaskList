import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme'
import { useCharacterStore } from '@/entities/character'
import { useMetricsStore } from '@/entities/metrics'
import { useTasksStore } from '@/entities/tasks'
import { useTimerStore } from '@/entities/timer'
import { useSnacbarControlStore } from '@/shared/ui/Snackbar/model/snackbarControlStore'
import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Button, IconButton, Surface, Text, useTheme } from 'react-native-paper'


const { width } = Dimensions.get('window')

export const Timer = () => {
  const { setIsTimer, selectedTask } = useTimerStore();
  const { setVisible } = useSnacbarControlStore();
  const {editTask} = useTasksStore();
  const {setExperience} = useCharacterStore();
  const {updateCompletedCount, updateStreak} = useMetricsStore();
  const theme = useTheme<AppTheme>();
  const taskMinutes = selectedTask?.minutes ?? 25
  const totalSeconds = taskMinutes * 60

  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isPaused && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev: number) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (selectedTask?.taskId != null) {
              editTask({ ...selectedTask, isComplete: true, taskId: selectedTask.taskId });
              setExperience(taskMinutes*5);
              updateCompletedCount();
              updateStreak();
            }
            setIsTimer(false);
            setVisible(true);
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused])

  const fill = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)
  const displayMinutes = Math.floor(secondsLeft / 60)
  const displaySeconds = secondsLeft % 60
  const timeString = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`
  const timeUnit = isPaused ? 'пауза' : 'осталось'

  const handlePause = () => {
    if (isPaused) {
      setIsPaused(false)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsPaused(true)
    }
  }

  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <Text style={styles.taskName} numberOfLines={2}>
        {selectedTask?.taskName ?? 'Фокус-сессия'}
      </Text>

      <View style={styles.circleWrapper}>
        <AnimatedCircularProgress
          size={width * 0.75}
          width={10}
          fill={fill}
          tintColor={theme.colors.primary}
          backgroundColor={theme.colors.avatarBackground}
          rotation={0}
          lineCap="round"
          duration={800}
        >
          {() => (
            <View style={styles.innerCircle}>
              <Text style={styles.timeText}>{timeString}</Text>
              <Text style={styles.labelText}>{timeUnit}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <Surface style={styles.buttonRow} elevation={0}>
        <IconButton
          icon={isPaused ? 'play' : 'pause'}
          mode="contained"
          containerColor={theme.colors.primary}
          iconColor={theme.colors.onPrimary}
          size={32}
          style={styles.pauseIcon}
          onPress={handlePause}
        />
        <Text style={styles.pauseLabel}>
          {isPaused ? 'Продолжить' : 'Пауза'}
        </Text>
      </Surface>

      <Button
        mode="outlined"
        onPress={() => setIsTimer(false)}
        style={styles.endButton}
        contentStyle={styles.endButtonContent}
        labelStyle={styles.endButtonLabel}
        textColor={theme.colors.error}
        rippleColor={theme.colors.errorBackground}
      >
        Завершить досрочно
      </Button>
    </View>
  )
}

const makeStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  taskName: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    maxWidth: width * 0.8,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: theme.colors.onBackground,
    fontSize: 56,
    fontWeight: '300',
    letterSpacing: 4,
    fontVariant: ['tabular-nums'],
  },
  labelText: {
    color: theme.colors.primary,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  buttonRow: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  pauseIcon: {
    borderRadius: 50,
    width: 68,
    height: 68,
  },
  pauseLabel: {
    color: theme.colors.primary,
    fontSize: 13,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  endButton: {
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.7,
  },
  endButtonContent: {
    paddingVertical: 6,
  },
  endButtonLabel: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
});