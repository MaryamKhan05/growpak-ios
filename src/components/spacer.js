import React from "react";
import { View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Spacer =()=>{
    return(
        <View
        style={{
            marginTop:hp('20')
        }}
         >

        </View>
    )
}

export default Spacer