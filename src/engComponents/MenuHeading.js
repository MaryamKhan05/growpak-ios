import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../assets/colors/colors";


const MenuHeading=(props)=>{
    return(
        <View>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    text:{
        fontSize:14,
        fontFamily:'PoppinsMedium',
        color:COLORS.disableBlack,
        marginTop:15,
        marginBottom:8,
        textAlign:'left',
        marginLeft:12
    }
})


export default MenuHeading