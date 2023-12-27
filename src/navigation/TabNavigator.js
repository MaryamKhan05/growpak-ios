import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Home, Login } from "../screens/index";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
