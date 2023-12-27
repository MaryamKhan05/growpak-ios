import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import COLORS from "../../assets/colors/colors";

const AudioPlayer = (props) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const progress = duration > 0 ? position / duration : 0;

  const playSound = async () => {
    try {
      if (!sound) {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync({
          // uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          uri:props.url,
          // uri:"http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
        });
        setSound(sound);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isPlaying) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
        });

        console.log("Playing Sound");
        await sound.playAsync();
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.error("Error occurred while playing sound:", error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setSound(null);
        }
      : undefined;
  }, [sound]);

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onSeek = async (newValue) => {
    const newPosition = Math.min(1, Math.max(0, newValue)) * duration;
    await sound.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flexDirection: "row",
        width: wp(82),
        padding: hp(1),
        borderRadius: hp(10),
        shadowColor: COLORS.disableBlack,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        // position: "absolute",
        top: hp(-3),
        // marginBottom: hp(5),
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.green,
          borderRadius: 50,
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={playSound}
      >
        {isPlaying ? (
          <FontAwesome
            name="pause"
            size={hp(3)}
            color={COLORS.white}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <FontAwesome
            name="play"
            size={hp(3)}
            color={COLORS.white}
            style={{ alignSelf: "center" }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          onValueChange={onSeek}
          minimumTrackTintColor={COLORS.green}
          maximumTrackTintColor={COLORS.arrowbg}
          thumbTintColor={COLORS.green}
          trackStyle={{ height: 50, backgroundColor: "red" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  slider: {
    width: wp(60),
  },
});

export default AudioPlayer;
