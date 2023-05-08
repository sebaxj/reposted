namespace NavigationTypes {
  type LoginStackParamList = {
    Authentication: undefined;
  };
}

interface ApiResponse {
  data: any;
  error: any;
  meta: any;
}

interface JWT {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}
