import { View, Image, TouchableOpacity, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { styles } from "./styles";
import { Divider, Icon } from "@rneui/base";
import { NavigationProps } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { FiltersComponent } from "../../components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../App";

const FiltersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" type="material" color="black" size={30} />
      </TouchableOpacity>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Romania-2382_-_View_from_Hotel_%287794313314%29.jpg",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
        handleComponent={null}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Choose filters</Text>
          <Divider />
          <FiltersComponent />
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default FiltersScreen;
