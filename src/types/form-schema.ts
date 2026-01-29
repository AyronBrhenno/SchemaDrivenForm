/**
 * Types for Schema-Driven Form Component
 */

export type FieldType = 
  | 'text' 
  | 'email' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio'
  | 'date'
  | 'tel'
  | 'url';

export type FieldValue = string | number | boolean;

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: FieldValue) => string | undefined;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: FieldValue;
  options?: SelectOption[];
  validation?: ValidationRule;
  disabled?: boolean;
  helpText?: string;
}

export interface FormSchema {
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

export interface FormData {
  [key: string]: FieldValue;
}

export interface FormErrors {
  [key: string]: string;
}
