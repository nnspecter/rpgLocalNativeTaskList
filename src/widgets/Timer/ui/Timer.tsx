import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme'
import { useCharacterStore } from '@/entities/character'
import { useMetricsStore } from '@/entities/metrics'
import { useTasksStore } from '@/entities/tasks'
import { useTimerStore } from '@/entities/timer'
import { useSnacbarControlStore } from '@/shared/ui/Snackbar/model/snackbarControlStore'
import i18n from '@/shared/config/i18n'
import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, AppState, AppStateStatus } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Button, IconButton, Surface, Text, useTheme } from 'react-native-paper'
import { expValidation } from '@/features/expValidation/expValidation'
import { checkAchievements } from '@/features/achievements/model/checkAchievements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAchievementsStore } from '@/entities/Achievements'

const TIMER_END_TIME_KEY = 'timer_end_time'
const TIMER_PAUSED_REMAINING_KEY = 'timer_paused_remaining'

const { width } = Dimensions.get('window')

export const Timer = () => {
  const { isTimer, setIsTimer, selectedTask } = useTimerStore();
  const { setVisible } = useSnacbarControlStore();
  const { editTask } = useTasksStore();
  const { setExperience } = useCharacterStore();
  const { updateCompletedCount, updateStreak, updateTodayCompletedTasks } = useMetricsStore();
  const { totalBoost} = useAchievementsStore();

  const theme = useTheme<AppTheme>()
  const taskMinutes = selectedTask?.minutes ?? 25
  const totalSeconds = taskMinutes * 60

  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)
  const endTimeRef = useRef<number | null>(null)
  // Фиксируем реальное время старта — не зависит от замыканий
  const startTimeRef = useRef<number>(Date.now())

  const persistEndTime = async (endTime: number) => {
    try {
      await AsyncStorage.setItem(TIMER_END_TIME_KEY, String(endTime))
    } catch (e) {
      console.warn('Timer: failed to persist endTime', e)
    }
  }

  const clearPersistedTimer = async () => {
    try {
      await AsyncStorage.multiRemove([TIMER_END_TIME_KEY, TIMER_PAUSED_REMAINING_KEY])
    } catch (e) {
      console.warn('Timer: failed to clear persisted timer', e)
    }
  }

  const handleTimerComplete = async () => {
    if (completedRef.current) return
    completedRef.current = true

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    await clearPersistedTimer()
    if (selectedTask?.taskId == null) return
    const workedMs = Date.now() - startTimeRef.current
    const workedMinutes = Math.min(taskMinutes, workedMs / 60000)
    editTask({ ...selectedTask, isComplete: true, taskId: selectedTask.taskId })
    setExperience(expValidation(workedMinutes, totalBoost))
    updateCompletedCount()
    updateTodayCompletedTasks(workedMinutes)
    updateStreak()
    checkAchievements()
    setIsTimer(false)
    setVisible(true)
  }

  const startInterval = (endTime: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const remaining = Math.round((endTime - Date.now()) / 1000)
      if (remaining <= 0) {
        setSecondsLeft(0)
        handleTimerComplete()
        return
      }
      setSecondsLeft(remaining)
    }, 1000)
  }

  useEffect(() => {
    completedRef.current = false
    setSecondsLeft(totalSeconds)
    setIsPaused(false)
    startTimeRef.current = Date.now()
    const endTime = Date.now() + totalSeconds * 1000
    endTimeRef.current = endTime
    persistEndTime(endTime)
    startInterval(endTime)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [totalSeconds])

  // при возврате из фона пересчитываем время
  useEffect(() => {
    const handleAppStateChange = async (nextState: AppStateStatus) => {
      const prevState = appStateRef.current
      appStateRef.current = nextState

      if (
        (prevState === 'background' || prevState === 'inactive') &&
        nextState === 'active'
      ) {
        if (isPaused) return
        try {
          const stored = await AsyncStorage.getItem(TIMER_END_TIME_KEY)
          if (!stored) return
          const endTime = Number(stored)
          const remaining = Math.round((endTime - Date.now()) / 1000)
          if (remaining <= 0) {
            setSecondsLeft(0)
            handleTimerComplete()
            return
          }
          setSecondsLeft(remaining)
          endTimeRef.current = endTime
          startInterval(endTime)
        } catch (e) {
          console.warn('Timer: failed to restore endTime', e)
        }
      }

      if (nextState === 'background' || nextState === 'inactive') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => subscription.remove()
  }, [isPaused])

  const handlePause = async () => {
    if (isPaused) {
      const endTime = Date.now() + secondsLeft * 1000
      endTimeRef.current = endTime
      await persistEndTime(endTime)
      await AsyncStorage.removeItem(TIMER_PAUSED_REMAINING_KEY)
      setIsPaused(false)
      startInterval(endTime)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      await AsyncStorage.setItem(TIMER_PAUSED_REMAINING_KEY, String(secondsLeft))
      await AsyncStorage.removeItem(TIMER_END_TIME_KEY)
      endTimeRef.current = null
      setIsPaused(true)
    }
  }

  const fill = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)

  const displayHours = Math.floor(secondsLeft / 3600)
  const displayMinutes = Math.floor((secondsLeft % 3600) / 60)
  const displaySeconds = secondsLeft % 60

  const timeString =
    displayHours > 0
      ? `${String(displayHours)}:${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`
      : `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`

  const timeUnit = isPaused ? i18n.t('timer.paused') : i18n.t('timer.remaining')

  const styles = makeStyles(theme, displayHours > 0)

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <Text style={styles.taskName} numberOfLines={2}>
        {selectedTask?.taskName ?? i18n.t('timer.defaultSession')}
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
          {isPaused ? i18n.t('timer.resume') : i18n.t('timer.pause')}
        </Text>
      </Surface>

      <Button
        mode="outlined"
        onPress={() => handleTimerComplete()}
        style={styles.endEarlyButton}
        contentStyle={styles.endButtonContent}
        labelStyle={styles.endButtonLabel}
        textColor={theme.colors.primary}
        rippleColor={theme.colors.primary}
      >
        {i18n.t('timer.completeEarly')}
      </Button>

      <Button
        mode="outlined"
        onPress={async () => {
          await clearPersistedTimer()
          setIsTimer(false)
        }}
        style={styles.endButton}
        contentStyle={styles.endButtonContent}
        labelStyle={styles.endButtonLabel}
        textColor={theme.colors.error}
        rippleColor={theme.colors.errorBackground}
      >
        {i18n.t('timer.endEarly')}
      </Button>
    </View>
  )
}

const makeStyles = (theme: AppTheme, hasHours: boolean) =>
  StyleSheet.create({
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
      fontSize: hasHours ? 42 : 56,
      fontWeight: '300',
      letterSpacing: hasHours ? 2 : 4,
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
    endEarlyButton: {
      borderColor: theme.colors.primaryContainer,
      borderWidth: 1,
      borderRadius: 8,
      width: width * 0.7,
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
  })