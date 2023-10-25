import AppText from "@app/common/components/app-text";
import BaseCard from "@app/common/components/base-card";
import Heading from "@app/common/components/heading";
import { AppColors } from "@app/constants";
import { FlatList, ImageBackground, View } from "react-native";

const data = [
  {
    bgSrc: require("../../../assets/images/green-openbrain.png"),
    title: "Focused on You",
    description:
      "Commit to completing the Challenges Every Day and Reflect on your thoughts, Emotions and Behaviors.",
  },
  {
    bgSrc: require("../../../assets/images/layered-yoga.png"),
    title: "Follow Your Community",
    description: `Let us Win over Mental Fatigue. Celebrate Your Victory Over Challenges. Show Self-Compassion & Love`,
  },
  {
    bgSrc: require("../../../assets/images/layered-hands.png"),
    title: "Find Your Strength",
    description: `Commit to completing the Challenges`,
  },
  {
    bgSrc: require("../../../assets/images/yellow-openbrain.png"),
    title: "FREE to Register",
    description: `FREE to Register, Participate, And Grow. Exciting Prizes to be won!`,
  },
];

export default function ChallengeAttributes() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ChallengeAttributeCard {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
    />
  );
}

const ChallengeAttributeCard = (props: (typeof data)[0]) => {
  return (
    <ImageBackground
      source={props.bgSrc}
      imageStyle={{
        borderRadius: 20,
      }}
    >
      <BaseCard
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Heading size="md" style={{ marginBottom: 8 }}>
          {props.title}
        </Heading>
        <AppText>{props.description}</AppText>
      </BaseCard>
    </ImageBackground>
  );
};
