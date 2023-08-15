// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, Autocomplete } from '@mui/material';
import ListBox from '../ListBoxComponent';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: Array<any>;
  labelProp: string;
  valueProp?: string;
  disableSelect?:boolean;
  multiple?: boolean;
  disableOptionProps?: string;
};

type Props = IProps & TextFieldProps;

export default function RHFSearchSelect({
  name,
  options,
  labelProp,
  valueProp,
  disableSelect,
  multiple,
  disableOptionProps,
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
          options={options}
          multiple={multiple}
          disableCloseOnSelect={multiple}
          value={field.value}
          getOptionLabel={(option) => option[labelProp]}
          getOptionDisabled={(option) => option[disableOptionProps as string] === 0}
          onChange={(event, values) => field.onChange(values)}
          fullWidth
          disabled={disableSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          ListboxComponent={ListBox}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
        />
      )}
    />
  );
}
