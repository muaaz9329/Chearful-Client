// import { Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
// import ContentService from '../../service';

// const SoundbitesCont = () => {
//   const [soundbites, setSoundbites] = useState<ISoundBitesDetail[]>([]);
//   useEffect(() => {
//     ContentService.getSoundBites({
//       onSuccess: (res) => {
//         setSoundbites(res.data.soundbites);
//       },
//       onFailure: (err) => {
//         console.log(err);
//       },
//       data: [
//         {
//           key: 'page',
//           value: 1,
//         },
//         {
//           key: 'limit',
//           value: 5,
//         },
//       ],
//     });
//   }, []);

//   return (
//     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//       {soundbites.map((item, index) => (
//         <View>
//           <Text>{item.title}</Text>
//         </View>
//         // <SoundbitesCard key={index} data={item} style="Home Design" />
//       ))}
//     </ScrollView>
//   );
// };

// export default SoundbitesCont;
