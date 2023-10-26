export type BottomSheetRef = {
  OpenDetail: () => void;
} | null;

export type ListingAndDetailLoadingType = {
  categories: boolean;
  listing: boolean;
  nextBatch: boolean;
  hidingNextBtn: boolean;
};
