import { apiClient } from '../client';
import {
  InterviewStartResponse,
  InterviewSession,
  InterviewAnswerResponse,
  InterviewQuestion,
} from '../types';

export const interviewService = {
  async startInterview(): Promise<InterviewStartResponse> {
    // Longer timeout because it may involve AI question generation
    const response = await apiClient.post<InterviewStartResponse>('/interviews/start', null, {
      timeout: 60000, // 1 minute
    });
    return response.data;
  },

  async getCurrentQuestion(sessionId: number): Promise<InterviewQuestion | null> {
    try {
      const response = await apiClient.get<InterviewQuestion>(
        `/interviews/${sessionId}/current-question`
      );
      return response.data;
    } catch {
      // Endpoint might not exist, return null
      return null;
    }
  },

  async submitAnswer(
    sessionId: number,
    interviewQuestionId: number,
    audioUri: string
  ): Promise<InterviewAnswerResponse> {
    const formData = new FormData();
    formData.append('interview_question_id', String(interviewQuestionId));
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: `answer-${Date.now()}.m4a`,
    } as unknown as Blob);

    // Longer timeout because AI processes the audio and generates feedback
    const response = await apiClient.post<InterviewAnswerResponse>(
      `/interviews/${sessionId}/answer`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 90000, // 1.5 minutes for audio processing
      }
    );
    return response.data;
  },

  async getActiveSession(): Promise<InterviewSession | null> {
    try {
      const response = await apiClient.get<InterviewSession>('/interviews/active');
      return response.data;
    } catch (error) {
      // 404 means no active session
      return null;
    }
  },

  async getSession(sessionId: number): Promise<InterviewSession> {
    const response = await apiClient.get<InterviewSession>(`/interviews/${sessionId}`);
    return response.data;
  },
};
