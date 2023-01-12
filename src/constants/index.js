//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const constant = {
  //App Constants
  socketIP: '192.34.60.217',
  socketPort: '1233',
  //   baseURL: 'http://208.115.210.219:5145/api/', //DEV

  baseURL: 'http://208.115.210.219:5146/api/', //QA
  baseImageURL: 'http://208.115.210.219:5146/',
  applicationToken:
    'U2FsdGVkX18AkvkC90y4qCf0DyJL8NCwrnFEWpjrbyBYMGeKboVuoYWGdAp4ZKZSe2Qbxm2TRMxTwdN2U+7R2A==',
  //Services Constants
  loginUser: 'user/login',
  createUser: 'rider',
  updateCurrentLocation: 'user/update_location',
  verify: 'user/verify/code',
  forgotPassword: 'user/forgot-password',
  changePassword: 'user/change-password',
  mediaCreate: 'user/image/create',
  editProfile: 'rider/',
  getCategory: 'category',
  getBooking: 'booking',

  //Socket Constants
  //     failure: { action: "failure", packet_code: 9900 },
  //Location Constants

  GOOGLE_API_KEY: 'AIzaSyAt9oGjKd6C8dlkbwwOwz76AY5CNvkhJsc', //triformer

  LOCATION_TIME_OUT: 10000,
  LOCATION_MAX_AGE: 1000,
  LOCATION_HIGH_ACCURACY: false,
};

export default constant;
