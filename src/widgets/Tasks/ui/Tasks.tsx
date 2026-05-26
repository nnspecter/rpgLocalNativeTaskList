// Tasks.tsx
import React, { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View, TouchableOpacity } from 'react-native'
import OneTask from './Task/Task';
import { Text, useTheme, Icon } from 'react-native-paper';
import { useTasksStore } from '@/entities/tasks';
import i18n from '@/shared/config/i18n';
import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';

type SortOption = 'name' | 'time_asc' | 'time_desc';

export const Tasks = () => {
  const {tasks} = useTasksStore();
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const theme = useTheme<AppTheme>();
  const styles = makeStyles(theme);
  const sortedTasks = useMemo(() => {
    const sorted = [...tasks];
    switch (sortOption) {
      case 'name':
        sorted.sort((a, b) => a.taskName.localeCompare(b.taskName));
        break;
      case 'time_asc':
        sorted.sort((a, b) => (a.time > b.time ? 1 : a.time < b.time ? -1 : 0));
        break;
      case 'time_desc':
        sorted.sort((a, b) => (a.time < b.time ? 1 : a.time > b.time ? -1 : 0));
        break;
    }
    return sorted.sort((a, b) => Number(a.isComplete) - Number(b.isComplete));
  }, [tasks, sortOption]);
  const { height, width } = useWindowDimensions();
  const sortButtons: { label: string; value: SortOption }[] = [
    { label: i18n.t('tasks.sort.byName'), value: 'name' },
    { label: i18n.t('tasks.sort.timeAsc'), value: 'time_asc' },
    { label: i18n.t('tasks.sort.timeDesc'), value: 'time_desc' },
  ];
  
  return (
    <View style={styles.tasks}>
      <View style={styles.title}>
        <Text style={{ color: theme.colors.onBackground }}>
          {i18n.t('tasks.totalTasks', { count: tasks.length })}
        </Text>
      </View>

      <View style={styles.sortSelector}>
        {sortButtons.map((btn) => (
          <TouchableOpacity
            key={btn.value}
            style={[
              styles.sortButton,
              sortOption === btn.value && styles.sortButtonActive
            ]}
            onPress={() => setSortOption(btn.value)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === btn.value && styles.sortButtonTextActive
              ]}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon source="clipboard-text-outline" size={64} color={theme.colors.onSurface} />
          <Text variant="titleMedium" style={styles.emptyTitle}>
            {i18n.t('tasks.emptyState.title')}
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtitle}>
            {i18n.t('tasks.emptyState.subtitle')}
          </Text>
        </View>
      ) : (
        <ScrollView
          style={[
            styles.scrollContainer,
            { maxHeight: height * 0.8, width: width * 0.9 }
          ]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {sortedTasks.map((task) => (
            <OneTask data={task} key={`task-${task.taskId}`} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const makeStyles = (theme: AppTheme) => StyleSheet.create({
  tasks: {
    flex: 1,
    gap: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sortSelector: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginBottom: 4,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    textAlign: 'center'
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortButtonText: {
    fontSize: 12,
    color: theme.colors.onSurface,
  },
  sortButtonTextActive: {
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 80,
    opacity: 0.7,
  },
  emptyTitle: {
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: theme.colors.outline,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: 300,
  },
  scrollContent: {
    gap: 5,
    paddingVertical: 4,
  },
});