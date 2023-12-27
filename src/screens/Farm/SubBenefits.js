import React from "react";
import { View, ScrollView } from "react-native";
import { SubCard } from "../../components/index";

const SubBenefits = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubCard
          heading=""
          caption="اپنے فارم کی نمی کی مقدار اور پانی کی سطح کے بارے میں اپ    ڈیٹ رہیں"
          image={require("../../../assets/plants.png")}
        />
        <SubCard
          heading="مٹی کی نامیاتی کاربن کا تجزیہ"
          caption="فارم میں غذائیت کی ضروریات  اور مسائل
        والے علاقوں کی نشاندہی کرتا ہے   "
          image={require("../../../assets/plantsoil.png")}
        />
        <SubCard
          heading="کھادوں کی سفارشات"
          caption="ان پٹ لاگت کو کم کرنے اور زیادہ سے زیادہ پیداوار کے لیے کھادوں کا بہترین مرکب استعمال کریں"
          image={require("../../../assets/fertilizer.png")}
        />
        <SubCard
          heading="پودوں کی صحت کا تجزیہ"
          caption="اپنی فصل کی صحت کا باقاعدگی  سے تجزیہ کریں"
          image={require("../../../assets/botany.png")}
        />
      </ScrollView>
    </View>
  );
};

export default SubBenefits;
