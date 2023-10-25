export type ChallengeQuestionsData = {
  assessment_detail: {
    id: number;
    assesment_title: string;
    description: string;
    user_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    pdf_url?: any;
    assessment_type: string;
    challenge_date?: any;
  };
  assessment_groups: {
    id: number;
    assesment_id: number;
    group_id: number;
    arrQuestions: {
      id: number;
      question_type: string;
      group_id: number;
      question_title: string;
      status: number;
      answers: {
        id: number;
        question_id: number;
        option_title: string;
        score: number;
      }[];
    }[];
    ailments: {
      id: number;
      title: string;
      short_description: string;
      group_has_score: number;
      status: number;
      ailments_type: string;
    };
  }[];
  totalQuestions: number;
  survey_id: string;
  percent_per_question: number;
  ailment_url?: any;
  key: number;
};

export interface Assessment {
  id: number;
  assesment_id: number;
  user_id: number;
  created_at: string;
  attempted_time: string;
  assesment_status: string;
  createdby_id: number;
  viewed: string;
  assigned_by: string;
  challenge_date: string | null;
  assesment: {
    id: number;
    assesment_title: string;
    description: string;
    challenge_date: string | null;
    assessment_type: string;
  };
}


export type AssessmentData = {
  status: boolean;
  data: Assessment[];
  message: string;
  pointsToBeEarned: number;
  earnedPoints: number;
  percentageCompletion: number;
};
