import axios from "axios";

export default {
  async getMode() {
    try {
      const data = await axios.get(
        "https://starnavi-frontend-test-task.herokuapp.com/game-settings"
      );
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async getWinners() {
    try {
      const data = await axios.get(
        "https://starnavi-frontend-test-task.herokuapp.com/winners"
      );
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async postWinners(obj) {
    try {
      const data = await axios.post(
        "https://starnavi-frontend-test-task.herokuapp.com/winners",
        obj
      );
      console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
