import Config from 'react-native-config';
import Axios, { AxiosResponse } from 'axios';

export async function loginUser(
  idToken: string,
  firstName: string | null,
  lastName: string | null,
): Promise<string> {
  const response: AxiosResponse = await Axios.post(`${Config.API_URL}/user/authenticate`, {
    idToken,
    firstName,
    lastName,
  });

  // extract JWT
  if (response.headers['set-cookie'] === undefined) throw new Error('No JWT found');
  return response.headers['set-cookie'][0];
}
