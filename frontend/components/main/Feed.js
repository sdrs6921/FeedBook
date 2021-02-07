import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.container}>
                            <View style={styles.accountContainer}>
                                <MaterialIcons name="account-circle" size={40} color="black" />
                                <Text style={styles.id}>{item.user.name}</Text>
                            </View>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            { item.currentUserLike ?
                                (
                                    <AntDesign name="heart" color="black" size={26}
                                        styles = {{marginLeft : 10}}
                                        onPress={() => onDislikePress(item.user.uid, item.id)} />
                                )
                                :
                                (
                                    <AntDesign name="hearto" color="black" size={26}
                                        styles = {{marginLeft : 10}}
                                        onPress={() => onLikePress(item.user.uid, item.id)} />
                                )
                            }
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.author}>{item.author}</Text>
                            <Text style={styles.theme}>{item.theme}</Text>
                            <Text style={styles.caption}>{item.caption}</Text>
                            <Text
                                style={styles.comment}
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                댓글 보기
                                </Text>
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
        aspectRatio: 1 / 1,
    },
    accountContainer: {
        flexDirection: 'row',
    },
    id: {
        fontSize: 20,
        marginTop: 12,
        marginLeft: 3
    },
    title : {
        fontSize : 25,
        fontWeight : 'bold',
        marginLeft : 10
    },
    author : {
        color : '#808080',
        fontSize : 15,
        marginLeft : 10
    },
    theme : {
        color : '#03D37C',
        marginLeft : 10,
        fontSize : 15,
        marginBottom : 20,
    },
    caption : {
        marginLeft : 10,
    },
    comment : {
        color : '#808080',
        marginLeft : 10,
        marginBottom : 70,
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
