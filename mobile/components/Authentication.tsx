import React from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale.utility';
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

async function onAppleButtonPress(
  onAuthorize: (action: ReturnType<typeof login>) => void,
): Promise<void> {
  try {
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
      const response: ApiResponse = await loginUser(
        appleAuthRequestResponse.identityToken,
        appleAuthRequestResponse.fullName?.givenName as string | null,
        appleAuthRequestResponse.fullName?.familyName as string | null,
      );
      onAuthorize(login());
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
