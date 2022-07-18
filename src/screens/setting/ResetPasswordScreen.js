import React, { useState, useRef } from 'react'
import {AsyncStorage} from 'react-native'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { passwordValidator } from '../../helpers/passwordValidator'
import { rePasswordValidator } from '../../helpers/passwordValidator'

export default function ResetPasswordScreen({ navigation }) {
  const [phrase, setPhrase] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [rePassword, setRePassword] = useState({ value: '', error: '' })
  const sendResetWallet = async () => {
    const passwordError = passwordValidator(password.value) 
    const rePasswordError = rePasswordValidator(rePassword.value)
    
    if (passwordError || rePasswordError) {
      setPassword({ ...password, error: passwordError })
      setRePassword({ ...rePassword, error: rePasswordError })
      return
    }
    if(password.value!==rePassword.value){
        alert("The password confirmation does not match")
        setPassword({ ...password, error: '' })
        setRePassword({ value: '', error: '' })
        return
    }
    if(!phrase.value){
       alert("Input your authentication phrase to reset password")
      return
    }
    const storagePhrase = await AsyncStorage.getItem("desocial@0313/phrase")
    if(phrase.value!==storagePhrase){
      alert("Invalid Phrase")
      return
    }
    await AsyncStorage.setItem("desocial@0313/password",password.value)
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Import Authentication Phrase</Header>
      <TextInput
        label="authentication phrase"
        returnKeyType="done"
        value={phrase.value}
        onChangeText={(text) => setPhrase({ value: text, error: '' })}
        error={!!phrase.error}
        errorText={phrase.error}
        // autoCapitalize="none"
        // autoCompleteType="email"
        // textContentType="emailAddress"
        // keyboardType="email-address"
        description="Paste your authentication phrase"
      />
      <Header>Reset your Password</Header>
      <TextInput
        label="New password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={rePassword.value}
        onChangeText={(text) => setRePassword({ value: text, error: '' })}
        error={!!rePassword.error}
        errorText={rePassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={sendResetWallet}
        style={{ marginTop: 16 }}
      >
        Restore your wallet
      </Button>
    </Background>
  )
}
