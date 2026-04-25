import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme'
import { useCharacterStore } from '@/entities/character'
import i18n from '@/shared/config/i18n'
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export const Character = () => {
    const theme = useTheme<AppTheme>()
    const { characterName, experience, maxExperience, level } = useCharacterStore()

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
            <View style={styles.headerRow}>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>
                        {characterName}
                    </Text>
                    <View style={styles.levelChip}>
                        <Text style={styles.levelChipText}>{i18n.t('character.level', { lvl: level })}</Text>
                    </View>
                </View>

                <View style={styles.xpPill}>
                    <Text style={styles.xpPillValue}>{experience}</Text>
                    <Text style={styles.xpPillMax}>/{maxExperience} XP</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.xpSection}>
                <View style={styles.xpLabelRow}>
                    <Text style={styles.xpLabel}>{i18n.t('character.xpLabel')}</Text>
                    <Text style={styles.xpPercent}>{Math.round(xpPercent)}%</Text>
                </View>

                <View style={styles.track}>
                    <Animated.View style={[styles.fill, { width: xpBarWidth }]} />
                </View>

                <Text style={styles.xpSub}>
                    {i18n.t('character.xpToNext', { xp: maxExperience - experience, lvl: level + 1 })}
                </Text>
            </View>
        </Animated.View>
    )
}

const makeStyles = (theme: AppTheme) => {
    const PRIMARY     = theme.colors.primary
    const PRIMARY_CTR = theme.colors.avatarBackground
    const ON_SURFACE  = theme.colors.onSurface
    const ON_SURF_VAR = theme.colors.onSurface
    const OUTLINE_VAR = theme.colors.inputBackground

    return StyleSheet.create({
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            marginHorizontal: 16,
            marginVertical: 8,
            paddingHorizontal: 20,
            paddingVertical: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 2,
        },
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        info: {
            flex: 1,
            gap: 4,
        },
        name: {
            fontSize: 16,
            fontWeight: '600',
            color: ON_SURFACE,
            letterSpacing: 0.15,
        },
        levelChip: {
            alignSelf: 'flex-start',
            backgroundColor: PRIMARY_CTR,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 2,
        },
        levelChipText: {
            fontSize: 12,
            fontWeight: '500',
            color: PRIMARY,
            letterSpacing: 0.4,
        },
        xpPill: {
            alignItems: 'flex-end',
        },
        xpPillValue: {
            fontSize: 20,
            fontWeight: '700',
            color: ON_SURF_VAR,
            letterSpacing: 0.15,
        },
        xpPillMax: {
            fontSize: 11,
            color: ON_SURF_VAR,
            letterSpacing: 0.4,
        },
        divider: {
            height: 1,
            backgroundColor: OUTLINE_VAR,
            marginVertical: 14,
        },
        xpSection: {
            gap: 6,
        },
        xpLabelRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        xpLabel: {
            fontSize: 12,
            fontWeight: '500',
            color: ON_SURF_VAR,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
        },
        xpPercent: {
            fontSize: 12,
            fontWeight: '600',
            color: PRIMARY,
            letterSpacing: 0.4,
        },
        track: {
            height: 8,
            backgroundColor: PRIMARY_CTR,
            borderRadius: 4,
            overflow: 'hidden',
        },
        fill: {
            height: '100%',
            backgroundColor: PRIMARY,
            borderRadius: 4,
        },
        xpSub: {
            fontSize: 11,
            color: ON_SURF_VAR,
            letterSpacing: 0.4,
        },
    })
}
