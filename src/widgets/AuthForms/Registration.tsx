import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthData } from '../../../api/axios/apiTypes';
import { useRegistration } from '../../../api/mutations/mutations';
import i18n from '../../shared/config/i18n';
import { AppTheme } from '../../app/providers/ThemeProvider/lib/paperTheme';


const INPUT_WIDTH = 300;

export default function Registration({ setter }: { setter: (type: "reg" | "login") => void }) {
  const theme = useTheme<AppTheme>();

  const [loginData, setLoginData] = useState<AuthData>({ username: "", password: "" });
  const [formError, setFormError] = useState<boolean>(false);

  const regMutation = useRegistration();

  const handleClick = () => {
    if (regMutation.isPending) return;
    if (loginData.username.trim().length < 4 || loginData.password.trim().length < 4) {
      setFormError(true);
      return;
    }
    setFormError(false);
    regMutation.mutate(loginData);
  };

  const styles = makeStyles(theme);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <View style={styles.card}>

            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>✏️</Text>
            </View>

            <Text variant="headlineSmall" style={styles.title}>
              {i18n.t('auth.registration.title')}
            </Text>
            <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.outline }]}>
              {i18n.t('auth.registration.subtitle')}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                label={i18n.t('auth.fields.username')}
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
                value={loginData.username}
                error={formError}
                onChangeText={name => setLoginData(prev => ({ ...prev, username: name.trim().toLowerCase() }))}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
              <TextInput
                label={i18n.t('auth.fields.password')}
                mode="outlined"
                left={<TextInput.Icon icon="lock" />}
                value={loginData.password}
                error={formError}
                onChangeText={pass => setLoginData(prev => ({ ...prev, password: pass.trim() }))}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {(formError || regMutation.error) && (
              <View style={styles.errorBox}>
                <Text variant="bodySmall" style={styles.errorText}>
                  {formError ? i18n.t('auth.errors.minLength') : i18n.t('auth.errors.usernameTaken')}
                </Text>
              </View>
            )}

            <Button
              mode="contained"
              onPress={handleClick}
              loading={regMutation.isPending}
              disabled={regMutation.isPending}
              style={[styles.button, regMutation.isPending && styles.buttonDisabled]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              {i18n.t('auth.registration.button')}
            </Button>

            <View style={styles.footer}>
              <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                {i18n.t('auth.registration.hasAccount')}
              </Text>
              <Button
                mode="text"
                compact
                onPress={() => setter("login")}
                labelStyle={styles.link}
              >
                {i18n.t('auth.registration.login')}
              </Button>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (theme: AppTheme) => StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  card: {
    width: INPUT_WIDTH + 48,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.avatarBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 28,
  },
  title: {
    fontWeight: '700',
    color: theme.colors.onBackground,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 28,
    textAlign: 'center',
  },
  inputContainer: {
    width: INPUT_WIDTH,
    gap: 14,
    marginBottom: 4,
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: theme.colors.inputBackground,
  },
  inputOutline: {
    borderRadius: 12,
  },
  errorBox: {
    width: INPUT_WIDTH,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.errorBackground,
  },
  errorText: {
    color: theme.colors.errorText,
    textAlign: 'center',
  },
  button: {
    width: INPUT_WIDTH,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.buttonDisabled,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    fontWeight: '700',
    marginLeft: 2,
    color: theme.colors.primary,
  },
});