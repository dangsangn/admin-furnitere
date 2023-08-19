import { ReactNode } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
// @mui
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import EditorToolbar, {
  formats,
  redoChange,
  undoChange,
  imageHandler,
} from './EditorToolbar';
import hljs from 'highlight.js';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: 640,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

export interface Props extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: ReactNode;
  sx?: BoxProps;
  disable?: boolean;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  disable,
  ...other
}: Props) {
  const { t } = useTranslation();
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
        image: imageHandler,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    // syntax: { highlight: (text: any) => hljs.highlightAuto(text).value},
    syntax: false,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <Box sx={{ display: disable ? 'none' : 'flex' }}>
          <EditorToolbar id={id} isSimple={simple} />
        </Box>
        <ReactQuill
          value={value}
          readOnly={disable}
          onChange={onChange}
          modules={modules}
          formats={formats}
          bounds={'.category__text-editor'}
          placeholder={t('productMerchant.new.descriptionPlacehoder')}
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
