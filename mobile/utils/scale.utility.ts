import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scales a pixel size based on the device's screen width.
 * Use for: height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop,
 * paddingBottom, paddingVertical, etc.
 * @param {number} size the pixel size to scale
 * @returns {number} the scaled pixel size
 */
const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth) * size;

/**
 * Scales a pixel size based on the device's screen height.
 * Use for: width, marginLeft, MarginRight, marginHorizontal, paddingLeft, paddingRight,
 * paddingHorizontal, etc.
 * @param {number} size the pixel size to scale
 * @returns {number} the scaled pixel size
 */
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

/**
 * Scales a pixel size based on a constant factor (default is 0.5).
 * Use for: fontSize, borderRadius, etc.
 * @param {number} size the pixel size to scale
 * @returns {number} the scaled pixel size
 */
const moderateScale = (size: number, factor = 0.5): number => {
  return size + (horizontalScale(size) - size) * factor;
};

/**
 * Scales a font size based on the device's pixel ratio.
 * @param {number} size
 * @returns {number} the scaled font size
 */
const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

export {horizontalScale, verticalScale, moderateScale, scaleFont};
