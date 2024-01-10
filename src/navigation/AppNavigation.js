import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

//internal imports
import {
  Onboarding,
  Login,
  Prelogin,
  Signup,
  Otp,
  Loginpin,
  Info,
  PersonalInfo,
  ForgotPassword,
  CreateAccount,
  Home,
  Menu,
  Farm,
  Transaction,
  NewFarm,
  FarmDetails,
  Farmer,
  SubBenefits,
  AllFarmers,
  Packages,
  BuyPackages,
  SubscribedFarm,
  FarmExample,
  FarmFullUrduReport,
  ElementsView,
  Notification,
  JazzcashSuccess,
  GeneralNotification,
  Weather,
  FarmDuplication,
} from "../screens/index";
import COLORS from "../../assets/colors/colors";
import {
  EngButton,
  BackButton,
  HeaderIcons,
  FarmBackButton,
  Options,
} from "../components/index";
import JAZZCASH from "../screens/JazzCash/JazzcashScreen";
import PackageDetails from "../screens/Packages/PackageDetails";
import YoutubeScreen from "../components/youtube";
import LearnMore from "../screens/Learnmore";
import PdfButton from "../components/pdfButton";
import { notifications } from "../redux/action";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function Main() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState("HomeTab");
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState(null);

  let token = useSelector((state) => state.api.token);

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

  // notification code

  useEffect(() => {
    const handleNotificationResponse = (response) => {
      console.log(
        "Notification Response:",
        response?.notification?.request?.content?.data?.type
      );
      setRoute(response?.notification?.request?.content?.data?.type);
    };

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (route) {
      setLoading(true);
      if (route == "Notification") {
        dispatch(notifications());
        setInitialRoute("Notification");
      }
      if (route == "Mandi") {
        setInitialRoute("ElementsView");
      }
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [route]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style="large" color={COLORS.green} />
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
            name="Loginpin"
            component={Loginpin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={initialRoute}>
          <HomeStack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="Notification"
            component={Notification}
            options={({ route }) => ({
              title: "اطلاع",
              headerTitleAlign: "center",
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="SubBenefits"
            component={SubBenefits}
            options={{
              headerTitleAlign: "center",
              title: "فوائد",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />
          <HomeStack.Screen
            name="Transaction"
            component={Transaction}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="NewFarm"
            component={NewFarm}
            options={{
              headerTitleAlign: "center",
              title: " کھیت  ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },

              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
              headerLeft: () => <HeaderIcons />,
            }}
          />
          <HomeStack.Screen
            name="FarmDetails"
            component={FarmDetails}
            options={{
              headerTitleAlign: "center",
              title: " کھیت کی تفصیل",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />
          <HomeStack.Screen
            name="Farmer"
            component={Farmer}
            options={{
              headerTitleAlign: "center",
              title: "  کسان شامل کریں ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />

          <HomeStack.Screen
            name="AllFarmers"
            component={AllFarmers}
            options={{
              headerTitleAlign: "center",
              title: "کسان",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />

          <HomeStack.Screen
            name="BuyPackages"
            component={BuyPackages}
            options={{
              headerTitleAlign: "center",
              title: "پیکیج خریدیں ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />
          <HomeStack.Screen
            name="SubscribedFarm"
            component={SubscribedFarm}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: ` ${route.params?.area} - ${route.params?.name}`, //ایکڑ
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
              // headerTitleAlign: "right",
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
              headerLeft: () => <Options />,
            })}
          />
          <HomeStack.Screen
            name="FarmExample"
            component={FarmExample}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: " فرضی فارم",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="FarmFullReport"
            component={FarmFullUrduReport}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "فارم رپورٹ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
              headerLeft: () => <PdfButton />,
            })}
          />
          <HomeStack.Screen
            name="ElementsView"
            component={ElementsView}
            options={({ route }) => ({
              title: route.params?.title ? route.params?.title : "منڈی ریٹس",
              headerTitleAlign: "center",
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
              headerRight: () => <BackButton />,
            })}
          />

          <HomeStack.Screen
            name="JazzcashSuccess"
            component={JazzcashSuccess}
            options={({ route }) => ({
              headerShown: false,
              headerTitleAlign: "center",
              title: route.params?.title,
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="GeneralNotification"
            component={GeneralNotification}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "عام اطلاع",
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="Weather"
            component={Weather}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: " موسم",
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="Jazzcash"
            component={JAZZCASH}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: " JazzCash",
              headerTitleStyle: {
                color: COLORS.white,
                // fontFamily: "CustomFont",
                fontSize: 18,
                fontWeight: "400",
              },
              headerStyle: { backgroundColor: COLORS.green },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="Packages"
            component={Packages}
            options={{
              headerTitleAlign: "center",
              title: "پیکیجز ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />
          <HomeStack.Screen
            name="PackageDetails"
            component={PackageDetails}
            options={{
              headerTitleAlign: "center",
              title: "پیکیجز ",
              headerTitleStyle: {
                color: COLORS.white,
                fontFamily: "CustomFont",
                fontSize: 28,
                fontWeight: "400",
              },
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerRight: () => <BackButton />,
            }}
          />
          <HomeStack.Screen
            name="YoutubeScreen"
            component={YoutubeScreen}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "فارم شامل کریں",
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
            name="LearnMore"
            component={LearnMore}
            options={({ route }) => ({
              headerTitleAlign: "center",
              title: "مزید جانیئے",
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
              headerRight: () => <BackButton />,
            })}
          />
          <HomeStack.Screen
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
              headerRight: () => <BackButton />,
            })}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.green,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: "مینو",
          tabBarLabelStyle: {
            fontFamily: "NotoBold",
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="menu" size={size} color={color} />
          ),
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green },
          title: "مینو ",
          headerTitleStyle: {
            fontFamily: "CustomFont",
            fontSize: 32,
            fontWeight: "400",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <View style={{ marginHorizontal: 10 }}>
              <EngButton color={COLORS.white} backgroundColor={"#00000014"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Farm"
        component={Farm}
        options={{
          tabBarLabel: "کھیت ",
          tabBarLabelStyle: {
            fontFamily: "NotoBold",
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="palm-tree"
              size={size}
              color={color}
            />
          ),
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green },
          title: "کھیت ",
          headerTitleStyle: {
            fontFamily: "CustomFont",
            fontSize: 32,
            fontWeight: "400",
          },
          headerTitleAlign: "center",
          headerRight: () => <FarmBackButton />,
          // headerLeft: () => (
          //   <PkgButton color={COLORS.green} backgroundColor={COLORS.white} />
          // ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "ڈیش بورڈ",
          tabBarLabelStyle: {
            fontFamily: "NotoBold",
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
