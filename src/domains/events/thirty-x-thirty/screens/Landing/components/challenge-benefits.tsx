import { AppText, BaseCard, Heading } from '@app/components';
import { Colors } from '@app/constants';
import { FlatList, Image, Text, View } from 'react-native';

const benefits = [
  {
    title: 'Win Over Mental Fatigue',
    description:
      'The Challenges: help you practice positive, ways you can structure your thoughts, clear your mind and embed healthy habits',
    benefit:
      'Learn to manage stress, worries, anxiety before it overtakes you, and achieve your goals',
  },

  {
    title: 'Celebrate Victory Over Challenges ',
    description:
      'The Challenges: You’ll be able to identify your triggers, and understanding them will help you learn how to manage negative thoughts & behaviors',
    benefit: 'Will help you make positive & healthy decisions and choices',
  },
  {
    title: 'Show Love for Yourself & Others',
    description:
      'The Challenges: Learn to show compassion, empathy and understanding towards yourself and your choices',
    benefit:
      'Having Self-love will help you become more resilient, confident and mentally stronger',
  },
];

export default function ChallengeBenefits() {
  return (
    <FlatList
      data={benefits}
      renderItem={({ item }) => <ChallengeBenefitCard {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
    />
  );
}

const ChallengeBenefitCard = (props: (typeof benefits)[0]) => {
  return (
    <BaseCard
      style={{
        backgroundColor: '#FAFAFA',
      }}
    >
      <Heading size="md" style={{ marginBottom: 8 }}>
        {props.title}
      </Heading>
      <AppText style={{ color: Colors.dim, marginBottom: 5 }}>
        {props.description}
      </AppText>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          backgroundColor: 'white',
          marginTop: 'auto',
          borderRadius: 15,
        }}
      >
        <Image
          source={require('../../../assets/images/medal-badge.png')}
          style={{ marginRight: 20 }}
        />
        <AppText
          style={{
            flex: 1,
            flexWrap: 'wrap',
            color: Colors.dim,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Benefit To You: </Text>
          {props.benefit}
        </AppText>
      </View>
    </BaseCard>
  );
};
