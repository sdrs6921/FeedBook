import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }
    return (
        <View>
            <View style = {{flexDirection : 'row', backgroundColor : '#03D37C'}}>
            <AntDesign name="search1" size={24} color="white" 
                style = {{marginLeft : 10, marginRight : 10, marginTop : 7}}/>
            <TextInput
                placeholder="친구 검색"
                style = {{color : 'white', height : 40}}
                onChangeText={(search) => fetchUsers(search)} />
            </View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text
                            style = {{
                                fontSize : 20,
                                marginLeft : 15,
                                marginBottom : 5,
                            }}>{item.name}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}
