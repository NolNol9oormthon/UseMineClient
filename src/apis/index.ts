import axios from 'axios';

export const getMyData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://43.201.147.29:50883/items/1',
      headers: { contentType: 'application/json', 'Logined-User': 123 },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};
