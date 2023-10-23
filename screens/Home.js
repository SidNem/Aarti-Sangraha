import React from "react";
import { Text, View, FlatList } from "react-native";
import { sampleEventData } from "./Event_List";
import Card from "./components/Card";
function Home() {
  return (
    <View>
     <FlatList 
     keyExtractor={(ele)=>ele.location}
     data={sampleEventData} 
     renderItem={({item})=>{
      return <Card name={item.name} imageSource={item.event_poster} startDate={item.start_date} endDate={item.end_date}/>
     }}
     />
    </View>
  );
}

export default Home;
