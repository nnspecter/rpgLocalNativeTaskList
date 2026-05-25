import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme'
import { useCharacterStore } from '@/entities/character'
import { useAchievementsStore } from '@/entities/Achievements'
import i18n from '@/shared/config/i18n'
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export const Character = () => {
    const theme = useTheme<AppTheme>()
    const { characterName, experience, maxExperience, level } = useCharacterStore()
    const achievements = useAchievementsStore((state) => state.achievements)
    const totalBoost = achievements
      .filter((a) => a.isActive)
      .reduce((sum, a) => sum + a.boost, 0)

    const xpPercent = (experience / maxExperience) * 100

    const xpAnim = useRef(new Animated.Value(0)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(xpAnim, {
                toValue: xpPercent,
                damping: 20,
                stiffness: 120,
                useNativeDriver: false,
            }),
        ]).start()
    }, [xpPercent])

    const xpBarWidth = xpAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    const styles = makeStyles(theme)

    return (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            {/* Строка: имя + уровень + XP */}
            <View style={styles.headerRow}>
                <Text style={styles.name} numberOfLines={1}>
                    {characterName}
                </Text>
                <View style={styles.levelChip}>
                    <Text style={styles.levelChipText}>
                        {i18n.t('character.level', { lvl: level })}
                    </Text>
                </View>
                <Text style={styles.xpValue}>
                    {experience}
                    <Text style={styles.xpMax}>/{maxExperience} XP</Text>
                </Text>
            </View>

            {/* Прогресс-бар */}
            <View style={styles.track}>
                <Animated.View style={[styles.fill, { width: xpBarWidth }]} />
            </View>

            {/* Подпись */}
            <Text style={styles.xpSub}>
                {i18n.t('character.xpToNext', { xp: maxExperience - experience, lvl: level + 1 })}
            </Text>

            {totalBoost > 0 && (
              <Text style={styles.boostText}>
                +{totalBoost}% XP boost
              </Text>
            )}
        </Animated.View>
    )
}

const makeStyles = (theme: AppTheme) =>
    StyleSheet.create({
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            marginHorizontal: 0,
            marginVertical: 6,
            paddingHorizontal: 14,
            paddingVertical: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.12,
            shadowRadius: 2,
            gap: 8,
        },
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        name: {
            flex: 1,
            fontSize: 14,
            fontWeight: '600',
            color: theme.colors.onSurface,
            letterSpacing: 0.15,
        },
        levelChip: {
            backgroundColor: theme.colors.avatarBackground,
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 2,
        },
        levelChipText: {
            fontSize: 11,
            fontWeight: '500',
            color: theme.colors.primary,
            letterSpacing: 0.4,
        },
        xpValue: {
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.onSurface,
        },
        xpMax: {
            fontSize: 11,
            fontWeight: '400',
            color: theme.colors.onSurface,
        },
        track: {
            height: 6,
            backgroundColor: theme.colors.avatarBackground,
            borderRadius: 3,
            overflow: 'hidden',
        },
        fill: {
            height: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: 3,
        },
        xpSub: {
            fontSize: 11,
            color: theme.colors.onSurface,
            letterSpacing: 0.3,
        },
        boostText: {
            fontSize: 11,
            fontWeight: '600',
            color: theme.colors.primary,
            letterSpacing: 0.3,
        },
    })