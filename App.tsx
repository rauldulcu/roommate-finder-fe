import {
  FiltersScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PropertyDetailScreen from "./screens/ApartmentInfoScreen/ApartmentInfoScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import SavedScreen from "./screens/SavedApartmentsScreen/SavedScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiltersProvider } from "./context/FiltersContext/FitlersContext";
import EditApartmentScreen from "./screens/EditApartmentScreen/EditApartmentScreen";
import EditProfileScreen from "./screens/EditUserScreen/EditUserScreen";

export type StackParamList = {
  Welcome: undefined;
  Home: undefined | { filterApartments: boolean };
  Login: undefined;
  Register: undefined;
  Filters: undefined;
  CreatePost: undefined;
  Profile: undefined;
  Saved: undefined;
  ApartmentInfo: { apartmentId: number };
  EditProfile: undefined;
  EditApartment: { apartmentId: number };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FiltersProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Welcome"
                component={WelcomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Register"
                component={RegisterScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="ApartmentInfo"
                component={PropertyDetailScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Filters"
                component={FiltersScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="CreatePost"
                component={CreatePostScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Profile"
                component={ProfileScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Saved"
                component={SavedScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="EditProfile"
                component={EditProfileScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="EditApartment"
                component={EditApartmentScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </FiltersProvider>
    </QueryClientProvider>
  );
}
