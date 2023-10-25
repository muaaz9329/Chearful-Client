import { FlatList, Image, View } from 'react-native';
import { AppText, BaseCard, Heading } from '@app/components';
import { Colors } from '@app/constants';

const data = [
  {
    title: 'Mental Fitness Screener',
    description:
      'Complete a short questionnaire that will help you identify your level of mental fitness today',
    imgSrc: require('../../../assets/images/how-challenge-works-1.png'),
  },
  {
    title: 'Complete Your Challenges',
    description: 'Every day you will have a choice from 3 different challenges',
    imgSrc: require('../../../assets/images/how-challenge-works-2.png'),
  },
  {
    title: 'Monitor Your Growth',
    description:
      'Retake the Mental Fitness Screener to see how much you have learned through the 30 days',
    imgSrc: require('../../../assets/images/how-challenge-works-3.png'),
  },
];

export default function ChallengeWorking() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ChallengeWorkingCard {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 18 }} />}
    />
  );
}

const ChallengeWorkingCard = ({
  title,
  description,
  imgSrc,
}: (typeof data)[0]) => {
  return (
    <BaseCard style={{ backgroundColor: '#FAFAFA' }}>
      <Image
        source={imgSrc}
        style={{
          width: '100%',

          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
      <Heading size="md" style={{ color: '#425151', marginVertical: 15 }}>
        {title}
      </Heading>
      <AppText style={{ color: Colors.dim }}>{description}</AppText>
    </BaseCard>
  );
};
