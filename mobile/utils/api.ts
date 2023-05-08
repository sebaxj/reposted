import Config from 'react-native-config';
import Axios, { AxiosResponse } from 'axios';

export async function loginUser(
  idToken: string,
  firstName: string | null,
  lastName: string | null,
): Promise<ApiResponse> {
  const response: AxiosResponse = await Axios.post(`${Config.API_URL}/user/authenticate`, {
    idToken,
    firstName,
    lastName,
  });
  return response.data;
}
