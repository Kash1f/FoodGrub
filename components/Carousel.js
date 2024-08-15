import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";


const Carousel = () => {
  const images = [
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/lhnwo9ezxo7mpkpvtdcy",
  ];

  return (
    <View>
      <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
      {images.map((image,index)=>(
          <Pressable style={{marginHorizontal:5, backgroundColor:"white"}} key={index}>
            <Image source={{uri:image.image}} style={{width:350, height:200,  borderRadius:8}}/>

           

          </Pressable>
           ))}
      </ScrollView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});