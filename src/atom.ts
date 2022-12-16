import { atom } from 'recoil';

import { MyDataProps } from '../pages/mypage';

export const myDataState = atom({
  key: 'myDataState',
  default: { completedItems: [], notCompletedItems: [] } as MyDataProps,
});
