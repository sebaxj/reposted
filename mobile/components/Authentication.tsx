import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { horizontalScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/authenticationSlice';
import { loginUser } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: verticalScale(64),
    width: horizontalScale(192),
  },
});

// FIX: temporary until apple auth is hosted on AWS
const local = true;

async function onAppleButtonPress(
  onAuthorize: (action: ReturnType<typeof login>) => void,
): Promise<void> {
  try {
    // FIX: temporary until apple auth is hosted on AWS
    if (local) {
      const jwt: string = await loginUser(
        'eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnJlcG9zdGVkLmFwcCIsImV4cCI6MTY4MzYxMTYxMiwiaWF0IjoxNjgzNTI1MjEyLCJzdWIiOiIwMDEyNDYuOWRlNDI0Y2I4MDNjNDJkNmI4OWUyNDY1NTM0NjZhZWQuMDM0NSIsIm5vbmNlIjoiMGU3NTI5MmExMDY4ZGY0NWE0MTY4YjQ4YWY2YmIxNWQ3MmJhYTQyZGNlNmE2ZWQ4ZDNlNGE5M2EwNGI3OGEyYSIsImNfaGFzaCI6IlZSZ3N2ZnVjOG9IOVRsV0VLdUpRZlEiLCJlbWFpbCI6InN4ajgwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2ODM1MjUyMTIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.YhPZp6lBjh5SNa0PlI0VeRtKvZ_4sj9cicbQMKLGDqGMF-W5eISjnP-l7D7dDwNYJQLPiQyTVNLNepveOrIamZKLAtcdU_0CIqbkpQWMnMIAvEv4G2w1d3PPUqVdeDVEWD3AclMiKq42BdjUJBpLFOpyrg7wC-kQjabd9p8swe05Aut9NuNdHOYOfAeR4_1pycrTUw2JfluOboAS9q16WlL_LTbPc9jlOc5iWrZLFfniDhSLyf-RLDqQmxhgDse96tTxjJXg9HPMxtH8pHM4v1B43ToBVb713IEnkYAHWgiZiYS2hGaPuj9kGlLaaf5tqzyXffTEhqqf13F_NqS7NA',
        null,
        null,
      );
      onAuthorize(login(jwt));
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
        const jwt: string = await loginUser(
          appleAuthRequestResponse.identityToken,
          appleAuthRequestResponse.fullName?.givenName as string | null,
          appleAuthRequestResponse.fullName?.familyName as string | null,
        );
        onAuthorize(login(jwt));
      }
    }
  } catch (error: unknown) {
    // TODO: better error handling
    console.log(error);
  }
}

export default function Authentication(): JSX.Element {
  // import hooks for authentication reducer
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.button}
        onPress={() => onAppleButtonPress(dispatch)}
      />
    </SafeAreaView>
  );
}
