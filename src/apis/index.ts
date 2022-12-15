import axios from 'axios';

export const getAllData = async (category: string, cursorId: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://3.34.62.141:58287/items',
      params: { category, cursorId },
      headers: { contentType: 'application/json', 'Logined-User': 999 },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const getDetailData = async (id: number) => {
  try {
    console.log(id);
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


export const login = async (id: number, profileUrl: string) => {
  let returnValue = 0;
  const result = await axios.post(
    process.env.NEXT_PUBLIC_DB_HOST + `/login`,
    `{"id":"${id}", "profileUrl":"${profileUrl}"}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Logined-User': 999,
      },
    },
  );

  return result.data;
};

export const createItem = async (formData: FormData) => {
  let returnValue = {};

  const result = await axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_DB_HOST + `/items`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((data) => {
      // returnValue = JSON.parse(result);
      // console.log(returnValue);
      console.log(data);
      returnValue = data;
    })
    .catch((error) => console.log('error', error));

  return returnValue;
  // return result.data;
};
