import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderBtn from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { colors } from "../data";
import { insertNotes } from "../db/db";
const AddNote = ({ navigation }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [color, setColor] = useState("#FDA3B8");
	const [textValidated, setTextValidated] = useState(false);
	const [error, setError] = useState("");
	const uploadNotes = async () => {
		const textError = checkValidation(title, description, color);
		setError(textError);
		setTextValidated(true);
	};
	const checkValidation = (title, description, color) => {
		const error = {};
		if (title === "") {
			error.title = "Please  enter title";
		}
		if (description === "") {
			error.description = "Please  enter description";
		} else if (description.length < 10) {
			error.description =
				"Description sholud be greater then 10 words lettters";
		}
		if (color === "") {
			error.color = "Please  select color";
		}
		return error;
	};
	useEffect(() => {
		async function createData(title, description, color) {
			const ifData = await insertNotes(title, description, color);
		}
		if (Object.keys(error).length === 0 && textValidated) {
			console.log("uploaded");
			createData(title, description, color);
			Toast.show({
				type: "success",
				text1: "Your note has been created 👋",
			});
			setTimeout(() => {
				navigation.goBack();
			}, 2000);
		}
		return () => {
			clearTimeout();
			console.log("add This will be logged on unmount");
		};
	}, [error, textValidated]);
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Pressable onPress={() => navigation.navigate("Home")}>
					<View style={styles.iconContainer}>
						<HeaderBtn name='arrow-back' size={24} color={"#fff"} />
					</View>
				</Pressable>

				<Text
					style={{
						textAlign: "center",
						fontFamily: "Poppins",
						fontSize: 18,
						flex: 1,
					}}>
					Add A New Note
				</Text>
			</View>

			<View style={styles.formContainer}>
				<View style={{ marginBottom: 20 }}>
					<View
						style={{
							...styles.inputContainer,
							borderWidth: error.title ? 1 : 0,
						}}>
						<Icon name='title' size={25} color={"grey"} />
						<TextInput
							value={title}
							onChangeText={(e) => setTitle(e)}
							multiline={true}
							onKeyPress={() => setError({ ...error, title: null })}
							placeholder='Enter Your Note Title'
							style={styles.input}
						/>
					</View>
					{error.title && <Text style={styles.error}>{error.title}</Text>}
				</View>
				<View style={{ marginBottom: 20 }}>
					<View
						style={{
							...styles.inputContainer,
							borderWidth: error.description ? 1 : 0,
						}}>
						<Icon name='description' size={25} color={"grey"} />
						<TextInput
							value={description}
							onChangeText={(e) => setDescription(e)}
							on
							multiline={true}
							onKeyPress={() => setError({ ...error, description: null })}
							placeholder='Enter Your Note Description'
							style={styles.input}
						/>
					</View>
					{error.description && (
						<Text style={styles.error}>{error.description}</Text>
					)}
				</View>
				<View style={{ marginVertical: 20 }}>
					<View style={{ flexDirection: "row" }}>
						{colors.map((col, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => {
									setSelectedIndex(index);
									setColor(col.color);
								}}>
								<View
									key={col.id}
									style={{
										...styles.colorBox,
										backgroundColor: col.color,
										borderWidth: index === selectedIndex ? 2 : 0,
									}}
								/>
							</TouchableOpacity>
						))}
					</View>
					{error.color && <Text style={styles.error}>{error.color}</Text>}
				</View>
				<TouchableOpacity style={styles.btn} onPress={uploadNotes}>
					<Text style={{ color: "#fff", fontSize: 16 }}>Upload</Text>
				</TouchableOpacity>
			</View>
			<Toast />
		</View>
	);
};

export default AddNote;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
	},
	formContainer: {
		width: "100%",
		marginVertical: 40,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 8,
		borderRadius: 8,
		elevation: 4,
		backgroundColor: "#fff",
		overflow: "hidden",
		// marginBottom: 20,
		borderColor: "red",
	},
	input: {
		marginLeft: 4,
		fontSize: 16,
		color: "grey",
		width: "90%",
	},
	iconContainer: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 5,
		elevation: 4,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
		overflow: "hidden",
	},

	btn: {
		backgroundColor: "#00887e",
		paddingVertical: 15,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
	},
	colorBox: {
		height: 50,
		width: 50,
		marginHorizontal: 5,
		borderRadius: 4,
		overflow: "hidden",
		borderColor: "grey",
	},
	error: {
		fontSize: 12,
		fontFamily: "Poppins",
		color: "red",
	},
});
