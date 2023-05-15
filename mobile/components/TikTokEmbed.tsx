import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, Text } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useGetTiktokPostEmbedCodeQuery } from '../redux/api';
import Loading from './Loading';
import { verticalScale } from '../utils/scale.utility';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 4,
    borderColor: '#999',
  },
  webViewContainer: {
    flex: 1,
  },
});

export default function TiktokEmbed({ url }: { url: string }): JSX.Element {
  // manage height for WebView component
  const [webviewHeight, setWebviewHeight] = React.useState<number>(250);

  // get embed code from instagram url
  const { data, error, isLoading } = useGetTiktokPostEmbedCodeQuery(url);

  // get content height from WebView
  const onWebViewMessage = (event: WebViewMessageEvent) => {
    setWebviewHeight(Number(event.nativeEvent.data));
  };

  // inject javascript code to get content height from WebView
  const injectedJavaScript = `
      setTimeout(() => {
        window.ReactNativeWebView.postMessage(
          Math.min(document.body.offsetHeight, document.body.scrollHeight)
        );}, 1800)`;

  const embedCode = data?.html;

  // WebView HTML code
  const html = `<!DOCTYPE html>\
      <html>\
        <head>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1.0">\
          </head>\
          <body>\
            ${embedCode}\
          </body>\
      </html>`;

  if (isLoading) return <Loading />;

  return (
    <View style={{ height: verticalScale(740) }}>
      {error ? (
        <Text>{error as string}</Text>
      ) : (
        <View style={styles.webViewContainer}>
          <WebView
            onMessage={onWebViewMessage}
            injectedJavaScript={injectedJavaScript}
            source={{ html }}
            scrollEnabled={false}
            allowsFullscreenVideo={false}
            allowsInlineMediaPlayback
          />
        </View>
      )}
    </View>
  );
}
