import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Surface, Text, Icon, useTheme } from 'react-native-paper'
import { AppTheme } from '../../../app/providers/ThemeProvider/lib/paperTheme'

export interface Achievement {
  id: number
  name: string
  boost: number
  desc: string
  isOpen: boolean
  isActive: boolean
}

const getColors = (isDark: boolean) => ({
  activeBorder: '#7F77DD',
  badge: {
    bg: isDark ? '#26215C' : '#EEEDFE',
    text: isDark ? '#AFA9EC' : '#534AB7',
  },
  lockedText: isDark ? '#555' : '#aaa',
})

export const AchievementCard: React.FC<Achievement> = ({
  name,
  boost,
  desc,
  isOpen,
  isActive,
}) => {
  const theme = useTheme<AppTheme>()
  const isDark = theme.dark
  const C = getColors(isDark)

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: isOpen
            ? theme.colors.surface
            : isDark ? '#1A1A1A' : '#F0F0F0',
          borderColor: isActive ? C.activeBorder : theme.colors.outlineVariant,
          borderWidth: isActive ? 1.5 : 0.5,
          opacity: isOpen ? 1 : 0.65,
        },
      ]}
      elevation={isActive ? 2 : 1}
    >
      <View style={styles.header}>
        <Text
          variant="labelLarge"
          style={[
            styles.name,
            { color: isOpen ? theme.colors.onSurface : theme.colors.onSurfaceDisabled },
          ]}
          numberOfLines={2}
        >
          {name}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: isOpen ? C.badge.bg : isDark ? '#2A2A2A' : '#E0E0E0',
              borderColor: theme.colors.outlineVariant,
              borderWidth: isOpen ? 0 : 0.5,
            },
          ]}
        >
          <Icon
            source="lightning-bolt"
            size={11}
            color={isOpen ? C.badge.text : C.lockedText}
          />
          <Text
            variant="labelSmall"
            style={{ color: isOpen ? C.badge.text : C.lockedText, fontWeight: '500' }}
          >
            +{boost}%
          </Text>
        </View>
      </View>

      <Text
        variant="bodySmall"
        style={[
          styles.desc,
          { color: isOpen ? theme.colors.onSurfaceVariant : C.lockedText },
        ]}
        numberOfLines={3}
      >
        {desc}
      </Text>

      {isActive && (
        <View style={styles.statusRow}>
          <Icon source="circle-medium" size={14} color={C.activeBorder} />
          <Text variant="labelSmall" style={{ color: C.activeBorder, fontSize: 11 }}>
            Активно
          </Text>
        </View>
      )}

      {!isOpen && (
        <View style={styles.statusRow}>
          <Icon source="lock-outline" size={12} color={C.lockedText} />
          <Text variant="labelSmall" style={{ color: C.lockedText, fontSize: 11 }}>
            Заблокировано
          </Text>
        </View>
      )}
    </Surface>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 12,
    padding: 14,
    paddingBottom: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  name: {
    flex: 1,
    lineHeight: 18,
    fontSize: 13,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    flexShrink: 0,
  },
  desc: {
    fontSize: 11.5,
    lineHeight: 17,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
})