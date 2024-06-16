import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../App";

interface NavigationProps<T extends keyof StackParamList> {
  navigation: NavigationProp<StackParamList, T>;
  route?: RouteProp<StackParamList, T>;
}

export default NavigationProps;
