import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListBox from '../../../common/components/ListBoxComponent';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  listBoxScroll?: any;
  loadingScroll?: boolean;
  isLoading?: boolean;
  disableClear?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelectPagination({
  name,
  options,
  labelProp,
  listBoxScroll,
  loadingScroll,
  isLoading,
  disableClear,
  ...other
}: Props) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const [value, setValue] = useState<any>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { ref, ...field } }) => {
        if (field.value !== undefined) setValue(field.value);
        return (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option[labelProp] || ''}
            disableClearable={disableClear}
            value={value}
            onChange={(event, value) => {
              field.onChange(value);
              setValue(value);
            }}
            fullWidth
            ListboxComponent={ListBox}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={isLoading ? isLoading : loadingScroll}
            loadingText={t('loading')}
            noOptionsText={t('noOptions')}
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
                    <Box display={'flex'} ml={3} flexDirection={'column'}>
                      <Typography color={'text.secondary'}>
                        {option[labelProp]}
                      </Typography>
                    </Box>
                  </Stack>
                </li>
              );
            }}
            ListboxProps={{
              onScroll: listBoxScroll,
            }}
          />
        );
      }}
    />
  );
}
