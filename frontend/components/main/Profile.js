import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="account-circle" size={100} color="black" />
                    <View style={{
                        marginLeft: 10,
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontSize: 25,
                            marginBottom: 15
                        }}>{user.name}</Text>
                        <Text style={{
                            fontSize: 15
                        }}>{user.email}</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 15,
                        }}>
                            <View style={{
                                marginRight: 40,
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: '#BBBBBB',
                                    fontSize: 17
                                }}>읽은 책</Text>
                                <Text style={{
                                    fontSize: 17
                                }}>0</Text>
                            </View>
                            <View style={{
                                marginRight: 40,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#BBBBBB',
                                    fontSize: 17
                                }}>좋아요</Text>
                                <Text style={{
                                    fontSize: 17
                                }}>0</Text>
                            </View>
                            <View style={{

                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#BBBBBB',
                                    fontSize: 17
                                }}>저장</Text>
                                <Text style={{
                                    fontSize: 17
                                }}>0</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <TouchableOpacity
                                onPress={() => onUnfollow()}
                                style={{
                                    height: 50,
                                    backgroundColor: '#03D37C',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                    marginRight: 10,
                                    borderRadius: 15
                                }}
                            ><Text style = {{
                                color : 'white',
                                fontWeight : 'bold',
                                fontSize : 20
                            }}>팔로윙</Text></TouchableOpacity>
                        ) :
                            (
                                <TouchableOpacity
                                    onPress={() => onUnfollow()}
                                    style={{
                                        height: 50,
                                        backgroundColor: '#03D37C',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 15
                                    }}
                                ><Text style = {{
                                    color : 'white',
                                    fontWeight : 'bold',
                                    fontSize : 20
                                }}>팔로우</Text></TouchableOpacity>
                            )}
                    </View>
                ) :
                    <TouchableOpacity
                        onPress={() => onUnfollow()}
                        style={{
                            height: 40,
                            backgroundColor: '#03D37C',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 15,
                            marginTop : 10
                        }}
                    ><Text style = {{
                        color : 'white',
                        fontWeight : 'bold',
                        fontSize : 20
                    }}>로그 아웃</Text></TouchableOpacity>
                }
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>

                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);
