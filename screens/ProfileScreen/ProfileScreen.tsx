import { Avatar, Card, Divider, Icon, Text } from "@rneui/base";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { NavigationProps } from "../../types";
import { PrimaryButton } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import UtilityBadge from "../../components/UtilityBadge/UtilityBadge";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen: React.FC<NavigationProps<"Profile">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" type="material" color="black" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => console.log("Edit profile pressed")}
        >
          <Icon name="edit-note" type="material" color="black" size={35} />
        </TouchableOpacity>
        <Card
          wrapperStyle={{ alignItems: "center" }}
          containerStyle={{
            borderRadius: 16,
            elevation: 5,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            marginTop: 75,
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
            }}
            size="xlarge"
          />
          <Text style={{ fontSize: 30 }}>Mihai</Text>
        </Card>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 24,
            marginBottom: 5,
            marginTop: 20,
          }}
        >
          Your profile
        </Text>
        <Text>
          Here, you can find all the information about you. This information can
          be viewed by other users. You can edit this at any time by tapping on
          the button in the top right corner
        </Text>
        <Divider style={{ marginTop: 20 }} />
        <Text
          style={{
            fontWeight: "900",
            fontSize: 24,
            marginBottom: 5,
            marginTop: 20,
          }}
        >
          Your hobbies and interests
        </Text>
        <View style={styles.section}>
          <View style={styles.tagContainer}>
            <UtilityBadge value="Cooking" iconName="lunch-dining" />
            <UtilityBadge value="Going Out" iconName="nightlife" />
            <UtilityBadge value="Music" iconName="piano" />
            <UtilityBadge value="Reading" iconName="book" />
            <UtilityBadge value="Writing" iconName="edit" />
            <UtilityBadge value="Painting" iconName="palette" />
          </View>
        </View>
        <Divider />
        <Text
          style={{
            fontWeight: "900",
            fontSize: 24,
            marginBottom: 5,
            marginTop: 20,
          }}
        >
          Other relevant information
        </Text>
        <Text>Phone number: +4075315932</Text>
        <Text>Occupation: Student</Text>
        <Text>Went to: Technical Univeristy of Cluj-Napoca</Text>
        <Text>Other stuff: other stuff</Text>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <PrimaryButton
            buttonStyle={{ backgroundColor: "red" }}
            title={"Delete profile"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 5,
    zIndex: 10,
  },
  editButton: {
    position: "absolute",
    top: 25,
    right: 5,
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
  },
  description: {},
  price: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagContainer: {
    width: screenWidth * 0.9,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
