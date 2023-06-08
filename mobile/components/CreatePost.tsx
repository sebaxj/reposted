import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { horizontalScale, moderateScale, scaleFont, verticalScale } from '../utils/scale.utility';
import InstagramEmbed from './InstagramEmbed';
import TiktokEmbed from './TikTokEmbed';
import { useCreatePostMutation } from '../redux/api';
import Loading from './Loading';
import { StackScreenProps } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    paddingHorizontal: horizontalScale(16),
  },
  postLinkContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    width: '100%',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  postLinkInput: {
    flex: 1,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: horizontalScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: '#DDDDE4',
  },
  postLinkTitle: {
    fontSize: moderateScale(17),
    fontWeight: '500',
  },
  sourceButton: {
    width: horizontalScale(78),
    height: verticalScale(32),
    borderRadius: moderateScale(18),
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceButtonText: {
    fontSize: scaleFont(15),
  },
  sourceButtonContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
  },
  preview: {
    width: '100%',
    marginVertical: verticalScale(16),
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(16),
    width: '100%',
    marginTop: verticalScale(16),
  },
  privacyText: {
    fontSize: scaleFont(17),
  },
  privacyButton: {
    borderBottomWidth: moderateScale(2),
    paddingBottom: verticalScale(3),
  },
  postButtonContainer: {
    position: 'absolute',
    bottom: verticalScale(16),
    alignSelf: 'center',
  },
  postButton: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  postButtonText: {
    fontSize: scaleFont(24),
    color: '#FFFFFF',
  },
  errorContainer: {
    marginTop: verticalScale(8),
  },
  errorText: {
    textAlign: 'center',
    fontSize: scaleFont(15),
    color: '#EC555E',
  },
});

function SourceButton({
  text,
  isActive,
  onSelect,
}: {
  text: string;
  isActive: boolean;
  onSelect: () => void;
}): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        ...styles.sourceButton,
        borderColor: isActive ? '#EC555E' : '#AAAABB',
        backgroundColor: isActive ? '#EC555E' : '#F8F8FF',
      }}
      onPress={onSelect}
    >
      <Text style={{ ...styles.sourceButtonText, color: isActive ? '#FFFFFF' : '#AAAABB' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

type CreatePostProps = StackScreenProps<NavigationTypes.HomeStackParamList, 'CreatePost'>;

export default function CreatePost(props: CreatePostProps): JSX.Element {
  const [postLink, setPostLink] = React.useState<string>('');
  const [sourceType, setSourceType] = React.useState<'instagram' | 'twitter' | 'tiktok' | ''>('');
  const [privacy, setPrivacy] = React.useState<'public' | 'private'>('public');
  const [customError, setCustomError] = React.useState<string>('');
  const { navigation } = props;

  // RTK Query for creating a post
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{`Error: ${error.error ?? error.data}`}</Text>
          </View>
        )}
        {customError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {customError}</Text>
          </View>
        )}
        <View style={styles.postLinkContainer}>
          <Text style={styles.postLinkTitle}>Post Link:</Text>
          <TextInput
            style={styles.postLinkInput}
            onChangeText={setPostLink}
            value={postLink}
            placeholder="https://twitter..."
          />
        </View>
        <View style={styles.sourceButtonContainer}>
          <SourceButton
            text="Twitter"
            isActive={sourceType === 'twitter'}
            onSelect={() => setSourceType('twitter')}
          />
          <SourceButton
            text="Instagram"
            isActive={sourceType === 'instagram'}
            onSelect={() => setSourceType('instagram')}
          />
          <SourceButton
            text="TikTok"
            isActive={sourceType === 'tiktok'}
            onSelect={() => setSourceType('tiktok')}
          />
        </View>
        <View>
          <View style={styles.privacyContainer}>
            <Text style={styles.postLinkTitle}>Privacy:</Text>
            <TouchableOpacity
              style={{
                ...styles.privacyButton,
                borderBottomColor: privacy === 'public' ? '#EC555E' : '#AAAABB',
              }}
              onPress={() => setPrivacy('public')}
            >
              <Text
                style={{
                  ...styles.postLinkTitle,
                  color: privacy === 'public' ? '#EC555E' : '#AAAABB',
                }}
              >
                MungerHouse
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.privacyButton,
                borderBottomColor: privacy === 'private' ? '#EC555E' : '#AAAABB',
              }}
              onPress={() => setPrivacy('private')}
            >
              <Text
                style={{
                  ...styles.privacyText,
                  color: privacy === 'private' ? '#EC555E' : '#AAAABB',
                }}
              >
                GymMemez
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <AntDesign name="pluscircleo" size={24} color="#AAAABB" />
            <Text style={{ color: '#AAAABB', fontSize: 15 }}>Create new group</Text>
          </View>
        </View>
        <View style={styles.preview}>
          {sourceType === 'twitter' && postLink && <TwitterPreview url={postLink} />}
          {sourceType === 'instagram' && postLink && <InstagramEmbed url={postLink} />}
          {sourceType === 'tiktok' && postLink && <TiktokEmbed url={postLink} />}
        </View>
      </ScrollView>
      <View style={styles.postButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            // if all fields are filled, create post
            if (postLink && sourceType && privacy) {
              createPost({ url: postLink, source: sourceType, privacy }).then(() => {
                navigation.navigate('Home');
              });
            } else {
              // else, display error
              setCustomError('Please fill out all fields');
            }
          }}
          style={{
            ...styles.postButton,
            backgroundColor: postLink && sourceType && privacy ? '#EC555E' : '#AAAABB',
          }}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
