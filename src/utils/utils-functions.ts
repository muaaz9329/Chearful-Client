import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import RNFS from 'react-native-fs';
import he from 'he';

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
  const token = await AsyncStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
};

//This is a function to create an object that contains date and day of the week based on the input date.
export const constructDate = (
  date: Date,
): {
  Date: string;
  Day: string;
  Time: string;
  ApiDateQuery: string;
} => {
  //! <--- Need to Change this later

  //Create a new object with empty properties.
  let ReturnedObj = {
    Date: '',
    Day: '',
    Time: '',
    ApiDateQuery: '',
  };

  //creating the date object which will help us to find the day of the week
  const WeekDay = new Date(date);
  //using switch statement to update the value of 'Day'
  switch (WeekDay.getDay()) {
    case 1:
      ReturnedObj.Day = 'Monday';
      break;
    case 2:
      ReturnedObj.Day = 'Tuesday';
      break;
    case 3:
      ReturnedObj.Day = 'Wednesday';
      break;
    case 4:
      ReturnedObj.Day = 'Thursday';
      break;
    case 5:
      ReturnedObj.Day = 'Friday';
      break;
    case 6:
      ReturnedObj.Day = 'Saturday';
      break;
    case 0:
      ReturnedObj.Day = 'Sunday';
      break;
  }

  //getting month, day and year from the input date and adding it into the object.
  const month = String(date).slice(4, 7).toLowerCase();

  const day = String(date).slice(8, 10);
  const year = String(date).slice(11, 15); // change this to 11 , 15 for 2023 date

  var hours = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  ReturnedObj.Time = strTime;

  ReturnedObj.Date = `${day} ${capitalizeFirstLetter(month)}, ${year}`;
  try {
    ReturnedObj.ApiDateQuery = date.toISOString().split('T')[0]; // Returns the date in YYYY-MM-DD format
    //! dont remove this from try catch , as it only works in try catch for some reason
  } catch (err) {
    return ReturnedObj;
  }
  return ReturnedObj;
};

/***
 * Capitals the first Character of string
 * @param {String}
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param {hex} : string  , Which  is HEX string value
 * @param {opacity}:number , Which is Number Value which is used for telling opacity , should Range from 0 - 1
 * @returns : string value of HEX with Opacity that was given As Argument
 * @description function that returns the Hex value of color with Opacity
 * {1.0.0} written by Muaaz bin Sarfraz
 *
 * Used in Drawic Library
 */

export const colorWithOpacity = (hex: string, opacity: number): string => {
  if (
    typeof hex !== 'string' ||
    !/^#([A-Fa-f0-9]{3}){1,2}($|[A-Fa-f0-9]{2})$/.test(hex)
  )
    throw new Error('Invalid hexadecimal color value');
  if (typeof opacity !== 'number' || opacity > 1 || opacity < 0)
    throw new Error('Opacity should be float between 0 - 1');
  let color = hex.substring(1);
  if (color.length === 5 || color.length === 8)
    color = color.substring(0, color.length - 2);
  if (color.length === 3)
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  color += Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${color}`.toUpperCase();
};

export function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

/**
 * @description converts date format from YYYY-MM-DD to DD MMM,YY
 * @param dateString string in YYYY-MM-DD format
 * @returns
 */

export function convertDateFormat_YMD_DMY(dateString: string): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [year, month, day] = dateString.split('-');
  const formattedMonth = months[Number(month) - 1];

  return `${Number(day)} ${formattedMonth},${String(year).slice(2)}`;
}

/**
 * @description converts time and add Duration returns object with StartTime and EndTime
 * @param startTime string in HH:MM:SS format
 * @param duration number in minutes like 30, 60, 90
 * @returns Object with StartTime and EndTime
 */

export function calculateEndTime(startTime: string, duration: number) {
  const [startHour, startMinute] = startTime.split(':').map(Number);

  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);

  const endDate = new Date(startDate.getTime() + duration * 60000);

  const formattedStartTime = formatTime(startDate);
  const formattedEndTime = formatTime(endDate);

  return {
    StartTime: formattedStartTime,
    EndTime: formattedEndTime,
  };
}

function formatTime(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  const formattedMinute = String(minute).padStart(2, '0');

  return `${formattedHour}:${formattedMinute} ${period}`;
}

/**
 * @description converts file to base64
 * @param filePath : string , which is path of file
 * @returns base64 string
 */

export const convertFileToBase64 = async (filePath: string) => {
  try {
    const fileContents = await RNFS.readFile(filePath, 'base64');
    return fileContents;
  } catch (error) {
    console.error('Error converting file to Base64:', error);
    throw error;
  }
};

/**
 * @description format date with suffix of st nd rd th
 * @param currentDate : Date , which is current date
 * @returns returns object with day and month
 */

export function formatDateWithdaySuffix(currentDate: Date) {
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  let daySuffix;
  if (day >= 11 && day <= 13) {
    daySuffix = 'th';
  } else {
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        daySuffix = 'st';
        break;
      case 2:
        daySuffix = 'nd';
        break;
      case 3:
        daySuffix = 'rd';
        break;
      default:
        daySuffix = 'th';
    }
  }

  const formattedDay = day + daySuffix;

  return {
    day: formattedDay,
    month: month,
  };
}

/**
 * @returns date 18 years before
 */
export function calculate18YearsBefore() {
  // Convert inputDate to a Date object if it's not already

  // Calculate the date 18 years before the input date
  const newDate = new Date();
  newDate.setFullYear(newDate.getFullYear() - 18);

  return newDate;
}

/**
 *
 * @param url : string , which is url to open
 */

export const LinkingText = (url: string) => {
  Linking.openURL(url);
};

export function findEmptyProperties(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input is not a valid object');
  }

  const emptyProperties = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        !obj[key] ||
        obj[key] === '' ||
        (Array.isArray(obj[key]) && obj[key].length === 0)
      ) {
        emptyProperties.push(key);
      }
    }
  }

  return emptyProperties;
}

/**
 * function to strip HTML tags from a string
 */
export function stripHTML(html: string) {
  // Remove HTML tags using a regular expression
  return html.replace(/<[^>]*>/g, '');
}
/**
 *
 * @param html : string , which is html entites to decode
 * @returns
 */
export function decodeHTML(html: string) {
  return he.decode(html);
}
/**
 *
 * @param url : string , which is url of youtube video
 * @returns
 */

export function getYouTubeVideoId(url: string) {
  // Match the video ID using a regular expression for both formats
  const match = url.match(/[?&]v=([^?&]+)|youtu\.be\/([^?&]+)/);

  // If there's a match, return the video ID; otherwise, return null
  return match && (match[1] || match[2]) ? match[1] || match[2] : null;
}

export function detectLanguage(
  text: string,
): 'English' | 'Arabic' | 'Mixed' | 'Unknown' {
  // Define regular expressions for English and Arabic characters
  const englishRegex = /[A-Za-z]/;
  const arabicRegex = /[\u0600-\u06FF]/;

  let hasEnglish = false;
  let hasArabic = false;

  // Loop through each character in the text
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (englishRegex.test(char)) {
      hasEnglish = true;
    } else if (arabicRegex.test(char)) {
      hasArabic = true;
    }
  }

  if (hasEnglish && !hasArabic) {
    return 'English';
  } else if (hasArabic && !hasEnglish) {
    return 'Arabic';
  } else if (hasEnglish && hasArabic) {
    return 'Mixed'; // Both English and Arabic characters are present
  } else {
    return 'Unknown'; // No English or Arabic characters found
  }
}
export function extractFirst100Characters(htmlString: string) {
  // Remove HTML tags using a regular expression
  const textWithoutTags = htmlString.replace(/<\/?[^>]+(>|$)/g, '');

  // Extract the first 100 characters
  const first100Characters = textWithoutTags.slice(0, 100);

  return first100Characters;
}

export function isArabic(text: string): boolean {
  // Regular expression to match Arabic characters
  var arabicPattern =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  return arabicPattern.test(text);
}

// Extract the file extension from the URL
export function isSvg(url: string) {
  // @ts-ignore
  try {
    // @ts-ignore
    const fileExtension = url.split('.').pop().toLowerCase();
    // Check if it's an SVG or JPEG file
    return fileExtension === 'svg';
  } catch (err) {
    return false;
  }
}

/**
 *
 * @param styleObjects :styles which you want to merge
 * @returns single object with all styles merged
 */

export function mergeStyles(...styleObjects: object[]): object {
  return Object.assign({}, ...styleObjects);
}

export function isSvgExtension(url: string) {
  // Extract the file extension from the URL
  // @ts-ignore
  try {
    // @ts-ignore
    const fileExtension = url.split('.').pop().toLowerCase();

    // Check if it's an SVG or JPEG file
    return fileExtension === 'svg';
  } catch (err) {
    return false;
  }
}

export function formatDateTo12HourTime(date:Date) {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  // @ts-ignore
  return date.toLocaleTimeString('en-US', options).toLowerCase();
}


/**
 * @description To check if object is empty or not
 */
export function isObjectFilled<T>(obj: T): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Check if the value is non-empty
      // @ts-ignore
      if (typeof value === 'object' && Object.keys(value).length === 0) {
        return false;
      }

      if (!value) {
        return false;
      }
    }
  }

  return true;
}
export function formatDateToYMD(inputDate: Date): string {
  try {
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(inputDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
  } catch (error) {
      return "Invalid date format. Please provide a valid Date object.";
  }
}



export const areDatesEqual = (date1:Date, date2:Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// checks if the object is empty
export function isObjectEmpty(obj:any) {
  return Object.keys(obj).length === 0;
}