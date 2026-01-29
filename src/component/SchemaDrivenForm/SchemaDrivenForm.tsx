'use client';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React from 'react';
import DynamicInput from '../DynamicInput/DynamicInput';

export interface Row {
  id: string;
  type: string;
  placeholder: string;
  options?: string[]; //used only when the input has options.
}

export interface Column {
  id: string;
  rows: Row[];
}

export interface Module {
  id: string;
  name: string;
  columns: Column[];
}

export interface FormProps {
  modules: Module[];
}

const SchemaDrivenForm: React.FC<FormProps> = ({ modules }) => {
  if (!modules?.length) return <div>No module data available.</div>;

  return (
    <div>
      <form>
      {modules.map(field => (
        <Paper
          key={field.id}
          style={{
            margin: '0px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            marginLeft: '10%',
            marginRight: '10%',
            marginBottom: '15px',
            marginTop: '15px',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {field.name}
          </Typography>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {field.columns.map((column, columnIndex) => (
              <Paper
                key={columnIndex}
                style={{
                  flex: 1,
                  maxWidth: '30%',
                  backgroundColor: '#cccccc',
                  marginLeft: '5px',
                  marginRight: '5px',
                  width: 'fit-content',
                  padding: '10px',
                }}
              >
                <DynamicInput row={column.rows[0]} />
              </Paper>
            ))}
          </div>
        </Paper>
      ))}
      </form>
    </div>
  );
};


export default SchemaDrivenForm;