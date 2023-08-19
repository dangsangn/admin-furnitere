// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            inputRef={ref}
            fullWidth
            value={
              typeof field.value === 'number' && field.value === 0 ? '' : field.value
            }
            error={!!error}
            helperText={error?.message}
            sx={{ zIndex: 0 }}
            {...other}
            onWheel={(event) => {
              event.currentTarget.querySelector('input')?.blur();
              event.stopPropagation();
            }}
          />
        );
      }}
    />
  );
}
