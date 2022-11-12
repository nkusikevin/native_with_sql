import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Note = ({ note, navigation }) => {
    return (
        <TouchableOpacity style={{ ...styles.note, backgroundColor: note.color }} onPress={() => navigation.navigate("DetailNote", note)} >
            <View style={{ flex: 1 }} >
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Semibold", fontWeight: "bold" }} numberOfLines={1}>{note.title}</Text>
                <Text style={{ color: "#fff", fontSize: 12, paddingVertical: 10, fontFamily: "Poppins" }} numberOfLines={3}  >{note.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({
    note: {
        backgroundColor: "#FDA3B8",
        margin: 5,
        height: 110,
        paddingHorizontal: 4,
        paddingVertical: 2,
        elevation: 6,
        borderRadius: 5,
        flex: 1,
        overflow: "hidden"
    }
})
