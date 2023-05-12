import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scale.utility';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/authenticationSlice';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: verticalScale(8),
    borderRadius: moderateScale(8),
    margin: verticalScale(8),
  },
});

function handleWebViewNavigationStateChange(newNavState) {
  const { url } = newNavState;
}

export default function Profle(): JSX.Element {
  // import hooks for authentication reducer
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(logout())} style={styles.button}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text>Authorize Instagram</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <WebView
          source={{ uri: 'https://www.instagram.com' }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      </Modal>
    </SafeAreaView>
  );
}
