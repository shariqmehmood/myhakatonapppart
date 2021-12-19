import React from "react";
import { StyleSheet,ScrollView, TouchableOpacity, Button, TextInput, Text,Image, View, Touchable, _ScrollView } from 'react-native';
import khana from "../../img/khana.png"
export default function BranchManager(){

    return(

        <View>
        <Text style={{color:"#44444",textAlign:"center"}}>
            BranchManager
        </Text>
        <Image style={{height:400,width:400}}source={khana}></Image>




    </View>
        )
}