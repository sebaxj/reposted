import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
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
  // get embed code from instagram url
  const { data, error, isLoading } = useGetTiktokPostEmbedCodeQuery(url);
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
    <View style={{ height: verticalScale(940) }}>
      {error ? (
        <Text>{error as string}</Text>
      ) : (
        <View style={styles.webViewContainer}>
          <WebView
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
