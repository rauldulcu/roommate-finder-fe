import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "35%",
    position: "absolute",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
    borderRadius: 20,
    padding: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheetContainer: {
    flex: 1,
    marginTop: 50,
  },
  bottomSheet: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  formContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
  },
  textArea: {
    height: 100,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputContainer: {
    paddingHorizontal: 10,
    fontSize: 50,
  },
  inputContainerStyle: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 16,
    marginBottom: 24,
  },
  imageContainer: {
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "black",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
