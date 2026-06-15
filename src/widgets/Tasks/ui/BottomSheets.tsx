import { memo } from 'react';
import { NewTaskBottomSheet } from './NewTaskBottomSheet/NewTaskBottomSheet';
import { ChangeTaskBottomSheet } from './ChangeTaskBottomSheet/ChangeTaskBottomSheet';


export const BottomSheets = memo(() => (
  <>
    <NewTaskBottomSheet />
    <ChangeTaskBottomSheet />
  </>
));