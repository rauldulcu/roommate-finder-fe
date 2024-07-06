import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  loginTitle: {
    marginVertical: 25,
  },
  inputContainer: {
    borderRadius: 16,
  },
  registerText: {
    color: "blue",
    marginTop: 50,
  },
  tagContainer: {
    width: screenWidth * 0.9,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 50,
  },
  occupationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 45,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  imagePreviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  removeImageButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  imagePickerButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    width: 100,
    height: 50,
  },
});
