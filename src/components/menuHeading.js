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
        fontWeight:'600',
        fontSize:14,
        fontFamily:'NotoSemi',
        color:COLORS.disableBlack,
        marginTop:15,
        marginBottom:8,
        textAlign:'right',
        marginRight:12
    }
})


export default MenuHeading