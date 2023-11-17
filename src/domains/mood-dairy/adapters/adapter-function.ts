export const DeserializeTags = (tags: FeelingTag[]) => {
  const returnTags: { title: string; id: number }[] = [];
  tags.map((item, index) => {
    returnTags.push({ title: item.title, id: item.id });
  });
  return returnTags;
};
