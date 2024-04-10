import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import CarouselItem from "./CarouselItem";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

interface FlatlistAnimeProps {}
const { width } = Dimensions.get("screen");
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

function FlatlistAnime(props: FlatlistAnimeProps): JSX.Element {
  const scrollXIndex1 = useSharedValue(0);

  const [data, setData] = useState(DATA);

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd((e) => {
      if (scrollXIndex1.value < data.length - 1) scrollXIndex1.value += 1;
    });
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((e) => {
      if (scrollXIndex1.value > 0) scrollXIndex1.value -= 1;
    });

  return (
    <GestureDetector gesture={flingLeft}>
      <GestureDetector gesture={flingRight}>
        <View style={styles.container}>
          <FlatList
            data={data}
            horizontal
            inverted={true}
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              height: ITEM_HEIGHT + 200,
              top: 50,
              left: 20,
              paddingTop: 100,
            }}
            keyExtractor={(_, index) => String(index)}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                {
                  zIndex: data.length - index, //this line does not work
                  elevation: data.length - index,
                },
              ];
              return (
                <View {...props} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => (
              <CarouselItem
                item={item}
                index={index}
                scrollXIndex={scrollXIndex1}
              />
            )}
          />
        </View>
      </GestureDetector>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default FlatlistAnime;

const DATA = [
  {
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://images.unsplash.com/photo-1580130718810-358e5e8af61b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZpbnRhZ2UlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Jungle Party",
    location: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
      "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmludGFnZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "4th Of July",
    location: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
      "https://images.unsplash.com/photo-1580130718646-9f6942092ad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZpbnRhZ2UlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://img.freepik.com/free-vector/poster-design-with-illustration-paparazzi-equipment_1284-46550.jpg?size=626&ext=jpg&ga=GA1.1.1742455857.1711557277&semt=ais",
  },
  {
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://img.freepik.com/free-vector/vintage-poster-with-illustration-indian-man-totem-wigwam_1284-47897.jpg?size=626&ext=jpg&ga=GA1.1.1742455857.1711557277&semt=ais",
  },
  {
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://img.freepik.com/free-vector/vintage-poster-with-illustration-bucket-with-paint-brushes_1284-47868.jpg?size=626&ext=jpg&ga=GA1.1.1742455857.1711557277&semt=ais",
  },
];
