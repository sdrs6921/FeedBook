import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, TextInput, ImageBackground } from 'react-native'
import background from '../../assets/LoginBackgroud.png'
import firebase from 'firebase'
import Landing from './Landing'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.image}>
                <View style={styles.container}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
                            onChangeText={(email) => this.setState({ email })}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder="비밀번호"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <Button
                        onPress={() => this.onSignUp()}
                        color="#03D37C"
                        title="로그인 "
                    />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    textInput: {
        width: '80%',
        height: 40,
        justifyContent: "center",
    },
    button: {
        width: "80%",
        
    },
    textInputContainer : {
        width : '80%',
        marginBottom : 50
    }
});

export default Login
