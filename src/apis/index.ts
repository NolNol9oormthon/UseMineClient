import axios from 'axios';

export const getAllData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://3.34.62.141:58287/items',
      headers: { contentType: 'application/json', 'Logined-User': 999 },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const getDetailData = async (id: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://3.34.62.141:58287/items/${id}`,
      headers: { contentType: 'application/json', 'Logined-User': 999 },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};
