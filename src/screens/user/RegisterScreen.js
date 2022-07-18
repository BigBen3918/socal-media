import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native'
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
import { rePasswordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import Spinner from 'react-native-loading-spinner-overlay';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers } from "ethers";

import {initialAccount, getWallet, setDatabase, getDatabase} from '../../core/model'


export default function RegisterScreen({ navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' })
  const [rePassword, setRePassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
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
    
    console.log("start wallet create");
    const wallet = ethers.Wallet.createRandom()
    const mnemonic = wallet.mnemonic.phrase;
    const address = wallet.address;
    const privateKey = wallet.privateKey;

    console.log("end wallet create");
    
    await initialAccount(mnemonic, address, privateKey);

    console.log("end initialAccount create");

    await AsyncStorage.setItem("desocial@0313/password",password.value)
    navigation.reset({
      index: 0,
      routes: [{ name: 'MnemonicCopyScreen' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Wallet</Header>
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
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
      CREATE
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loading: {
    width: 20,
  },
})
