import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from '../../components/Carousel';

const index = () => {

    const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
        "We are loading your location"
      );
      const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
    
      //useEffect is gonna run every once the home screen component loads, if there is nothing present inside the dep array[], its gonna run everytime the homescreen loads and everyonce when there is a state update inside the hs, if we include the [] dep array, this useEffect will run only once when the hs loads. useEffect will run jab hs loads and jab array dep ki value change hogi
    
      useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
      });
    
      const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          Alert.alert(
            "Location Services are not enabled",
            "Please enable the location services",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        } else {
          setlocationServicesEnabled(enabled);
        }
      };
    
      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Allow the app to use the location services",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        }
    
        //we are gonna get the coordinates once the permission is granted
        const { coords } = await Location.getCurrentPositionAsync(); //lg, lt of particular user
    
        // console.log(coords);
    
        if (coords) {
          const { latitude, longitude } = coords;
    
          //after getting the latitude and longitude we will to apply the reverse geocode method on the lat and long to get the exact location
    
          let response = await Location.reverseGeocodeAsync({
            //passing an object to this function i.e basically lat and long
            latitude,
            longitude,
          });
    
          // console.log(response);
    
          for (let item of response) {
            let address = `${item.name} ${item.city} ${item.postalCode}`;
            setdisplayCurrentAddress(address);
          }
        }
      };

  return (
    <View>
      <Text>index</Text>

      <Carousel/>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({})