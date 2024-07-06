import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  optionButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  carouselImage: {
    width: "100%",
    height: "75%",
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  landlordInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  propertyTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 15,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  description: {},
  price: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginTop: 35,
  },
  optionsCard: {
    position: "absolute",
    right: 30,
    top: 80,
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
    padding: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },
  touchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
});
