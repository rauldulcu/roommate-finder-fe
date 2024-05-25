import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 150,
    height: 150,
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
    marginTop: 100,
  },
});
