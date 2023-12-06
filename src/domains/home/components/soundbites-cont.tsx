import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ContentService from '@app/domains/consumer-contents/service';
import SoundBitesCard from '../../consumer-contents/domains/sound-bites/components/sound-bite-card';

const SoundbitesCont = () => {
  const [soundbites, setSoundbites] = useState<ISoundBitesDetail[]>([]);
  useEffect(() => {
    ContentService.getSoundBites({
      onSuccess: (res) => {
        setSoundbites(res.data.soundbites);
      },
      onFailure: (err) => {
        console.log(err);
      },
      data: [
        {
          key: 'page',
          value: 1,
        },
        {
          key: 'limit',
          value: 5,
        },
      ],
    });
  }, []);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {soundbites.map((item, index) => (
        <SoundBitesCard key={index} data={item} style="Home Design" />
      ))}
    </ScrollView>
  );
};

export default SoundbitesCont;
