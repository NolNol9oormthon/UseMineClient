import axios from 'axios';

export const getAllData = async (category: string, cursorId: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_DB_HOST}/items`,
      params: { category, cursorId },
      headers: { contentType: 'application/json' },
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
      url: `${process.env.NEXT_PUBLIC_DB_HOST}/items/${id}`,
      headers: {
        contentType: 'application/json',
        'Logined-User': Number(localStorage.getItem('userId')),
      },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const login = async (id: number, profileUrl: string) => {
  const returnValue = 0;
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

export const getMyData = async (userId: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: process.env.NEXT_PUBLIC_DB_HOST + `/my-items`,
      headers: { contentType: 'application/json', 'Logined-User': userId },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const deleteItem = async (itemId: number, userId: number) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: process.env.NEXT_PUBLIC_DB_HOST + `/items/${itemId}`,
      headers: { contentType: 'application/json', 'Logined-User': userId },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const patchItem = async (itemId: number, userId: number, state: string) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: process.env.NEXT_PUBLIC_DB_HOST + `/items/${itemId}`,
      params: { state },
      headers: { contentType: 'application/json', 'Logined-User': userId },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};
