export const DeserializeTags = (tags: FeelingTag[]) => {
  const returnTags: { title: string; id: number }[] = [];
  tags.map((item, index) => {
    returnTags.push({ title: item.title, id: item.id });
  });
  return returnTags;
};

export const convertDateFormat = (inputDate:string) => {
  const parts = inputDate.split(' ');
  const day = parts[1];
  const month = parts[2];
  const year = parts[3];

  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  // @ts-ignore

  const monthNumber = monthMap[month];

  return `${year}-${monthNumber}-${day}`;
};