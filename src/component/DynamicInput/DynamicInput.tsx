'use client';

import React from 'react';
import { TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Row } from '../SchemaDrivenForm/SchemaDrivenForm';

interface DynamicInputProps<TFieldValues extends FieldValues = FieldValues> {
  row: Row;
  control: Control<TFieldValues>;
  name: string;
}

const DynamicInput = React.forwardRef<
  HTMLDivElement,
  DynamicInputProps
>(({ row, control, name }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        switch (row.type) {
          case 'text':
            return (
              <TextField
                {...field}
                type="text"
                placeholder={row.placeholder}
                fullWidth
                value={field.value}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
              />
            );
          case 'email':
            return (
              <TextField
                {...field}
                type={row.type}
                placeholder={row.placeholder}
                fullWidth
                value={field.value}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
              />
            );
          case 'password':
            return (
              <TextField
                {...field}
                type="password"
                placeholder={row.placeholder}
                fullWidth
                value={field.value}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
              />
            );
          case 'number':
            return (
              <TextField
                {...field}
                type="number"
                placeholder={row.placeholder}
                fullWidth
                value={field.value}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
              />
            );
          case 'select':
            return (
              <Select
                {...field}
                fullWidth
                value={field.value}
                displayEmpty
                error={!!error}
              >
                <MenuItem value="">{row.placeholder}</MenuItem>
                {row.options?.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            );
          case 'checkbox':
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value || false}
                  />
                }
                label={row.placeholder}
              />
            );
          case 'textarea':
            return (
              <TextField
                {...field}
                placeholder={row.placeholder}
                fullWidth
                value={field.value}
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
              />
            );
          default:
            return <TextField {...field} placeholder={row.placeholder} fullWidth />;
        }
      }}
    />
  );
});

DynamicInput.displayName = 'DynamicInput';
export default DynamicInput;