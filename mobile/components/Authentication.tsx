import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { horizontalScale, moderateScale, scaleFont, verticalScale } from '../utils/scale.utility';
import { useLoginMutation } from '../redux/api';
import Loading from './Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(16),
  },
  button: {
    height: verticalScale(64),
    width: horizontalScale(192),
  },
  logo: {
    height: horizontalScale(164),
    width: horizontalScale(164),
  },
  title: {
    fontSize: scaleFont(34),
  },
});

// FIX: temporary until apple auth is hosted on AWS
const local = true;

async function onAppleButtonPress(
  login: (credentials: {
    idToken: string;
    firstName?: string | null;
    lastName?: string | null;
  }) => void,
): Promise<void> {
  try {
    // FIX: temporary until apple auth is hosted on AWS
    if (local) {
      login({
        idToken:
          'eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnJlcG9zdGVkLmFwcCIsImV4cCI6MTY4MzYxMTYxMiwiaWF0IjoxNjgzNTI1MjEyLCJzdWIiOiIwMDEyNDYuOWRlNDI0Y2I4MDNjNDJkNmI4OWUyNDY1NTM0NjZhZWQuMDM0NSIsIm5vbmNlIjoiMGU3NTI5MmExMDY4ZGY0NWE0MTY4YjQ4YWY2YmIxNWQ3MmJhYTQyZGNlNmE2ZWQ4ZDNlNGE5M2EwNGI3OGEyYSIsImNfaGFzaCI6IlZSZ3N2ZnVjOG9IOVRsV0VLdUpRZlEiLCJlbWFpbCI6InN4ajgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2ODM1MjUyMTIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.YhPZp6lBjh5SNa0PlI0VeRtKvZ_4sj9cicbQMKLGDqGMF-W5eISjnP-l7D7dDwNYJQLPiQyTVNLNepveOrIamZKLAtcdU_0CIqbkpQWMnMIAvEv4G2w1d3PPUqVdeDVEWD3AclMiKq42BdjUJBpLFOpyrg7wC-kQjabd9p8swe05Aut9NuNdHOYOfAeR4_1pycrTUw2JfluOboAS9q16WlL_LTbPc9jlOc5iWrZLFfniDhSLyf-RLDqQmxhgDse96tTxjJXg9HPMxtH8pHM4v1B43ToBVb713IEnkYAHWgiZiYS2hGaPuj9kGlLaaf5tqzyXffTEhqqf13F_NqS7NA',
        firstName: null,
        lastName: null,
      });
    } else {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // get current authentication state for user
      // Must be done on real device
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // authenticate with backend
        login({
          idToken:
            'eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnJlcG9zdGVkLmFwcCIsImV4cCI6MTY4MzYxMTYxMiwiaWF0IjoxNjgzNTI1MjEyLCJzdWIiOiIwMDEyNDYuOWRlNDI0Y2I4MDNjNDJkNmI4OWUyNDY1NTM0NjZhZWQuMDM0NSIsIm5vbmNlIjoiMGU3NTI5MmExMDY4ZGY0NWE0MTY4YjQ4YWY2YmIxNWQ3MmJhYTQyZGNlNmE2ZWQ4ZDNlNGE5M2EwNGI3OGEyYSIsImNfaGFzaCI6IlZSZ3N2ZnVjOG9IOVRsV0VLdUpRZlEiLCJlbWFpbCI6InN4ajgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2ODM1MjUyMTIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.YhPZp6lBjh5SNa0PlI0VeRtKvZ_4sj9cicbQMKLGDqGMF-W5eISjnP-l7D7dDwNYJQLPiQyTVNLNepveOrIamZKLAtcdU_0CIqbkpQWMnMIAvEv4G2w1d3PPUqVdeDVEWD3AclMiKq42BdjUJBpLFOpyrg7wC-kQjabd9p8swe05Aut9NuNdHOYOfAeR4_1pycrTUw2JfluOboAS9q16WlL_LTbPc9jlOc5iWrZLFfniDhSLyf-RLDqQmxhgDse96tTxjJXg9HPMxtH8pHM4v1B43ToBVb713IEnkYAHWgiZiYS2hGaPuj9kGlLaaf5tqzyXffTEhqqf13F_NqS7NA',
          firstName: null,
          lastName: null,
        });
      }
    }
  } catch (error: unknown) {
    // TODO: better error handling
    console.log(error);
  }
}

export default function Authentication(): JSX.Element {
  const [login, { isLoading, error }] = useLoginMutation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/reposted.png')} style={styles.logo} />
      <Text style={styles.title}>Reposted</Text>
      {error && <Text>{`Error: ${error.toString()}`}</Text>}
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.button}
        onPress={() => onAppleButtonPress(login)}
      />
    </SafeAreaView>
  );
}
