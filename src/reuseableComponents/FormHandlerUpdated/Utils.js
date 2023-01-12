import _ from 'lodash';
import {INPUT_TYPES} from './Constants';

function isEmpty(data: any) {
  return _.isEmpty(data);
}

function isValidURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator

  return !!pattern.test(str);
}

function isEmailValid(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isPasswordValid(password: string) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  return re.test(password);
}

function isInputValid(value, type, password, byPassValidation) {
  switch (type) {
    case INPUT_TYPES.EMAIL: {
      return !isEmpty(value) && isEmailValid(value);
    }
    case INPUT_TYPES.PASSWORD: {
      // if wants to byPass validation then only check for empty case

      return !isEmpty(value) && isPasswordValid(value);
    }
    case INPUT_TYPES.OLD_PASSWORD: {
      // if wants to byPass validation then only check for empty case
      return !isEmpty(value) && isPasswordValid(value);
    }
    case INPUT_TYPES.NEW_PASSWORD: {
      // if wants to byPass validation then only check for empty case
      return !isEmpty(value) && isPasswordValid(value);
    }
    case INPUT_TYPES.TEXT: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.NUMBER: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.CONFIRM_PASSWORD: {
      return !isEmpty(value) && value === password;
    }
    case INPUT_TYPES.WEBSITE: {
      return !isEmpty(value) && isValidURL(value);
    }
    default: {
      return true;
    }
  }
}

function getError(type, val, originalError) {
  const {
    EMAIL,
    PASSWORD,
    NEW_PASSWORD,
    OLD_PASSWORD,
    CONFIRM_PASSWORD,
    WEBSITE,
  } = INPUT_TYPES;

  if (!val.length) {
    if (type === EMAIL) {
      return 'Email is required';
    }
    if (type === NEW_PASSWORD) {
      return 'New password is required';
    }
    if (type === OLD_PASSWORD) {
      return 'Old password is required';
    }
    if (type === PASSWORD) {
      return 'Password is required';
    }

    if (type === CONFIRM_PASSWORD) {
      return 'Confirm password is required';
    }
  }

  if (type === WEBSITE && !isValidURL(val)) {
    return 'Enter a valid website url';
  }

  if (type === CONFIRM_PASSWORD && val.length < 6) {
    return 'Password length must be greater than 6 characters';
  }

  if (type === NEW_PASSWORD && val.length < 6) {
    return 'password length must be greater than 6 characters';
  }
  if (type === OLD_PASSWORD && val.length < 6) {
    return 'password length must be greater than 6 characters';
  }
  if (type === NEW_PASSWORD && val.length && !isPasswordValid(val)) {
    return 'Password must contain at least 1 upper case and 1 lower case alphabetical character, 1 special character, 1 numerical character and at least 8 characters long.';
  }
  if (type === OLD_PASSWORD && val.length && !isPasswordValid(val)) {
    return 'Password must contain at least 1 upper case and 1 lower case alphabetical character, 1 special character, 1 numerical character and at least 8 characters long.';
  }

  if (type === CONFIRM_PASSWORD && val.length >= 6) {
    return 'Confirm password does not match';
  }

  if (type === PASSWORD && val.length && !isPasswordValid(val)) {
    return 'Password must contain at least 1 upper case and 1 lower case alphabetical character, 1 special character, 1 numerical character and at least 8 characters long.';
  }

  return originalError;
}

// showPassword is passed to input to as props
function isSecureTextEntry(childProps) {
  // handling password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  // handling confirm password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.CONFIRM_PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  return false;
}

function getKeyboardType(childProps) {
  if (childProps.type) {
    switch (childProps.type) {
      case INPUT_TYPES.EMAIL: {
        return 'email-address';
      }
      case INPUT_TYPES.NUMBER: {
        return 'number-pad';
      }
      case INPUT_TYPES.PHONE: {
        return 'phone-pad';
      }
      default:
        return 'default';
    }
  }
  return 'default';
}

export {getKeyboardType, isInputValid, isSecureTextEntry, getError};
