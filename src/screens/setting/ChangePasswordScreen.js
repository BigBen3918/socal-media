import React, { useState, useRef } from 'react'
import {AsyncStorage, TouchableOpacity, Image, StyleSheet} from 'react-native'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { passwordValidator } from '../../helpers/passwordValidator'
import { rePasswordValidator } from '../../helpers/passwordValidator'
import { currentPasswordValidator } from '../../helpers/passwordValidator'

import { validatePassword, updatePassword } from '../../core/model'

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [rePassword, setRePassword] = useState({ value: '', error: '' })

  const changePassword = async () => {
    const passwordError = passwordValidator(password.value) 
    const rePasswordError = rePasswordValidator(rePassword.value)
    const currentPasswordError = currentPasswordValidator(currentPassword.value)
    
    if (passwordError || rePasswordError || currentPasswordError) {
      setPassword({ ...password, error: passwordError })
      setRePassword({ ...rePassword, error: rePasswordError })
      setCurrentPassword({ ...currentPassword, error: currentPasswordError })
      return
    }
    if(password.value!==rePassword.value){
        alert("The password confirmation does not match")
        setPassword({ ...password, error: '' })
        setRePassword({ value: '', error: '' })
        return
    }
    if(!await validatePassword(currentPassword.value)){
      alert("You should input current password exactly!")
      return
    }
    if(password.value===currentPassword.value){
      alert('New Password cannot be same with Current Password !')
      setRePassword({value:''})
      setPassword({value:''})
      
      return
    }
    await updatePassword(password.value)
    navigation.navigate('Dashboard')
  }

  return (
    <Background>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Image style={styles.image} source={require('../../assets/arrow_back.png')}/>
      </TouchableOpacity>
      <Logo />
      <Header>Reset your Password</Header>
      <TextInput
        label="Current password"
        returnKeyType="done"
        value={currentPassword.value}
        onChangeText={(text) => setCurrentPassword({ value: text, error: '' })}
        error={!!currentPassword.error}
        errorText={currentPassword.error}
        description="Paste your Current Password"
        secureTextEntry
      />
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
        onPress={changePassword}
        style={{ marginTop: 16 }}
      >
        Change Password
      </Button>
    </Background>
  )
}


const styles = StyleSheet.create({
    image: {
      width: 24,
      height: 24,
      marginRight:"90%",
    },
})