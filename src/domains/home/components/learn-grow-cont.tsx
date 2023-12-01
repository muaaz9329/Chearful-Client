import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LearnAndGrowCard from '../../consumer-contents/domains/learn-grow/components/learn-grow-card';
import { LearnAndGrowCardType } from '../../consumer-contents/domains/learn-grow/types';
import ContentService from '../../consumer-contents/service';

const LearnAndGrowCont = () => {
  const navigation = useNavigation();
  const [resources, setResources] = useState<LearnAndGrowCardType[]>([]);

  useEffect(() => {
    ContentService.getResources({
      onSuccess: (res) => {
        setResources(res.data?.ailments);
      },
      onFailure: (err) => {
        console.log(err);
      },
      data: [
        {
          key: 'page',
          value: 1,
        },
        //! this key is must as these represents the items that are specified by varun to show on home screen
        //* Only Works on Production that's why on dev it shows empty array
        {
          key: 'home',
          value: 1,
        },
      ],
    });
  }, []);

  return (
    <FlatList
      data={resources}
      renderItem={({ item }) => (
        <LearnAndGrowCard data={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LearnAndGrowCont;
