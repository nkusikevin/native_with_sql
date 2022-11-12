import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
	FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Note from "../components/Note";
import { fetchNotes } from "../db/db";
const Home = ({ navigation }) => {
	const [notes, setNotes] = useState([]);
	const [text, setText] = useState("");
	const isFocused = useIsFocused();
	const filteredNotes = notes.filter(
		(note) =>
			note.title.toLowerCase().includes(text.toLowerCase()) ||
			note.description.toLowerCase().includes(text.toLowerCase())
	);

	useEffect(() => {
		async function fetchData() {
			const { rows } = await fetchNotes();
			setNotes(rows._array);
		}
		fetchData();
	}, [isFocused]);
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Text style={{ fontSize: 24, color: "#000", fontFamily: "Semibold" }}>
					Notes
				</Text>
				<Pressable onPress={() => navigation.navigate("AddNote")}>
					<View style={styles.iconContainer}>
						<Icon name='add' size={28} color={"#fff"} />
					</View>
				</Pressable>
			</View>
			<View style={styles.inputContainer}>
				<Icon name='search-outline' size={25} color={"grey"} />
				<TextInput
					value={text}
					onChangeText={(e) => setText(e)}
					style={styles.input}
					placeholder='Search Your Notes'
				/>
			</View>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={filteredNotes}
				renderItem={({ item }) => <Note note={item} navigation={navigation} />}
			/>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
	},
	iconContainer: {
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 7,
		elevation: 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
		overflow: "hidden",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
		padding: 10,
		borderRadius: 8,
		elevation: 2,
		backgroundColor: "#fff",
	},
	input: {
		width: "90%",
		fontSize: 14,
		marginHorizontal: 6,
		color: "grey",
	},
});
