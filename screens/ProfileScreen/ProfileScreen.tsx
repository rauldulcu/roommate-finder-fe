import { Avatar, Card, Divider, Icon, Text } from "@rneui/base";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetUserById } from "../../hooks/users/useGetUserById";
import { formatDate } from "../../common/formatDate";
import { utilityIconMapping } from "../../common/UtilityMapping";
import { UtilityBadge } from "../../components";
import { styles } from "./styles";
import { useUser } from "../../context/UserContext/UserContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../App";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const { loggedUser, loading } = useUser();

  const { user, userError, userLoading, refetch } = useGetUserById(
    loggedUser!.id
  );

  if (loading || userLoading) {
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
                uri:
                  user.avatarURL ||
                  "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
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
            {/* <View style={styles.infoRow}>
              <Icon name="school" type="material" />
              <Text style={styles.infoText}>
                Went to: Technical University of Cluj-Napoca
              </Text>
            </View> */}
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
