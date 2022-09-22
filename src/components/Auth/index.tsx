import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from 'react-native-elements'

export default function Auth() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
  }

  return (
    <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
            autoCompleteType={undefined}
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            />
        </View>
        <View style={styles.verticallySpaced}>
            <Input
            autoCompleteType={undefined}
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})