'use client';

import React from 'react';
import { TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Row } from '../SchemaDrivenForm/SchemaDrivenForm';

interface DynamicInputProps {
  row: Row;
  value?: string | number | boolean;
  options?: string[];
  onChange?: (value: string | number | boolean) => void;
}

const DynamicInput: React.FC<DynamicInputProps> = ({ row, value, onChange }) => {
  switch (row.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <TextField
          type={row.type}
          placeholder={row.placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          fullWidth
          variant="outlined"
        />
      );
    
    case 'number':
      return (
        <TextField
          type="number"
          placeholder={row.placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          fullWidth
          variant="outlined"
        />
      );
    
    case 'select':
      return (
        <Select
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>{row.placeholder}</MenuItem>
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
              checked={typeof value === 'boolean' ? value : false}
              onChange={(e) => onChange?.(e.target.checked)}
            />
          }
          label={row.placeholder}
        />
      );
    
    case 'textarea':
      return (
        <TextField
          placeholder={row.placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      );
    
    default:
      return <TextField placeholder={row.placeholder} fullWidth />;
  }
};

export default DynamicInput;