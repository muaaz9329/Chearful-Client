/*
  This is the service module for the thirty-x-thirty module.
  This is where the API calls for the thirty-x-thirty module will be made.
*/

import apiService from "@app/services/api-service/api-service";
import { Boolbacks } from "../../../services/api-service/index";
import { getAuthHeaders } from "@app/utils";
import { Assessment, ChallengeQuestionsData } from "./types";

const getChallenges = ({ onFailure, onSuccess }: Boolbacks) => {
  getAuthHeaders().then((headers) => {
    apiService.get<Assessment[]>({
      headers,
      url: "/website/assessments/list",
      onSuccess: onSuccess,
      onFailure,
    });
  });
};

const getChallengeQuestions = ({
  questionId,
  assessmentId,
  onSuccess,
  onFailure,
}: Boolbacks<ChallengeQuestionsData> & {
  questionId: number;
  assessmentId?: number;
}) => {
  getAuthHeaders().then((headers) => {
    const data = [];
    if (assessmentId)
      data.push({ key: "assessment_id", value: assessmentId.toString() });

    apiService.get({
      url: `/website/assessments/take-assessment/${questionId}`,
      data,
      headers,
      onSuccess,
      onFailure,
    });
  });
};

const getFitnessScreenerId = async ({
  onSuccess,
  onFailure,
}: Boolbacks<{
  screenerAssessmentId: number;
}>) => {
  getAuthHeaders().then((headers) => {
    console.log({ headers });

    apiService.get({
      headers,
      url: "/website/assessments/get-challenge-screener",
      onFailure,
      onSuccess: (res) => {
        // @ts-ignore
        const assessmentId = res.screener_assessment_id;

        onSuccess?.({
          data: {
            screenerAssessmentId: assessmentId,
          },
        });
      },
    });
  });
};

const submitChallenge = ({
  data,
  onFailure,
  onSuccess,
}: Boolbacks & {
  data: any;
}) => {
  getAuthHeaders().then((headers) => {
    const newData = JSON.stringify(data);
    apiService.post({
      url: "/website/assessments/submit-assessment",
      headers,
      data: newData,
      onFailure,
      onSuccess,
    });
  });
};

// const submitChallenge = async ({

// }) => {}

/**
 * ThirtyXThirtyChallenge Serviec
 */
const ThirtyXThirtyService = {
  getChallenges,
  getChallengeQuestions,
  getFitnessScreenerId,
  submitChallenge,
};

export default ThirtyXThirtyService;
