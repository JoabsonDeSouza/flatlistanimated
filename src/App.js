import React, { useState } from "react";
import {
  Text,
  Animated,
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("window");

const data = [
  { name: "Coringa", image: require("./assets/image2.jpg") },
  { name: "Homem Aranha", image: require("./assets/image1.jpg") },
  { name: "Yoda", image: require("./assets/image3.jpg") },
  { name: "DeadPool", image: require("./assets/image4.jpg") },
  { name: "Darth Vader", image: require("./assets/image5.jpg") },
  { name: "Vingadores", image: require("./assets/image6.jpg") },
];

const ITEM_WIDTH = width - 120;
const ITEM_HEIGHT = height / 2;

export default function App() {
  const [scrollX] = useState(new Animated.Value(0));

  const inputRange = [0, ITEM_WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [0, -width],
  });

  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: ["#fff", "#000"],
  });

  const renderItem = ({ item, index }) => {
    const translateY = scrollX.interpolate({
      inputRange: [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ],
      outputRange: [0.8, 1.1, 0.8],
    });

    const changeImageX = scrollX.interpolate({
      inputRange: [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH],
      outputRange: [-100, 0],
    });

    return (
      <Animated.View
        key={index + 1 + "ll"}
        style={{
          marginLeft: index == 0 ? (width - ITEM_WIDTH) / 2 : 0,
          marginRight: index == data.length - 1 ? (width - ITEM_WIDTH) / 2 : 0,
          paddingHorizontal: 10,
          height: ITEM_HEIGHT,
          borderRadius: 8,
          overflow: "hidden",
          alignSelf: "center",
          width: ITEM_WIDTH,
          transform: [{ scaleX: translateY }, { scaleY: translateY }],
        }}
      >
        <Animated.Image
          style={{
            transform: [{ translateX: changeImageX }],
            flex: 1,
            width: "100%",
            borderRadius: 6,
          }}
          source={item.image}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            right: 0,
            left: 0,
            paddingHorizontal: 30,
            height: 120,
          }}
        >
          <Text
            style={{
              color: "#fff",
              marginTop: 10,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: width / 5,
          backgroundColor: "#222634",
          transform: [{ translateX: translateX }],
        }}
      />

      <View style={{ marginTop: 60, marginLeft: 60 }}>
        <Animated.Text
          style={{ color: backgroundColor, fontWeight: "bold", fontSize: 16 }}
        >
          Programadorzao
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, { color: backgroundColor }]}>
          FlatList Animated
        </Animated.Text>
      </View>
      <Animated.FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => item.name + index}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate={0.2}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  subTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 30,
  },
});
