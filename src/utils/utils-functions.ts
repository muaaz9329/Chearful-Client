import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Whether an object is an object and has at-least one entry.
 *
 * @see https://stackoverflow.com/a/32108184/14716989
 */
export const isObjectValid = (object: any): boolean =>
  object &&
  Object.keys(object).length > 0 &&
  Object.getPrototypeOf(object) === Object.prototype;

/**
 * A function to check if the email is valid or not.
 */
export function isValidEmail(email: string) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

export const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('USER_accessToken');

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
};
