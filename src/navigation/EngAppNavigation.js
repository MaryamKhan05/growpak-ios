import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Onboarding,
  Login,
  Prelogin,
  Signup,
  Otp,
  LoginPin,
  //   Info,
  PersonalInfo,
  Forgot,
  Information,
  Home,
  ElementsView,
  Notifications,
  Menu,
  Farm,
  GeneralNotification,
  SubBenefits,
  PackageDetails,
  FarmExample,
  Weather,
  BuyPackage,
  JazzCash,
  NewFarm,
  FarmDetails,
  SubscribedFarm,
  FarmFullReport,
  AllFarmers,
  AddFarmer,
  JazzcashSuccess,
  FarmDuplication,
} from "../engScreens/Index";
import COLORS from "../../assets/colors/colors";
import UrduButton from "../engComponents/UrduButton";
import { BackButton, Options } from "../engComponents/Index";
import PdfButton from "../components/pdfButton";
import LearnMore from "../screens/Learnmore";
import { EngButton, FarmBackButton, HeaderIcons } from "../components";
import YoutubeScreen from "../components/youtube";
import Success from "../engScreens/Jazzcash/Success";
import { notifications, tokenWithId } from "../redux/action";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function EngMain() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenInStorage, setTokenInStorage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [initialRoute, setInitialRoute] = useState("EngHomeTab");
  const [loading, setLoading] = useState(false);

  let token = useSelector((state) => state.api.token);

 
  useEffect(() => {
    if (!notification) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [notification]);

  // token checker
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
    if (token == null) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style="large" color={"yellow"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {loggedIn == false ? (
        <Stack.Navigator initialRouteName="Prelogin">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Prelogin"
            component={Prelogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPin"
            component={LoginPin}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Information"
            component={Information}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="EngHomeTab"
            component={EngHomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ElementsView"
            component={ElementsView}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: route.params?.title ? route.params?.title : "Mandi Rates",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerBackVisible: false,
              headerLeft: () => <BackButton />,
            })}
          />
          <Stack.Screen
            name="Notification"
            component={Notifications}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Notifications",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerBackVisible: false,
              headerLeft: () => <BackButton />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="GeneralNotification"
            component={GeneralNotification}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "General Notification",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SubBenefits"
            component={SubBenefits}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Features",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="PackageDetails"
            component={PackageDetails}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Packages",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="FarmExample"
            component={FarmExample}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Dummy Farm",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Weather",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="BuyPackage"
            component={BuyPackage}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Buy Package",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="JazzCash"
            component={JazzCash}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "JazzCash",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="NewFarm"
            component={NewFarm}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Farm",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
              headerRight: () => <HeaderIcons />,
            }}
          />
          <Stack.Screen
            name="FarmDetails"
            component={FarmDetails}
            options={{
              headerTintColor: COLORS.white,
              headerStyle: { backgroundColor: COLORS.green },
              title: "Farm",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SubscribedFarm"
            component={SubscribedFarm}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: `${route.params?.name} - ${route.params?.area} `,
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerRight: () => <Options />,
            })}
          />
          <Stack.Screen
            name="FarmFullReport"
            component={FarmFullReport}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "Report",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerRight: () => <PdfButton />,
            })}
          />
          <Stack.Screen
            name="AllFarmers"
            component={AllFarmers}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "Farmers",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
            })}
          />
          <Stack.Screen
            name="Farmer"
            component={AddFarmer}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "Farmers",
              headerTitleStyle: {
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
            })}
          />
          <Stack.Screen
            name="JazzcashSuccess"
            component={JazzcashSuccess}
            options={({}) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={({}) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="FarmDuplication"
            component={FarmDuplication}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "Farm Duplication",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerStyle: { backgroundColor: COLORS.green },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
            })}
          />
          <Stack.Screen
            name="LearnMore"
            component={LearnMore}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "LearnMore",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: { backgroundColor: COLORS.green },
              // headerBackVisible: false,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: COLORS.green,
              },
            })}
          />
          <Stack.Screen
            name="YoutubeScreen"
            component={YoutubeScreen}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "Tutorial",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "PoppinsMedium",
                fontSize: 16,
              },
              headerStyle: { backgroundColor: COLORS.green },
              // headerBackVisible: false,
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: COLORS.green,
              },
            })}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function EngHomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.green,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "PoppinsMedium",
            fontSize: 12,
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Farm"
        component={Farm}
        options={{
          tabBarLabel: "Farm",
          tabBarLabelStyle: {
            fontFamily: "PoppinsMedium",
            fontSize: 12,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="palm-tree" size={20} color={color} />
          ),
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green },
          title: "Farm",
          headerTitleStyle: {
            fontFamily: "PoppinsBold",
            fontSize: 16,
          },
          headerTitleAlign: "center",
          // headerRight: () => <FarmBackButton />,
          // headerLeft: () => (
          //   <PkgButton color={COLORS.green} backgroundColor={COLORS.white} />
          // ),
          // headerLeft:()=> <FarmBackButton />
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: "Menu",
          tabBarLabelStyle: {
            fontFamily: "PoppinsMedium",
            fontSize: 12,
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="menu" size={20} color={color} />
          ),
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green },
          title: "Menu",
          headerTitleStyle: {
            fontFamily: "PoppinsMedium",
            fontSize: 16,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View style={{ marginHorizontal: 10 }}>
              <EngButton color={COLORS.green} backgroundColor={"white"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default EngMain;
