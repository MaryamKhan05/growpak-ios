const initialState = {
  otp: {
    data: null,
    loading: false,
    error: null,
  },
  countries: {
    data: null,
    loading: false,
    error: null,
  },
  provinces: {
    data: null,
    loading: false,
    error: null,
  },
  district: {
    data: null,
    loading: false,
    error: null,
  },
  newFarm: {
    data: null,
    loading: false,
    error: null,
  },
  forget: {
    data: null,
    loading: false,
    error: null,
    errorMessage: null,
  },
  // appLang: {
  //   data: 'ur',
  //   loading: false,
  //   error: null,
  //   errorMessage: null,
  // },
};

const reducer = (state = initialState, action) => {
  console.log(action.type, "switch");
  switch (action.type) {
    case "saveToken": {
      return {
        ...state,
        token: action.payload,
      };
    }

    case "deleteToken": {
      return {
        ...state,
        token: null,
      };
    }
    case "getCountryCode/pending": {
      return { ...state, code: { ...state.code, loading: true } };
    }
    case "getCountryCode/fulfilled": {
      return {
        ...state,
        code: { data: action.payload, loading: false, error: null },
      };
    }
    case "getCountryCode/rejected":
      return {
        ...state,
        code: { data: null, loading: false, error: action.payload },
      };
    case "getOtp/pending": {
      return { ...state, otp: { ...state.otp, loading: true } };
    }
    case "getOtp/fulfilled": {
      return {
        ...state,
        otp: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }

    case "getOtp/rejected":
      return {
        ...state,
        otp: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: "Error getting OTP, Please try again later",
        },
      };

    case "clearOtpSuccessMessage": {
      return {
        ...state,
        otp: {
          ...state.otp,
          successMessage: null,
          data: null,
        },
      };
    }

    case "clearOtpErrorMessage": {
      return {
        ...state,
        otp: {
          ...state.otp,
          error: null,
          errorMessage: null,
          data: null,
        },
      };
    }
    case "clearOtpS": {
      return {
        ...state,
        otp: {
          ...state.otp,
          successMessage: null,
        },
      };
    }

    case "clearOtpE": {
      return {
        ...state,
        otp: {
          ...state.otp,
          error: null,
          errorMessage: null,
        },
      };
    }

    case "getAllCountries/pending": {
      return { ...state, countries: { ...state.countries, loading: true } };
    }
    case "getAllCountries/fulfilled": {
      return {
        ...state,
        countries: { data: action.payload, loading: false, error: null },
      };
    }
    case "getAllCountries/rejected":
      return {
        ...state,
        countries: { data: null, loading: false, error: action.payload },
      };
    case "getProvinceByCountry/pending": {
      return { ...state, provinces: { ...state.provinces, loading: true } };
    }
    case "getProvinceByCountry/fulfilled": {
      return {
        ...state,
        provinces: { data: action.payload, loading: false, error: null },
      };
    }
    case "getProvinceByCountry/rejected":
      return {
        ...state,
        provinces: { data: null, loading: false, error: action.payload },
      };
    case "getDistrictByProvince/pending": {
      return { ...state, district: { ...state.district, loading: true } };
    }
    case "getDistrictByProvince/fulfilled": {
      return {
        ...state,
        district: { data: action.payload, loading: false, error: null },
      };
    }
    case "getDistrictByProvince/rejected":
      return {
        ...state,
        district: { data: null, loading: false, error: action.payload },
      };
    case "getCityByDistrict/pending": {
      return { ...state, city: { ...state.city, loading: true } };
    }
    case "getCityByDistrict/fulfilled": {
      return {
        ...state,
        city: { data: action.payload, loading: false, error: null },
      };
    }
    case "getCityByDistrict/rejected":
      return {
        ...state,
        city: { data: null, loading: false, error: action.payload },
      };
    case "signup/pending": {
      return { ...state, signup: { ...state.signup, loading: true } };
    }
    case "signup/fulfilled": {
      return {
        ...state,
        signup: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "signup/rejected":
      return {
        ...state,
        signup: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: action.error.message,
        },
      };

    case "clearSignupSuccessMessage": {
      return {
        ...state,
        signup: {
          ...state.signup,
          successMessage: null,
        },
      };
    }

    case "clearSignupErrorMessage": {
      return {
        ...state,
        signup: {
          ...state.signup,
          error: null,
          errorMessage: null,
        },
      };
    }
    case "forgetPassword/pending": {
      return { ...state, forget: { ...state.forget, loading: true } };
    }
    case "forgetPassword/fulfilled": {
      return {
        ...state,
        forget: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "forgetPassword/rejected":
      return {
        ...state,
        forget: {
          data: null,
          loading: false,
          error: action,
          errorMessage: action.error.message,
        },
      };

    case "clearForgetSuccessMessage": {
      return {
        ...state,
        forget: {
          ...state.forget,
          successMessage: null,
        },
      };
    }

    case "clearForgetErrorMessage": {
      return {
        ...state,
        forget: {
          ...state.forget,
          error: null,
          errorMessage: null,
        },
      };
    }

    case "login/pending": {
      return { ...state, login: { ...state.login, loading: true } };
    }
    case "login/fulfilled": {
      return {
        ...state,
        login: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "login/rejected":
      return {
        ...state,
        login: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: action.error.message,
        },
      };

    case "clearLoginSuccessMessage": {
      return {
        ...state,
        login: {
          ...state.login,
          successMessage: null,
        },
      };
    }

    case "clearLoginErrorMessage": {
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
          errorMessage: null,
        },
      };
    }

    case "getWeather/pending": {
      return { ...state, weather: { ...state.weather, loading: true } };
    }
    case "getWeather/fulfilled": {
      return {
        ...state,
        weather: { data: action.payload, loading: false, error: null },
      };
    }
    case "getWeather/rejected":
      return {
        ...state,
        weather: { data: null, loading: false, error: action.payload },
      };

    case "geolocation/pending": {
      return { ...state, geolocation: { ...state.geolocation, loading: true } };
    }
    case "geolocation/fulfilled": {
      return {
        ...state,
        geolocation: { data: action.payload, loading: false, error: null },
      };
    }
    case "geolocation/rejected":
      return {
        ...state,
        geolocation: { data: null, loading: false, error: action.payload },
      };

    case "addFarmer/pending": {
      return { ...state, addFarmer: { ...state.addFarmer, loading: true } };
    }
    case "addFarmer/fulfilled": {
      return {
        ...state,
        addFarmer: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "addFarmer/rejected":
      return {
        ...state,
        addFarmer: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: action.error.message,
        },
      };

    case "clearFarmerSuccessMessage": {
      return {
        ...state,
        addFarmer: {
          ...state.addFarmer,
          successMessage: null,
        },
      };
    }
    case "clearFarmerErrorMessage": {
      return {
        ...state,
        addFarmer: {
          ...state.addFarmer,
          error: null,
          errorMessage: null,
        },
      };
    }
    case "getAllCrops/pending": {
      return { ...state, crops: { ...state.crops, loading: true } };
    }
    case "getAllCrops/fulfilled": {
      return {
        ...state,
        crops: { data: action.payload, loading: false, error: null },
      };
    }
    case "getAllCrops/rejected":
      return {
        ...state,
        farmers: { data: null, loading: false, error: action.payload },
      };
    case "getFarmerByAgentId/pending": {
      return { ...state, farmers: { ...state.crops, loading: true } };
    }
    case "getFarmerByAgentId/fulfilled": {
      return {
        ...state,
        farmers: { data: action.payload, loading: false, error: null },
      };
    }
    case "getFarmerByAgentId/rejected":
      return {
        ...state,
        farms: { data: null, loading: false, error: action.payload },
      };
    case "getFarmByAgentId/pending": {
      return { ...state, farms: { ...state.farms, loading: true } };
    }
    case "getFarmByAgentId/fulfilled": {
      return {
        ...state,
        farms: { data: action.payload, loading: false, error: null },
      };
    }
    case "getFarmByAgentId/rejected":
      return {
        ...state,
        farms: { data: null, loading: false, error: action.payload },
      };

    case "getFarmById/pending": {
      return { ...state, farmbyid: { ...state.farmbyid, loading: true } };
    }
    case "getFarmById/fulfilled": {
      return {
        ...state,
        farmbyid: { data: action.payload, loading: false, error: null },
      };
    }
    case "getFarmById/rejected":
      return {
        ...state,
        farmbyid: { data: null, loading: false, error: action.payload },
      };
    case "createNewFarm/pending": {
      return { ...state, newFarm: { ...state.newFarm, loading: true } };
    }
    case "createNewFarm/fulfilled": {
      return {
        ...state,
        newFarm: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "createNewFarm/rejected":
      return {
        ...state,
        newFarm: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: action.error.message,
        },
      };

    case "clearFarmSuccessMessage": {
      return {
        ...state,
        newFarm: {
          ...state.newFarm,
          successMessage: null,
        },
      };
    }

    case "clearFarmErrorMessage": {
      return {
        ...state,
        newFarm: {
          ...state.newFarm,
          error: null,
          errorMessage: null,
        },
      };
    }

    case "area/pending": {
      return { ...state, area: { ...state.area, loading: true } };
    }
    case "area/fulfilled": {
      return {
        ...state,
        area: { data: action.payload, loading: false, error: null },
      };
    }
    case "area/rejected":
      return {
        ...state,
        area: { data: null, loading: false, error: action.payload },
      };
    case "getAllBanners/pending": {
      return { ...state, banners: { ...state.banners, loading: true } };
    }
    case "getAllBanners/fulfilled": {
      return {
        ...state,
        banners: { data: action.payload, loading: false, error: null },
      };
    }
    case "getAllBanners/rejected":
      return {
        ...state,
        banners: { data: null, loading: false, error: action.payload },
      };
    case "getAllPackages/pending": {
      return { ...state, packages: { ...state.packages, loading: true } };
    }
    case "getAllPackages/fulfilled": {
      return {
        ...state,
        packages: { data: action.payload, loading: false, error: null },
      };
    }
    case "getAllPackages/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };
    case "getForecast/pending": {
      return { ...state, forecast: { ...state.forecast, loading: true } };
    }
    case "getForecast/fulfilled": {
      return {
        ...state,
        forecast: { data: action.payload, loading: false, error: null },
      };
    }
    case "getForecast/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };
    case "getAllCategories/pending": {
      return {
        ...state,
        allCategories: { ...state.allCategories, loading: true },
      };
    }
    case "getAllCategories/fulfilled": {
      return {
        ...state,
        allCategories: { data: action.payload, loading: false, error: null },
      };
    }
    case "getAllCategories/rejected":
      return {
        ...state,
        allCategories: { data: null, loading: false, error: action.payload },
      };
    case "getReportsByFarmId/pending": {
      return { ...state, farmReports: { ...state.farmReports, loading: true } };
    }
    case "getReportsByFarmId/fulfilled": {
      return {
        ...state,
        farmReports: { data: action.payload, loading: false, error: null },
      };
    }
    case "getReportsByFarmId/rejected":
      return {
        ...state,
        farmReports: { data: null, loading: false, error: action.payload },
      };
    case "getReportsByReportId/pending": {
      return {
        ...state,
        reportByReport: { ...state.reportByReport, loading: true },
      };
    }
    case "getReportsByReportId/fulfilled": {
      return {
        ...state,
        reportByReport: { data: action.payload, loading: false, error: null },
      };
    }
    case "getReportsByReportId/rejected":
      return {
        ...state,
        reportByReport: { data: null, loading: false, error: action.payload },
      };
    case "getLegends/pending": {
      return {
        ...state,
        legends: { ...state.legends, loading: true },
      };
    }
    case "getLegends/fulfilled": {
      return {
        ...state,
        legends: { data: action.payload, loading: false, error: null },
      };
    }
    case "getLegends/rejected":
      return {
        ...state,
        legends: { data: null, loading: false, error: action.payload },
      };
    default:
      return state;

    case "jazzcash/pending": {
      return { ...state, jazzcash: { ...state.jazzcash, loading: true } };
    }
    case "jazzcash/fulfilled": {
      return {
        ...state,
        jazzcash: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "jazzcash/rejected":
      return {
        ...state,
        jazzcash: {
          data: null,
          loading: false,
          error: action.error,
          errorMessage: action.error.message,
        },
      };

    case "clearJazzcashResponse": {
      return {
        ...state,
        jazzcash: {
          ...state.jazzcash,
          data: null,
          error: null,
          errorMessage: null,
        },
      };
    }

    case "tokenWithoutId/pending": {
      return {
        ...state,
        tokenWithoutId: { ...state.tokenWithoutId, loading: true },
      };
    }
    case "tokenWithoutId/fulfilled": {
      return {
        ...state,
        tokenWithoutId: { data: action.payload, loading: false, error: null },
      };
    }
    case "tokenWithoutId/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };
    case "tokenWithId/pending": {
      return {
        ...state,
        tokenWithId: { ...state.tokenWithId, loading: true },
      };
    }
    case "tokenWithId/fulfilled": {
      return {
        ...state,
        tokenWithId: { data: action.payload, loading: false, error: null },
      };
    }
    case "tokenWithId/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };

    case "notifications/pending": {
      return {
        ...state,
        notifications: { ...state.notifications, loading: true },
      };
    }
    case "notifications/fulfilled": {
      return {
        ...state,
        notifications: { data: action.payload, loading: false, error: null },
      };
    }
    case "notifications/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };

    case "postJazzcashResponse/pending": {
      return {
        ...state,
        postJazzcashResponse: { ...state.postJazzcashResponse, loading: true },
      };
    }
    case "postJazzcashResponse/fulfilled": {
      return {
        ...state,
        postJazzcashResponse: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case "postJazzcashResponse/rejected":
      return {
        ...state,
        forecast: { data: null, loading: false, error: action.payload },
      };

    case "logout": {
      return {
        ...state,
        logout: {
          ...state.logout,
          message: "Logged Out successfully",
        },
      };
    }

    case "homeCount/pending": {
      return {
        ...state,
        homeCount: { ...state.homeCount, loading: true },
      };
    }
    case "homeCount/fulfilled": {
      return {
        ...state,
        homeCount: { data: action.payload, loading: false, error: null },
      };
    }
    case "homeCount/rejected":
      return {
        ...state,
        homeCount: { data: null, loading: false, error: action.payload },
      };

    case "clearLoginData": {
      return {
        ...state,
        login: {
          ...state.login,
          data: null,
        },
      };
    }
    case "userById/pending": {
      return { ...state, userById: { ...state.userById, loading: true } };
    }
    case "userById/fulfilled": {
      return {
        ...state,
        userById: {
          data: action.payload,
          loading: false,
          error: null,
          successMessage: action.payload.message,
        },
      };
    }
    case "userById/rejected":
      return {
        ...state,
        userById: {
          data: null,
          loading: false,
          error: action.payload,
          errorMessage: action.error.message,
        },
      };

    case "clearUserData": {
      return {
        ...state,
        userById: {
          ...state.userById,
          data: null,
        },
      };
    }
    case "clearLegendsData": {
      return {
        ...state,
        legends: {
          ...state.legends,
          data: null,
        },
      };
    }
    case "clearProvinceData": {
      return {
        ...state,
        provinces: {
          ...state.provinces,
          data: null,
        },
      };
    }
    case "clearDistrictData": {
      return {
        ...state,
        district: {
          ...state.district,
          data: null,
        },
      };
    }
    case "clearCityData": {
      return {
        ...state,
        city: {
          ...state.city,
          data: null,
        },
      };
    }
    case "saveFarmId": {
      return {
        ...state,
        saveFarmId: {
          ...state.saveFarmId,
          data: action.payload,
        },
      };
    }

    case "delFarmByFarmId/pending": {
      return {
        ...state,
        delFarmByFarmId: { ...state.delFarmByFarmId, loading: true },
      };
    }
    case "delFarmByFarmId/fulfilled": {
      return {
        ...state,
        delFarmByFarmId: {
          data: action.payload,
          loading: false,
          successMessage: action.payload.message,
          error: null,
        },
      };
    }
    case "delFarmByFarmId/rejected":
      return {
        ...state,
        delFarmByFarmId: {
          data: null,
          loading: false,
          errorMessage: action.error.message,
          error: action.payload,
        },
      };

    case "cleardelFarmByFarmIdData": {
      return {
        ...state,
        delFarmByFarmId: {
          ...state.delFarmByFarmId,
          data: null,
          successMessage: null,
          errorMessage: null,
        },
      };
    }
    case "savePdfLink": {
      return {
        ...state,
        savePdfLink: {
          ...state.savePdfLink,
          data: action.payload,
        },
      };
    }
    case "appLang": {
      return {
        ...state,
        appLang: {
          ...state.appLang,
          data: action.payload,
        },
      };
    }

    case "updateUserLang/pending": {
      return {
        ...state,
        updateUserLang: { ...state.updateUserLang, loading: true },
      };
    }
    case "updateUserLang/fulfilled": {
      return {
        ...state,
        updateUserLang: { data: action.payload, loading: false, error: null },
      };
    }
    case "updateUserLang/rejected":
      return {
        ...state,
        updateUserLang: { data: null, loading: false, error: action.payload },
      };

    case "getNitrogenImages/pending": {
      return {
        ...state,
        getNitrogenImages: { ...state.getNitrogenImages, loading: true },
      };
    }
    case "getNitrogenImages/fulfilled": {
      return {
        ...state,
        getNitrogenImages: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case "getNitrogenImages/rejected":
      return {
        ...state,
        getNitrogenImages: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };

    case "getPlantImages/pending": {
      return {
        ...state,
        getPlantImages: { ...state.getPlantImages, loading: true },
      };
    }
    case "getPlantImages/fulfilled": {
      return {
        ...state,
        getPlantImages: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case "getPlantImages/rejected":
      return {
        ...state,
        getPlantImages: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };

    case "getWaterImages/pending": {
      return {
        ...state,
        getWaterImages: { ...state.getWaterImages, loading: true },
      };
    }
    case "getWaterImages/fulfilled": {
      return {
        ...state,
        getWaterImages: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case "clearWaterImages": {
      return {
        ...state,
        getWaterImages: {
          ...state.getWaterImages,
          data: null,
        },
      };
    }
    case "clearCarbonImages": {
      return {
        ...state,
        getCarbonImages: {
          ...state.getCarbonImages,
          data: null,
        },
      };
    }
    case "clearPlantHealthImages": {
      return {
        ...state,
        getPlantImages: {
          ...state.getPlantImages,
          data: null,
        },
      };
    }
    case "clearNitrogenImages": {
      return {
        ...state,
        getNitrogenImages: {
          ...state.getNitrogenImages,
          data: null,
        },
      };
    }
    case "getWaterImages/rejected":
      return {
        ...state,
        getWaterImages: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };
    case "getCarbonImages/pending": {
      return {
        ...state,
        getCarbonImages: { ...state.getCarbonImages, loading: true },
      };
    }
    case "getCarbonImages/fulfilled": {
      return {
        ...state,
        getCarbonImages: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    }
    case "getCarbonImages/rejected":
      return {
        ...state,
        getCarbonImages: {
          data: null,
          loading: false,
          error: action.payload,
        },
      };
  }
};
export default reducer;
