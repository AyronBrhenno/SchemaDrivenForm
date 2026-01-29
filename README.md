# SchemaDrivenForm

A reusable React/Next.js component that generates complete, structured forms from a JSON-based schema.

## Features

- ✨ **Schema-driven**: Define your forms using simple JSON schemas
- 🎨 **Fully styled**: Beautiful, responsive design out of the box
- ✅ **Built-in validation**: Required fields, min/max length, patterns, and custom validators
- 🔧 **TypeScript support**: Full type safety with TypeScript
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- ♿ **Accessible**: ARIA attributes for screen readers
- 🎯 **Multiple field types**: Text, email, number, textarea, select, checkbox, radio, date, tel, url

## Installation

```bash
npm install
# or
yarn install
```

## Quick Start

```tsx
import SchemaDrivenForm from '@/components/SchemaDrivenForm';
import { FormSchema } from '@/types/form-schema';

const schema: FormSchema = {
  title: 'Contact Form',
  description: 'Get in touch with us',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validation: { required: true },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: { required: true },
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      validation: { required: true, maxLength: 500 },
    },
  ],
  submitLabel: 'Send Message',
};

function MyForm() {
  const handleSubmit = async (data) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return <SchemaDrivenForm schema={schema} onSubmit={handleSubmit} />;
}
```

## Schema Definition

### FormSchema Interface

```typescript
interface FormSchema {
  title?: string;           // Form title
  description?: string;     // Form description
  fields: FormField[];      // Array of form fields
  submitLabel?: string;     // Submit button text (default: "Submit")
}
```

### FormField Interface

```typescript
interface FormField {
  name: string;              // Unique field identifier
  label: string;             // Field label
  type: FieldType;          // Field type (see below)
  placeholder?: string;      // Placeholder text
  defaultValue?: any;        // Default value
  options?: SelectOption[]; // Options for select/radio fields
  validation?: ValidationRule; // Validation rules
  disabled?: boolean;        // Disable the field
  helpText?: string;        // Help text displayed below field
}
```

### Field Types

- `text` - Standard text input
- `email` - Email input with validation
- `number` - Number input
- `textarea` - Multi-line text area
- `select` - Dropdown select
- `checkbox` - Checkbox input
- `radio` - Radio button group
- `date` - Date picker
- `tel` - Telephone number
- `url` - URL input

### Validation Rules

```typescript
interface ValidationRule {
  required?: boolean;        // Field is required
  minLength?: number;        // Minimum string length
  maxLength?: number;        // Maximum string length
  min?: number;             // Minimum number value
  max?: number;             // Maximum number value
  pattern?: string;         // Regex pattern
  custom?: (value: any) => string | undefined; // Custom validator
}
```

## Examples

### Registration Form

```typescript
const registrationSchema: FormSchema = {
  title: 'User Registration',
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: { required: true },
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
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
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
      ],
      validation: { required: true },
    },
  ],
  submitLabel: 'Register',
};
```

### Survey Form

```typescript
const surveySchema: FormSchema = {
  title: 'Customer Satisfaction Survey',
  fields: [
    {
      name: 'satisfaction',
      label: 'How satisfied are you with our service?',
      type: 'radio',
      options: [
        { label: 'Very Satisfied', value: '5' },
        { label: 'Satisfied', value: '4' },
        { label: 'Neutral', value: '3' },
        { label: 'Dissatisfied', value: '2' },
        { label: 'Very Dissatisfied', value: '1' },
      ],
      validation: { required: true },
    },
    {
      name: 'feedback',
      label: 'Additional Feedback',
      type: 'textarea',
      placeholder: 'Share your thoughts...',
    },
    {
      name: 'recommend',
      label: 'Would you recommend us to others?',
      type: 'checkbox',
    },
  ],
};
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the example form.

## Build

```bash
npm run build
```

## License

MIT License - see LICENSE file for details.

