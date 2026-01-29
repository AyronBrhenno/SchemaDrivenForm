'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FormSchema, FormData, FormErrors, FormField, FieldValue } from '@/types/form-schema';
import styles from './SchemaDrivenForm.module.css';

interface SchemaDrivenFormProps {
  schema: FormSchema;
  onSubmit: (data: FormData) => void | Promise<void>;
  className?: string;
}

export default function SchemaDrivenForm({ schema, onSubmit, className }: SchemaDrivenFormProps) {
  const [formData, setFormData] = useState<FormData>(() => {
    const initialData: FormData = {};
    schema.fields.forEach(field => {
      initialData[field.name] = field.defaultValue ?? '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: FormField, value: FieldValue): string | undefined => {
    const validation = field.validation;
    if (!validation) return undefined;

    if (validation.required && !value) {
      return `${field.label} is required`;
    }

    if (validation.minLength && typeof value === 'string' && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
      return `${field.label} must be no more than ${validation.maxLength} characters`;
    }

    if (validation.min !== undefined && typeof value === 'number' && value < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }

    if (validation.max !== undefined && typeof value === 'number' && value > validation.max) {
      return `${field.label} must be no more than ${validation.max}`;
    }

    if (validation.pattern && typeof value === 'string' && value.length > 0) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return `${field.label} format is invalid`;
      }
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    schema.fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      disabled: field.disabled || isSubmitting,
      className: styles.input,
      'aria-describedby': field.helpText ? `${field.name}-help` : undefined,
      'aria-invalid': errors[field.name] ? true : undefined,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={String(formData[field.name] || '')}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            {...commonProps}
            value={String(formData[field.name] || '')}
            onChange={handleChange}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            {...commonProps}
            type="checkbox"
            checked={Boolean(formData[field.name])}
            onChange={handleChange}
            className={styles.checkbox}
          />
        );

      case 'radio':
        return (
          <div className={styles.radioGroup}>
            {field.options?.map(option => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  disabled={field.disabled || isSubmitting}
                  className={styles.radio}
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            value={String(formData[field.name] || '')}
            onChange={handleChange}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            value={String(formData[field.name] || '')}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className || ''}`}>
      {schema.title && <h2 className={styles.title}>{schema.title}</h2>}
      {schema.description && <p className={styles.description}>{schema.description}</p>}
      
      <div className={styles.fields}>
        {schema.fields.map(field => (
          <div key={field.name} className={styles.fieldGroup}>
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
              {field.validation?.required && <span className={styles.required}>*</span>}
            </label>
            
            {renderField(field)}
            
            {field.helpText && (
              <p id={`${field.name}-help`} className={styles.helpText}>
                {field.helpText}
              </p>
            )}
            
            {errors[field.name] && (
              <p className={styles.error} role="alert">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : (schema.submitLabel || 'Submit')}
      </button>
    </form>
  );
}
