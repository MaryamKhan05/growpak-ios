import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

//http://192.168.18.16
//https://lms.growpak.store:9090

export const getCountryCode = createAsyncThunk("getCountryCode", async () => {
  try {
    const response = await axios.get(
      "https://lms.growpak.store:9090/api/auth/phone"
    );
    // console.log("getCountryCode", response);
    return response.data;
  } catch (error) {
    console.log(error, "err-getCountryCode");
    throw error;
  }
});

export const setPhoneNumber = createAsyncThunk(
  "setMobileNumber",
  async (mobileNumber, thunkAPI) => {
    return mobileNumber;
  }
);

export const getOtp = createAsyncThunk("getOtp", async (phone) => {
  console.log(phone, "....");
  try {
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/auth/otp",
      { phone: phone }
    );
    console.log(response.data.message, "otp");
    let successMessage = "Success";
    return { data: response.data, message: response.data.message };
  } catch (error) {
    console.log(error.response.data, "err-getOtp");
    const errorMessage = "Failed!";
    throw { error, message: errorMessage };
  }
});

export const clearOtpSuccessMessage = () => {
  return {
    type: "clearOtpSuccessMessage",
  };
};

export const clearOtpErrorMessage = () => {
  return {
    type: "clearOtpErrorMessage",
  };
};

export const clearOtpS = () => {
  return {
    type: "clearOtpS",
  };
};

export const clearOtpE = () => {
  return {
    type: "clearOtpE",
  };
};

export const signUp = createAsyncThunk("signup", async (data) => {
  console.log(data, "data signup");
  try {
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/auth/register",
      {
        phone: data.mobilenumber,
        name: data.name,
        email: data.email,
        password: data.pin,
        dob: data.dob,
        gender: data.gender,
        guid: "",
        country: data.countryid,
        province: data.provinceid,
        district: data.districtid,
        city: data.cityid,
        type: data.profession,
        version: "1.0",
        buy_sell: "0",
        image: data.imageBase64,
      }
    );
    console.log("response-signup", response.data);
    const token = response.data.data.token;
    const userId = response.data.data.uid;
    const type = response.data.data.type;
    await AsyncStorage.setItem("type", JSON.stringify(type));
    await AsyncStorage.setItem("userId", JSON.stringify(userId));
    await AsyncStorage.setItem("token", token);
    console.log(response.data, "signup res");
    return { data: response.data, message: response.data.message };
  } catch (e) {
    console.log("err-signUp", e.response.data);
    throw e.response.data.message;
  }
});

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (data) => {
    try {
      const response = await axios.post(
        "https://lms.growpak.store:9090/api/auth/forgotPassword",
        {
          phone: `+92${data.phone}`,
          password: data.pin,
          otp: data.otp,
        }
      );
      console.log("response-forget", response.data.message);

      const token = response.data.data.token;
      const userId = response.data.data.uid;
      const type = response.data.data.type;
      await AsyncStorage.setItem("type", JSON.stringify(type));
      await AsyncStorage.setItem("userId", JSON.stringify(userId));
      await AsyncStorage.setItem("token", token);

      return { data: response.data, message: response.data.message };
    } catch (e) {
      console.log("err-forget", e.response.data);
      let errorMessage = e.response.data.message;
      throw e.response.data.message;
    }
  }
);

export const clearSignupSuccessMessage = () => {
  return {
    type: "clearSignupSuccessMessage",
  };
};

export const clearSignupErrorMessage = () => {
  return {
    type: "clearSignupErrorMessage",
  };
};

export const clearForgetSuccessMessage = () => {
  return {
    type: "clearForgetSuccessMessage",
  };
};

export const clearForgetErrorMessage = () => {
  return {
    type: "clearForgetErrorMessage",
  };
};

export const getAllCountries = createAsyncThunk("getAllCountries", async () => {
  try {
    const response = await axios.get(
      "https://lms.growpak.store:9090/api/address/allCountries",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log("res-getAllCountries", response.data.message);
    return response.data;
  } catch (e) {
    console.log("err - all countries", e);
    throw e;
  }
});

export const getProvinceByCountry = createAsyncThunk(
  "getProvinceByCountry",
  async (countryId) => {
    try {
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/address/provinceByCountry?countryId=${countryId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      // console.log("res-getProvinceByCountry", response.data);
      return await response.data;
    } catch (e) {
      console.log("err - getProvinceByCountry", e);
      throw e;
    }
  }
);

export const getDistrictByProvince = createAsyncThunk(
  "getDistrictByProvince",
  async (provinceId) => {
    try {
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/address/districtByProvince?provinceCode=${provinceId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("res-getDistrictByProvince", response.data.message);
      return response.data;
    } catch (e) {
      console.log("err - getDistrictByProvince", e);
      throw e;
    }
  }
);

export const getCityByDistrict = createAsyncThunk(
  "getCityByDistrict",
  async (districtId) => {
    try {
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/address/cityByDistrict?districtCode=${districtId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      // console.log("res-getCityByDistrict", response.data.data);
      return response.data;
    } catch (e) {
      console.log("err - getCityByDistrict", e);
      throw e;
    }
  }
);

export const getWeather = createAsyncThunk("getWeather", async (data) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=ad8002cea80d8a201ab060549d53aa8d&units=metric`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(
      "res-getWeather",
      response.data.weather[0].description,
      response.data.weather[0].icon
    );
    return response.data;
  } catch (e) {
    console.log("err - getWeather", e);
    throw e;
  }
});

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/auth/loginWithPin",
      {
        phone_no: data.mobile,
        pin: data.pin,
      }
    );
    console.log("res-login", response.data);

    const token = response.data.data.token;
    await AsyncStorage.setItem("token", token);

    const id = response.data.data.uid;
    await AsyncStorage.setItem("userId", JSON.stringify(id));

    const type = response.data.data.type;
    await AsyncStorage.setItem("type", JSON.stringify(type));
    console.log(response.data, "login response");
    console.log(response.data, "login res ");
    return { data: response.data, message: response.data.message };
  } catch (e) {
    console.log("err - login", e.response.data.message);
    throw e.response.data.message;
  }
});

export const saveToken = (token) => {
  return {
    type: "saveToken",
    payload: token,
  };
};

export const deleteToken = () => {
  return {
    type: "deleteToken",
  };
};

export const clearLoginSuccessMessage = () => {
  return {
    type: "clearLoginSuccessMessage",
  };
};

export const clearLoginErrorMessage = () => {
  return {
    type: "clearLoginErrorMessage",
  };
};

export const geoLocation = createAsyncThunk("geolocation", async (data) => {
  const lat = data[0].latitude;
  const lng = data[0].longitude;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=administrative_area_level_3&key=AIzaSyCX3wyd3NDo0ISXkOaNRXL5vxUH98jkOsA`
    );
    // console.log("res-geolocation", response.data.results);
    return response.data.results[0];
  } catch (e) {
    console.log("err - geolocation", e);
    throw e;
  }
});

export const addFarmer = createAsyncThunk("addFarmer", async (data) => {
  console.log(data);
  try {
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/farmer/agentFarmer",
      {
        phone: data.phone,
        name: data.name,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
        guid: "",
        country: data.countryid,
        province: data.provinceid,
        district: data.districtid,
        city: data.cityid,
        buy_sell: "0",
        version: "1.0",
        image: data.imageBase64,
        agentid: id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("res-addFarmeriiii", response.data);
    return { data: response.data, message: response.data.message };
  } catch (error) {
    console.log("err - addFarhhhmer:::::::::", error.response.data);
    let errorMessage = error.response.data.message;
    throw errorMessage;
  }
});

export const clearFarmerSuccessMessage = () => {
  return {
    type: "clearFarmerSuccessMessage",
  };
};

export const clearFarmerErrorMessage = () => {
  return {
    type: "clearFarmerErrorMessage",
  };
};

export const getAllCrops = createAsyncThunk("getAllCrops", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "https://lms.growpak.store:9090/api/farm/allCrops",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-getAllCrops", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getAllCrops", e.response.data);
    throw e;
  }
});

export const getFarmerByAgentId = createAsyncThunk(
  "getFarmerByAgentId",
  async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/farmer/getFarmerByAgentId?uid=${id}`,
        // "https://lms.growpak.store:9090/api/farmer/getFarmerByAgentId?uid=1",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getFarmerByAgentId", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getFarmerByAgentId", e.response.data);
      throw e;
    }
  }
);

export const createNewFarm = createAsyncThunk("createNewFarm", async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    const area = await AsyncStorage.getItem("area");
    const a = JSON.parse(area);
    console.log(a, "data in create farm ");
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/farm/createFarm",
      {
        uid: id,
        farmer_name: data.farmerId,
        farm_name: data.name,
        crop_name: data.countryid,
        variety_name: data.variety,
        city: data.city,
        province: data.province,
        sow_date: data.sowDate,
        harvest_date: data.reapDate,
        ffd: data.mendmentDate1,
        ffn: data.mendmentName1,
        sfd: data.mendmentDate2,
        sfn: data.mendmentName2,
        delete: "",
        created_by: id,
        image: data.farmBase64,
        area: a,
        coordinates: data.COORDS,
        rep_lang: data.languageValue,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await AsyncStorage.removeItem("coords");
    console.log(response.data);
    await AsyncStorage.removeItem("area");

    return { data: response.data, message: "Farm Created Successfully" };
  } catch (e) {
    let errorMessage = e.response?.data?.errors[0]?.msg;
    console.log("err - createNewFarm", errorMessage);
    throw errorMessage;
  }
});

export const clearFarmSuccessMessage = () => {
  return {
    type: "clearFarmSuccessMessage",
  };
};

export const clearFarmErrorMessage = () => {
  return {
    type: "clearFarmErrorMessage",
  };
};

export const getFarmByAgentId = createAsyncThunk(
  "getFarmByAgentId",
  async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/farm/getFarmsByUserId?uid=${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getFarmByAgentId", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getFarmByAgentId", e.response.data);
      throw e;
    }
  }
);

export const getFarmsById = createAsyncThunk("getFarmById", async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    // const userId = await AsyncStorage.getItem("userId");
    // const id = JSON.parse(userId);
    const response = await axios.get(
      `https://lms.growpak.store:9090/api/farm/getFarmsById?fid=${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-getFarmsById", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getFarmsById", e.response.data);
    throw e;
  }
});

export const getAllBanners = createAsyncThunk("getAllBanners", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "https://lms.growpak.store:9090/api/generic/allBanners",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-getAllBanners", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getAllBanners", e.response.data);
    throw e;
  }
});

export const getAllPackages = createAsyncThunk("getAllPackages", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "https://lms.growpak.store:9090/api/generic/allPackages",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-getAllPackages", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getAllPackages", e.response.data);
    throw e;
  }
});

export const getForecast = createAsyncThunk("getForecast", async (data) => {
  console.log("data", data);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.long}&appid=ad8002cea80d8a201ab060549d53aa8d&units=metric`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log("res-getForecast", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getForecast", e);
    throw e;
  }
});

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "https://lms.growpak.store:9090/api/category/allCategories",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getAllCategories", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getAllCategories", e);
      throw e;
    }
  }
);

export const getReportsByFarmId = createAsyncThunk(
  "getReportsByFarmId",
  async (data) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/reportsByFarmId?fid=${data}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getReportsByFarmId", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getReportsByFarmId", e.response.data);
      throw e;
    }
  }
);

export const getReportsByReportId = createAsyncThunk(
  "getReportsByReportId",
  async (data) => {
    console.log(data, "dtaa in getReportsByReportId");
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/reportDetailByReportId?rid=${data}`,
        // `https://lms.growpak.store:9090/api/reports/reportDetailByReportId?rid=59`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getReportsByReportId", response.data.data);
      return response.data;
    } catch (e) {
      console.log("err - getReportsByReportId", e.response.data);
      throw e;
    }
  }
);

export const getLegends = createAsyncThunk("getLegends", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `https://lms.growpak.store:9090/api/reports/getLegends`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-getLegends", response.data);
    return response.data;
  } catch (e) {
    console.log("err - getLegends", e.response.data);
    throw e;
  }
});

export const jazzcash = createAsyncThunk("jazzcash", async (data) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/payments/jazzCashPayment",
      {
        phone_no: data.phone,
        cnic: data.cnic,
        // amount: "1" + "00",
        amount: data.a + "00",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("res-jazzcash", response.data);
    return response.data;
  } catch (error) {
    console.log("err - jazzcash", error.response.data);
    throw error;
  }
});

export const tokenWithoutId = createAsyncThunk(
  "tokenWithoutId",
  async (data) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "https://lms.growpak.store:9090/api/auth/tokenWithOutUserId",
        {
          platform: data.platform,
          token: data.token,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("res-tokenWithoutId", response.data);
      return response.data;
    } catch (error) {
      console.log("err - tokenWithoutId", error.response.data);
      throw e;
    }
  }
);

export const tokenWithId = createAsyncThunk("tokenWithId", async (data) => {
  try {
    console.log(data, "data in token with id :::::::");
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    console.log(id, "user id");
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      "https://lms.growpak.store:9090/api/auth/tokenWithUserId",
      {
        user_id: id,
        token: data.token,
        platform: data.platform,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("res-tokenWithId::::::", response.data);
    return { data: response.data, message: response.data.message };
  } catch (e) {
    let error = e.response?.data?.errors[0]?.msg;
    console.log("err - tokenWithId:::::", error.response.data);
    throw error;
  }
});

export const clearJazzcashResponse = () => {
  return {
    type: "clearJazzcashResponse",
  };
};

export const notifications = createAsyncThunk("notifications", async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    // console.log(id);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `https://lms.growpak.store:9090/api/notifications/notificationsByUserId?uid=${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-notifications", response.data);
    return response.data;
  } catch (e) {
    console.log("err - notifications", e.response.data);
    throw e;
  }
});

export const postJazzcashResponse = createAsyncThunk(
  "postJazzcashResponse",
  async (data) => {
    console.log("jazzzzzzcahshhshshshhshshshhshs");
    console.log(data, "jazz data");
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "https://lms.growpak.store:9090/api/payments/jazzcashResponse",
        {
          fid: data.fId,
          cnic: data.cnic,
          txnRefNo: data.tRefNo,
          merchantID: data.merchantId,
          billReference: data.billRef,
          txnDateTime: data.tDateTime,
          secureHash: data.secureHash,
          retreivalReferenceNo: data.retRefNo,
          txnCurrency: data.tCurr,
          price: data.amount,
          paymentType: 1,
          originalPrice: data.amount,
          package: data.pId,
          language: data.lan,
          responseCode: data.resCode,
          responseMessage: data.resMsg,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("res-postJazzcashResponse::::::", response.data);
      return response.data;
    } catch (error) {
      console.log("err - postJazzcashResponse:::::", error.response.data);
      throw e;
    }
  }
);

export const logout = () => {
  console.log("yesss logout ");
  return {
    type: "logout",
  };
};
export const clearLoginData = () => {
  console.log("clearLoginData ");
  return {
    type: "clearLoginData",
  };
};

export const homeCount = createAsyncThunk("homeCount", async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `https://lms.growpak.store:9090/api/dashboard/dashboardCount?uid=${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-homeCount", response.data);
    return response.data;
  } catch (e) {
    console.log("err - homeCount", e.response.data);
    throw e;
  }
});

export const getUserById = createAsyncThunk("userById", async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const id = JSON.parse(userId);
    // console.log(id);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `https://lms.growpak.store:9090/api/auth/getUserById?user_id=${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res-userById", response.data);
    return response.data;
  } catch (e) {
    console.log("err - userById", e.response.data);
    throw e;
  }
});

export const clearUserData = () => {
  return {
    type: "clearUserData",
  };
};

export const clearLegendsData = () => {
  return {
    type: "clearLegendsData",
  };
};

export const clearProvinceData = () => {
  return {
    type: "clearProvinceData",
  };
};

export const clearDistrictData = () => {
  return {
    type: "clearDistrictData",
  };
};

export const clearCityData = () => {
  return {
    type: "clearCityData",
  };
};
export const saveFarmId = (data) => {
  return {
    type: "saveFarmId",
    payload: [data.id, data.name, data.area],
  };
};
export const savePdfLink = (data) => {
  return {
    type: "savePdfLink",
    payload: data,
  };
};

export const delFarmByFarmId = createAsyncThunk(
  "delFarmByFarmId",
  async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `https://lms.growpak.store:9090/api/farm/deleteFarmByFarmId?fid=${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res-delFarmByFarmId", response.data);
      return { data: response.data, message: response.data.message };
    } catch (e) {
      console.log("err - delFarmByFarmId", e.response.data);
      throw e;
    }
  }
);
export const cleardelFarmByFarmIdData = () => {
  return {
    type: "cleardelFarmByFarmIdData",
  };
};

export const appLang = (data) => {
  return {
    type: "appLang",
    payload: data,
  };
};

export const updateUserLang = createAsyncThunk(
  "updateUserLang",
  async (data) => {
    console.log(
      data,
      id,
      "language::::::::::; languagelanguagelanguagelanguagelanguage ,,,,,,,,,,,,,,,,,,"
    );
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      console.log(token, "llsllslslslljdjdjdhffg");
      const response = await axios.patch(
        `https://lms.growpak.store:9090/api/farmer/updateUserLanguage?lang=${data}&uid=${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res-updateUserLang", response.data);
      return response.data;
    } catch (e) {
      console.log("err - updateUserLang", e.response.data);
      throw e;
    }
  }
);

export const getNitrogenImages = createAsyncThunk(
  "getNitrogenImages",
  async (fid) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/getNitrogenImage?fid=${fid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res-getNitrogenImages", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getNitrogenImages", e.response.data);
      throw e;
    }
  }
);

export const getPlantImages = createAsyncThunk(
  "getPlantImages",
  async (fid) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/getPlantImage?fid=${fid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.warn("res-getPlantImages", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getPlantImages", e.response.data);
      throw e;
    }
  }
);

export const getWaterImages = createAsyncThunk(
  "getWaterImages",
  async (fid) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/getWaterImage?fid=${fid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.warn("res-getWaterImages", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getWaterImages", e.response.data);
      throw e;
    }
  }
);

export const getCarbonImages = createAsyncThunk(
  "getCarbonImages",
  async (fid) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const id = JSON.parse(userId);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://lms.growpak.store:9090/api/reports/getSOCImage?fid=${fid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.warn("res-getCarbonImages", response.data);
      return response.data;
    } catch (e) {
      console.log("err - getCarbonImages", e.response.data);
      throw e;
    }
  }
);

export const clearWaterImages = () => {
  return {
    type: "clearWaterImages",
  };
};

export const clearCarbonImages = () => {
  return {
    type: "clearCarbonImages",
  };
};

export const clearPlantHealthImages = () => {
  return {
    type: "clearPlantHealthImages",
  };
};

export const clearNitrogenImages = () => {
  return {
    type: "clearNitrogenImages",
  };
};
