import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "95%",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  rentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rentText: {
    fontSize: 14,
    color: "#000",
  },
  rentPrice: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  bookmarkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
