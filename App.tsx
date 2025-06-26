import {
  ApartmentInfoScreen,
  CreatePostScreen,
  EditApartmentScreen,
  EditUserScreen,
  FiltersScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  SavedApartmentsScreen,
  WelcomeScreen,
} from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiltersProvider } from "./context/FiltersContext/FiltersContext";
import { UserProvider } from "./context/UserContext/UserContext";
import { LogBox } from "react-native";

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

LogBox.ignoreLogs([
  "Warning: MenuDrawer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
                  component={ApartmentInfoScreen}
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
                  component={SavedApartmentsScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="EditProfile"
                  component={EditUserScreen}
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
      </UserProvider>
    </QueryClientProvider>
  );
}
