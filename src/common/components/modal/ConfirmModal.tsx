import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  type: ConfirmModalType;
  text: string;
};
const mapTypeToColor: Record<
  ConfirmModalType,
  | 'error'
  | 'success'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | undefined
> = {
  delete: 'error',
  warning: 'warning',
};

export const ConfirmModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose, onSubmit, type, text } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: 'black!important', opacity: '0.2!important' },
        }}
        PaperProps={{
          sx: {
            boxShadow: 0,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirmModal.content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="contained">
            {t('confirmModal.cancel')}
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              onClose();
            }}
            color={mapTypeToColor[type]}
            autoFocus
            variant="contained"
          >
            {t('confirmModal.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
