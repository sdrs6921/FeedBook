import React, { Component } from 'react'
import { Text, TouchableOpacity ,StyleSheet, View, Button, TextInput, ImageBackground } from 'react-native'
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
            <ImageBackground source={background} style={styles.backgroundContainer}>
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
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress={() => this.onSignUp()}>
                    <Text style = {styles.text}>로그인</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        justifyContent: 'center',

    },
    backgroundContainer : {
        flex : 1,
        justifyContent : 'flex-end',
        
    },
    textInput: {
        width: '80%',
        height: 30,
        justifyContent: "center",
        marginLeft : 20,
        marginBottom : 30
    },
    button: {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#03D37C',
        height : 50,
        marginLeft : 20,
        marginRight : 20,
        borderRadius : 15
        
    },
    textInputContainer : {
        marginBottom : 70,
    },
    text : {
        color : '#FFFFFF',
        fontSize : 20,
        fontWeight : 'bold'
    }
});

export default Login
