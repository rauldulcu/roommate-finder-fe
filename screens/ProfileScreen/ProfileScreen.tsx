import { Avatar, Card, Divider, Icon, Text } from "@rneui/base";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { NavigationProps } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import UtilityBadge from "../../components/UtilityBadge/UtilityBadge";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { formatDate } from "../../common/formatDate";
import { utilityIconMapping } from "../../common/UtilityMapping";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen: React.FC<NavigationProps<"Profile">> = ({
  navigation,
}) => {
  const { user, userError, userLoading, refetch } = useGetUserById(2);

  if (userLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (userError) {
    return (
      <View style={styles.centeredView}>
        <Text>Error loading user.</Text>
      </View>
    );
  }

  refetch();

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" type="material" color="black" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="edit-note" type="material" color="black" size={35} />
          </TouchableOpacity>
          <Card
            wrapperStyle={{ alignItems: "center" }}
            containerStyle={styles.card}
          >
            <Avatar
              rounded
              source={{
                uri: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
              }}
              size="xlarge"
            />
            <Text style={{ fontSize: 25, padding: 10, marginTop: 20 }}>
              {user.name}
            </Text>
          </Card>
          <Text style={styles.sectionTitle}>Your profile</Text>
          <Text>
            Here, you can find all the information about you. This information
            can be viewed by other users. You can edit this at any time by
            tapping on the button in the top right corner
          </Text>
          <Divider style={{ marginTop: 20 }} />
          <Text style={styles.sectionTitle}>Short summary</Text>
          <Text>{user.description}</Text>
          <Divider style={{ marginTop: 20 }} />
          <Text style={styles.sectionTitle}>Your hobbies and interests</Text>
          {user.hobbies.length > 0 ? (
            <View style={styles.tags}>
              {user.hobbies.map((hobby, index) => {
                const { label, icon } = utilityIconMapping[hobby];
                return (
                  <UtilityBadge iconName={icon} value={label} key={index} />
                );
              })}
            </View>
          ) : (
            <Text>
              You have no specified hobbies. Select some on the Edit Profile
              page.
            </Text>
          )}
          <Divider style={{ marginTop: 20 }} />
          <Text style={styles.sectionTitle}>Other relevant information</Text>
          <View style={{ padding: 10 }}>
            <View style={styles.infoRow}>
              <Icon name="cake" type="material" />
              <Text style={styles.infoText}>
                Date of birth: {formatDate(user.dateOfBirth)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="phone" type="material" />
              <Text style={styles.infoText}>
                Phone number: {user.phoneNumber}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="work" type="material" />
              <Text style={styles.infoText}>Occupation: {user.occupation}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="school" type="material" />
              <Text style={styles.infoText}>
                Went to: Technical University of Cluj-Napoca
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="email" type="material" />
              <Text style={styles.infoText}>Email: {user.email}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignContent: "center",
  },
  card: {
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 75,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
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
  section: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "900",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 3,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  tagContainer: {
    width: screenWidth * 0.9,
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
