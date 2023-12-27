import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";


const TextToSpeech = () => {
  const [audioBase64, setAudioBase64] = useState(null);
 


  return (
    <View>
      <Text>Text to speech</Text>
      <Button title="Play"/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TextToSpeech;
