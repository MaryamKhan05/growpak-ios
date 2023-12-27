import React from "react";
import { View, ScrollView } from "react-native";
import { SubCard } from "../../engComponents/Index";

const SubBenefits = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubCard
          heading=""
          caption="Stay updated on your farm's moisture content and water levels"
          image={require("../../../assets/plants.png")}
        />
        <SubCard
          heading="Analysis of soil organic carbon"
          caption=" Indicates areas with Nutrient needs and problems in the farm"
          image={require("../../../assets/plantsoil.png")}
        />
        <SubCard
          heading="Fertilizer recommendations"
          caption="Use the best mix of fertilizers to minimize input costs and maximize yield"
          image={require("../../../assets/fertilizer.png")}
        />
        <SubCard
          heading="Plant Health Analysis"
          caption="Analyze the health of your crop regularly"
          image={require("../../../assets/botany.png")}
        />
      </ScrollView>
    </View>
  );
};

export default SubBenefits;
