import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
  },
  selected: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  notSelected: {
    backgroundColor: "#E0E0E0",
  },
  text: {
    color: "black",
    textAlign: "center",
    marginLeft: 5,
  },
});
