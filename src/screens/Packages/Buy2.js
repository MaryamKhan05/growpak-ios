import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const BuyTwo = () => {
  const [phone, setPhone] = useState();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>text input from react native paper </Text>
      <TextInput
        placeholder="Type something"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BuyTwo;
