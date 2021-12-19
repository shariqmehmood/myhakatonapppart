


import MapView, { Marker, google } from 'react-native-maps';
import { StyleSheet, Text,TouchableOpacity, View, Dimensions, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import khana from "../../img/khana.png"


let LocationFoodBank = [
  {
    "branch_name": "Aliabad",
    "latitude": 24.9200172,
    "longitude": 67.0612345
  },
  {
    "branch_name": "Numaish chowrangi",
    "latitude": 24.8732834,
    "longitude": 67.0337457
  },
  {
    "branch_name": "Saylani house phase 2",
    "latitude": 24.8278999,
    "longitude": 67.0688257
  },
  {
    "branch_name": "Touheed commercial",
    "latitude": 24.8073692,
    "longitude": 67.0357446
  },
  {
    "branch_name": "Sehar Commercial",
    "latitude": 24.8138924,
    "longitude": 67.0677652
  },
  {
    "branch_name": "Jinnah avenue",
    "latitude": 24.8949528,
    "longitude": 67.1767206
  },
  {
    "branch_name": "Johar chowrangi",
    "latitude": 24.9132328,
    "longitude": 67.1246195
  },
  {
    "branch_name": "Johar chowrangi 2",
    "latitude": 24.9100704,
    "longitude": 67.1208811
  },
  {
    "branch_name": "Hill park",
    "latitude": 24.8673515,
    "longitude": 67.0724497
  }
]

export default function MyMap({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // console.log('a',LocationFoodBank)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log(location.coords.latitude, 'latitude');
      console.log(location, 'location');
    })();
  }, []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }




  return (




    <View style={styles.container}>

      <Image style={{ height: 100, marginTop: -50, width: 100 }} source={khana}></Image>



      {location ? (




        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

          }}
        >

          {LocationFoodBank.map((location, i) => {


            let { branch_name, longitude, latitude } = location
            return (
              <View key={longitude + branch_name}>

                <Marker
                  coordinate={{
                    latitude,
                    longitude,
                    icon: "https://saylani-welfare-uk.netlify.app/images.png",
                    color: 'green'
                  }}
                />





              </View>
            )

          })}
        </MapView>) : null}
        <TouchableOpacity>

      <Text style={{ color: "white",backgroundColor:"green",width:500, textAlign: "center", fontSize: 30, }} onPress={()=>{navigation.navigate("NeedyPeoPleForm")}}>Go-To-Form</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 500
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    height: 500
  },
});