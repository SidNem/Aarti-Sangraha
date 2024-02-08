import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { React, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function formatDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = inputDate.split("-");
  if (dateParts.length === 3) {
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];
    if (flag == 0) {
      return `${day} ${month} - `;
    } else {
      return `${day} ${month} ${year}`;
    }
  } else {
    // Handle invalid input date
    return "Invalid Date";
  }
}

const Card = (props) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  console.log(props.imageSource)

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <TouchableOpacity
        style={styles.CardStyle}
        onPress={() => {
          Alert.alert("Welcome", `${props.name}+${props.imageSource}`, [
            { text: "OK" },
          ]);
        }}
      >

        <View style={{width:"100%",height:"100%"}}>
        <Image
          //source={{ uri: props.imageSource }}
          source = {require('./1.png')}
          style={styles.imageStyle}
          onError={(error) => {
            console.error("Image load error:", error);
            <MaterialIcons
              name="broken-image"
              size={24}
              color="black"
              style={styles.imageStyle}
            />;
          }}
        />
        </View>
       

        <View
          style={{
            marginTop: 10,
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.textStyle}>Event Name: {props.name}</Text>
            <Text style={styles.textStyle}>
              {formatDate(props.startDate, 0)}
              {formatDate(props.startDate, 1)}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleLike}>
              {liked ? (
                <FontAwesome name="heart" size={24} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={24} color="red" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CardStyle: {
    flex: 1,
    backgroundColor: "#e1e8d3",
    height: 220,
    elevation: 5,
    borderColor: "black",
    borderRadius: 10,
  },
  imageStyle: {
    width:'100%',height:'100%',
    alignSelf: "flex-start",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: "cover",
    aspectRatio:1,
  },
  textStyle: {
    marginLeft: 10,
  },

  iconContainer: {
    paddingRight: 70,
    paddingTop: 9,
  },
});

export default Card;
