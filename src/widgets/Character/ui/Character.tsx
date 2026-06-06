import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme'
import { useCharacterStore } from '@/entities/character'
import { useAchievementsStore } from '@/entities/Achievements'
import i18n from '@/shared/config/i18n'
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Svg, { Circle } from 'react-native-svg'

const RADIUS = 73
const STROKE_WIDTH = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SIZE = 174

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const Character = () => {
    const theme = useTheme<AppTheme>()
    const { characterName, experience, maxExperience, level } = useCharacterStore()
    const achievements = useAchievementsStore((state) => state.achievements)
    const totalBoost = achievements
        .filter((a) => a.isActive)
        .reduce((sum, a) => sum + a.boost, 0)

    const xpPercent = experience / maxExperience

    const xpAnim = useRef(new Animated.Value(0)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
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

    const strokeDashoffset = xpAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [CIRCUMFERENCE, 0],
    })

    const styles = makeStyles(theme)
    const center = SIZE / 2

    return (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.svgWrapper}>
                <Svg width={SIZE} height={SIZE}>
                    <Circle
                        cx={center}
                        cy={center}
                        r={RADIUS}
                        stroke={theme.colors.avatarBackground}
                        strokeWidth={STROKE_WIDTH}
                        fill="none"
                    />
                    <AnimatedCircle
                        cx={center}
                        cy={center}
                        r={RADIUS}
                        stroke={theme.colors.primary}
                        strokeWidth={STROKE_WIDTH}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={strokeDashoffset}
                        rotation="-90"
                        origin={`${center}, ${center}`}
                    />
                </Svg>

                <View style={styles.centerContent}>
                    <Text style={styles.name} numberOfLines={1}>
                        {characterName}
                    </Text>
                    <View style={styles.levelChip}>
                        <Text style={styles.levelChipText}>
                            {i18n.t('character.level', { lvl: level })}
                        </Text>
                    </View>
                    {totalBoost > 0 && (
                        <Text style={styles.boostText}>+{totalBoost}% XP</Text>
                    )}
                </View>
            </View>

            <Text style={styles.xpSub}>
                {i18n.t('character.xpToNext', {
                    xp: maxExperience - experience,
                    lvl: level + 1,
                })}
            </Text>
        </Animated.View>
    )
}

const makeStyles = (theme: AppTheme) =>
    StyleSheet.create({
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginVertical: 6,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.12,
            shadowRadius: 4,
            gap: 8,
        },
        svgWrapper: {
            width: SIZE,
            height: SIZE,
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerContent: {
            position: 'absolute',
            alignItems: 'center',
            gap: 6,
        },
        name: {
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.onSurface,
            letterSpacing: 0.15,
        },
        levelChip: {
            backgroundColor: theme.colors.avatarBackground,
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 3,
        },
        levelChipText: {
            fontSize: 11,
            fontWeight: '600',
            color: theme.colors.primary,
            letterSpacing: 0.4,
        },
        boostText: {
            fontSize: 10,
            fontWeight: '600',
            color: theme.colors.primary,
        },
        xpSub: {
            fontSize: 13,
            fontWeight: '700',
            color: theme.colors.onSurface,
            letterSpacing: 0.2,
        },
    })