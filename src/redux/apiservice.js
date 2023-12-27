import axios from "axios";

export const getotp = async (phone) => {
    try {
      const response = await axios.post('https://lms.growpak.store:9090/api/auth/otp', {phone:phone});
      console.log(response.data)
      return response.data;
    } catch (error) {
        console.log(error,'err')
      throw error;
    }
  };