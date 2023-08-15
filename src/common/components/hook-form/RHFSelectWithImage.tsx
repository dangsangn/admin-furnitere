// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Box,
  Avatar,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import ListBox from '../ListBoxComponent';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  disabledSelect?: boolean;
  listBoxScroll: any; 
  loadingScroll?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSearchSelectWithImage({
  name,
  options,
  labelProp,
  disabledSelect,
  listBoxScroll,
  loadingScroll,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, ...field } }) => (
        <Autocomplete
          {...field}
          disabled={disabledSelect}
          options={options}
          getOptionLabel={(option) => option[labelProp]}
          value={field.value}
          onChange={(event, values) => field.onChange(values)}
          fullWidth
          ListboxComponent={ListBox}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={loadingScroll}
          renderInput={(params) => {
            return (
              <Stack direction={'column'} spacing={2} height={'100%'}>
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  {...other}
                />
              </Stack>
            );
          }}
          renderOption={(props, option) => {
            return (
              <li {...props}>
                <Stack
                  width={'100%'}
                  direction="row"
                  spacing={2}
                  alignItems={'center'}
                  sx={{
                    '&:hover': {
                      borderRadius: '8px',
                      background: '#FFF9DE',
                    },
                  }}
                >
                  <Avatar src={option?.images[0]?.url} alt="" />
                  <Box display={'flex'} ml={3} flexDirection={'column'}>
                    <Typography color={'text.secondary'}>{option[labelProp]}</Typography>
                  </Box>
                </Stack>
              </li>
            );
          }}
          ListboxProps={{
            onScroll: listBoxScroll,
          }}
        />
      )}
    />
  );
}
