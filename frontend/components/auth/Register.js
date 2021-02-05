import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground,  TouchableOpacity} from 'react-native'

import firebase from 'firebase'
import background from '../../assets/LoginBackgroud.png'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
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

                        <TextInput
                            style={styles.textInput}
                            placeholder="이름"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress={() => this.onSignUp()}>
                    <Text style = {styles.text}>회원가입</Text>
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
        height: 20,
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

export default Register
