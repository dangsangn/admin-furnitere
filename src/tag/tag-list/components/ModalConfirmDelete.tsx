import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import en from '../../../common/locales/en';
import { dispatch, useSelector } from '../../../common/redux/store';
import { useDeleteMultiTag } from '../hooks/useDeleteMultiTag';
import { setPopupDelete } from '../tag.slice';
import useMessage from '../../../common/hooks/useMessage';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const { t } = useTranslation();
  const { isPopupDelete, idsDelete } = useSelector((state) => state.tagList);
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const { mutate } = useDeleteMultiTag({
    onSuccess: () => showSuccessSnackbar(t('tag.list.successBar')),
    onError: () => showErrorSnackbar(t('tag.list.errorBar')),
  });

  const handleDeleteTag = () => {
    mutate({ ids: idsDelete });
    dispatch(setPopupDelete(false));
  };

  const handleClose = () => {
    dispatch(setPopupDelete(false));
  };
  return (
    <>
      <Dialog
        open={isPopupDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('tag.list.confirmDelete')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Stack spacing={3} direction="row">
            <Button variant="contained" color="error" onClick={handleDeleteTag}>
              {t('delete')}
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {t('cancel')}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
