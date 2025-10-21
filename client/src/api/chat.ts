import apiClient from '@/services/http-client';

export const createChatSession = async (
  message: string
): Promise<{ sessionID: string; response: string }> => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Error creating chat session', error);
    throw error;
  }
};

export const sendMessage = async (
  sessionID: string,
  message: string
): Promise<{ sessionID: string; response: string }> => {
  try {
    const response = await apiClient.post(`/chat/${sessionID}`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message', error);
    throw error;
  }
};
