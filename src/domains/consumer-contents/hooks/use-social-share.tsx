import { LinkingText } from '@app/utils';
import Share from 'react-native-share';
const useSocialShare = (link: string) => {
  const shareOnFacebook = async () => {
    'https://www.facebook.com/sharer/sharer.php?u=' + link;
  };

  const shareOnLinkedIn = async () => {
    LinkingText('https://www.linkedin.com/shareArticle?mini=true&url=' + link);
  };

  const shareOnInstagram = async () => {
    try {
      await Share.shareSingle({
        title: 'Chearful Article',
        message: 'Check out this awesome article on Chearful!',
        url: link,
        social: Share.Social.INSTAGRAM as any,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const shareLink = async () => {
    try {
      await Share.open({
        title: 'Chearful Article',
        message: 'Check out this awesome article on Chearful!',
        url: link,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { shareOnFacebook, shareOnInstagram, shareOnLinkedIn, shareLink };
};

export default useSocialShare;
