import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, AsyncStorage } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'

import { validatePassword, getProfile, getWallet, getDatabase } from '../../core/model'

import { useSelector, useDispatch } from 'react-redux';
import slice from '../../../reducer';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const update = (json) => dispatch(slice.actions.update(json));

  const [password, setPassword] = useState({ value: '', error: '' })


  const onLoginPressed = async () => {
    // alert((await getDatabase()).database)
    // const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (passwordError) {
      setPassword({ ...password, error: passwordError })
      return
    }
    if (!await validatePassword(password.value)) {
      alert("Wrong Password. Try again !")
      setPassword({ value: '' })
      return
    }
    const profile = await getProfile();
    const wallet = await getWallet();
    update({ ...profile, ...wallet })
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Welcome back!</Header>
      {/* <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      /> */}
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.passtext}
        mode="Flat"
      />


      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        UNLOCK
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an wallet? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}> Create wallet</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  passtext: {
    backgroundColor: 'white',
  }
})
