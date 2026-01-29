'use client';

import SchemaDrivenForm from '@/components/SchemaDrivenForm';
import { FormSchema, FormData } from '@/types/form-schema';
import { useState } from 'react';

const exampleSchema: FormSchema = {
  title: 'User Registration Form',
  description: 'Please fill out all required fields to create your account.',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      helpText: 'Enter your first and last name',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john.doe@example.com',
      validation: {
        required: true,
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      validation: {
        pattern: '^[+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,9}$',
      },
      helpText: 'Optional: Include country code',
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: '25',
      validation: {
        required: true,
        min: 18,
        max: 120,
      },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      validation: {
        required: true,
      },
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Australia', value: 'au' },
        { label: 'Germany', value: 'de' },
        { label: 'France', value: 'fr' },
        { label: 'Japan', value: 'jp' },
      ],
    },
    {
      name: 'experience',
      label: 'Experience Level',
      type: 'radio',
      validation: {
        required: true,
      },
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      validation: {
        maxLength: 500,
      },
      helpText: 'Maximum 500 characters',
    },
    {
      name: 'terms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      validation: {
        required: true,
        custom: (value) => {
          if (!value) return 'You must agree to the terms and conditions';
          return undefined;
        },
      },
    },
  ],
  submitLabel: 'Create Account',
};

export default function Home() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted with data:', data);
    setSubmittedData(data);
    
    // Show alert
    alert('Form submitted successfully! Check the console for submitted data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Schema-Driven Form
          </h1>
          <p className="text-lg text-gray-600">
            A reusable React/Next.js component that generates forms from JSON schemas
          </p>
        </div>

        <SchemaDrivenForm schema={exampleSchema} onSubmit={handleSubmit} />

        {submittedData && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Submitted Data:
            </h3>
            <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Example Schema:
          </h3>
          <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(exampleSchema, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
