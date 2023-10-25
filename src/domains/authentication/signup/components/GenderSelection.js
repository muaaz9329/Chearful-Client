import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MaleIcon, FemaleIcon, OtherIcon } from "@svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Fonts } from "@constants/Fonts";
import { DataRendering } from "@helper/customFunction";
import { Wp } from "@app/helper/CustomResponsive";
const GenderSelection = ({HandleForm , deviceType ='mobile'}) => {
  const gender = ["male", "female", "others"];
  const SelectedDesign = {
    cont: {
      backgroundColor: "#1E5542",
    },
    text: {
      color: "white",
    },
  };
  const UnselectedDesign = {
    cont: {
      backgroundColor: "#EFF3F2",
    },
    text: {
      color: "#1E5542",
    },
  };
  const intailState = DataRendering(gender);
  const [design, setDesign] = useState([
    UnselectedDesign,
    UnselectedDesign,
    UnselectedDesign,
  ]);
  const [value, setValue] = useState(""); // this state consist of the user selected gender
  const [selectedItem, SetSelected] = useState(intailState); // * this state is used to have make the button toggle and assignning the data to the userSelec state

  useEffect(()=>{
    
      HandleForm(value , 'gender')
    
  },[value])
  const StateChanging = (index) => {
    // this function changes the design and assigns the use selection to value state

    if (index === 0) {
      if (selectedItem[index].isSelected === false) {
        design[index] = SelectedDesign;
        setDesign([...design]);
        design[index + 1] = UnselectedDesign;
        design[index + 2] = UnselectedDesign;
        setDesign([...design]);
        setValue(gender[index]);
        selectedItem[index].isSelected = true;
        selectedItem[index + 1].isSelected = false;
        selectedItem[index + 2].isSelected = false;
        SetSelected([...selectedItem]);
      } else {
        design[index] = UnselectedDesign;
        setDesign([...design]);
        design[index + 1] = UnselectedDesign;
        design[index + 2] = UnselectedDesign;
        setDesign([...design]);
      setValue("")
        selectedItem[index].isSelected = false;
        selectedItem[index + 1].isSelected = false;
        selectedItem[index + 2].isSelected = false;
        SetSelected([...selectedItem]);
      }
    } else if (index === 1) {
      if (selectedItem[index].isSelected === false) {
        design[index] = SelectedDesign;
        setDesign([...design]);
        design[index - 1] = UnselectedDesign;
        design[index + 1] = UnselectedDesign;
        setDesign([...design]);
        setValue(gender[index]);
        selectedItem[index].isSelected = true;
        selectedItem[index + 1].isSelected = false;
        selectedItem[index - 1].isSelected = false;
        SetSelected([...selectedItem]);
      } else {
        design[index] = UnselectedDesign;
        setDesign([...design]);
        design[index - 1] = UnselectedDesign;
        design[index + 1] = UnselectedDesign;
        setDesign([...design]);
      setValue("")
        selectedItem[index].isSelected = false;
        selectedItem[index + 1].isSelected = false;
        selectedItem[index - 1].isSelected = false;
        SetSelected([...selectedItem]);
      }
    } else if (index === 2) {
      if (selectedItem[index].isSelected === false) {
        design[index] = SelectedDesign;
        setDesign([...design]);
        design[index - 1] = UnselectedDesign;
        design[index - 2] = UnselectedDesign;
        setDesign([...design]);
        setValue(gender[index]);
        selectedItem[index].isSelected = true;
        selectedItem[index - 1].isSelected = false;
        selectedItem[index - 2].isSelected = false;
        SetSelected([...selectedItem]);
      } else {
        design[index] = UnselectedDesign;
        setDesign([...design]);
        design[index + 1] = UnselectedDesign;
        design[index + 2] = UnselectedDesign;
        setDesign([...design]);
      setValue("")
        selectedItem[index].isSelected = false;
        selectedItem[index - 1].isSelected = false;
        selectedItem[index - 2].isSelected = false;
        SetSelected([...selectedItem]);
      }
    }
  };

  return (
    <View style={[styles.MainCont, deviceType==='tablet'&&{
   
      width:widthPercentageToDP(55),
    }]}>
      <Pressable
        style={[styles.genderBtn, design[0].cont , deviceType==='tablet'&&styles.genderBtn_Tablet]}
        onPress={() => StateChanging(0)}
      >
        <View style={styles.btnCont}>
          <MaleIcon
            width={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            height={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            color={design[0].text.color}
          />
          <Text style={[styles.btnText, design[0].text , deviceType==='tablet'&&{
            fontSize:Wp(8)
          }]}>Male</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.genderBtn, design[1].cont,deviceType==='tablet'&&styles.genderBtn_Tablet]}
        onPress={() => StateChanging(1)}
      >
        <View style={styles.btnCont}>
          <FemaleIcon
            width={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            height={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            color={design[1].text.color}
          />
          <Text style={[styles.btnText, design[1].text,deviceType==='tablet'&&{
            fontSize:Wp(8)
          }]}>Female</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.genderBtn, design[2].cont,deviceType==='tablet'&&styles.genderBtn_Tablet]}
        onPress={() => StateChanging(2)}
      >
        <View style={styles.btnCont}>
          <OtherIcon
            width={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            height={deviceType==='tablet'?Wp(22):wp(2.45 * 3.2)}
            color={design[2].text.color}
          />
          <Text style={[styles.btnText, design[2].text , deviceType==='tablet'&&{
            fontSize:Wp(8)
          }]}>Other</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GenderSelection;

const styles = StyleSheet.create({
  genderBtn_Tablet: {
    width: Wp(60),
    height: Wp(60),
  },
  MainCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderBtn: {
    width: wp(2.45 * 10.4),
    height: wp(2.45 * 9.6),
    backgroundColor: "#1E5542",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp(2.45 * 0.15),
    borderColor: "#EFF3F2",
  },
  btnText: {
    marginTop: hp(1.45 * 0.5),
    color: "white",
    fontFamily: Fonts.Mulish.Bold,
  },
  btnCont: {
    justifyContent: "center",
    alignItems: "center",
  },
});
