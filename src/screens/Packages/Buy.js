import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Buy = () => {
  const [phone, setPhone] = useState();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>text input from react native</Text>
      <TextInput
        placeholder="Type something"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={{ borderWidth: 1, padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Buy;
