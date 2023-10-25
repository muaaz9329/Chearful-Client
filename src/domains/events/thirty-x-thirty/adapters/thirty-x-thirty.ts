import { convertFileToBase64 } from '@app/utils';
import { Assessment } from '../types';

export const deserializeAssessmentData = (assessmentData: any) => {
  console.log('assessmentData', JSON.stringify(assessmentData));
};

function getCurrentDate(date?: Date) {
  let today;
  if (date) {
    today = date;
  } else {
    today = new Date();
  }
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const deserializeAssessment = (
  assessment: Assessment,
  index: number,
  //@ts-ignore
): challengeBoxData => {
  // today date object
  try {
    const today = getCurrentDate();
    const challengeDate = getCurrentDate(
      new Date(assessment.assesment.challenge_date as string),
    );

    switch (assessment.assesment_status) {
      case 'Pending': {
        if (today > challengeDate) {
          return {
            condition: 'missed',
            title: assessment.assesment.assesment_title,
            questionId: assessment.id,
            assessmentId: assessment.assesment_id,
            index,
          };
        }
        if (today < challengeDate) {
          return {
            condition: 'upcoming',
            title: assessment.assesment.assesment_title,
            questionId: assessment.id,
            assessmentId: assessment.assesment_id,
            index,
          };
        }
        if (today === challengeDate) {
          return {
            condition: 'current',
            title: assessment.assesment.assesment_title,
            questionId: assessment.id,
            assessmentId: assessment.assesment_id,
            index,
          };
        }
        break;
      }

      case 'Submitted': {
        return {
          condition: 'completed',
          title: assessment.assesment.assesment_title,
          questionId: assessment.id,
          assessmentId: assessment.assesment_id,
          index,
        };
      }
      default:
        return {
          condition: 'current',
          title: assessment.assesment.assesment_title,
          questionId: assessment.id,
          assessmentId: assessment.assesment_id,
          index,
        };
    }
  } catch (e) {
    console.log(e);
  }
};

export type challengeBoxData = {
  condition: 'completed' | 'missed' | 'current' | 'upcoming';
  title: string;
  questionId: number;
  assessmentId: number;
  index?: number;
};

export const serializeMedia = async (filePath: string): Promise<string> => {
  // convert image to base64 encoded string
  const base64 = await convertFileToBase64(filePath);
  return base64;
};

export const deserializeAsses = (assessment: Assessment) => {
  switch (assessment.assesment_status) {
    case 'Pending': {
      return {
        status: 'upcoming',
        questionId: assessment.id,
        assessmentId: assessment.assesment_id,
      };
    }
    case 'Submitted': {
      return {
        status: 'level5',
        questionId: assessment.id,
        assessmentId: assessment.assesment_id,
      };
    }
  }
};
