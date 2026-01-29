'use client';
import SchemaDrivenForm, { FormProps } from "@/component/SchemaDrivenForm/SchemaDrivenForm";

export default function Home() {
  const shema: FormProps = {
    modules: [
      {
        id: "module1",
        name: "User Information",
        columns: [
          {
            id: "column1",
            rows: [
              {
                id: "row1",
                type: "text",
                placeholder: "Enter your name",
              },
            ],
          },
          {
            id: "column2",
            rows: [
              {
                id: "row2",
                type: "email",
                placeholder: "Enter your email",
              },
            ],
          },
        ],
      },
      {
        id: "module2",
        name: "Preferences",
        columns: [
          {
            id: "column3",
            rows: [
              {
                id: "row3",
                type: "select",
                placeholder: "Select your country",
                options: ["USA", "Canada", "UK"],
              },
            ],
          },
          {
            id: "column4",
            rows: [
              {
                id: "row4",
                type: "checkbox",
                placeholder: "Subscribe to newsletter",
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <>
      <SchemaDrivenForm modules={shema.modules} />
    </>
  );
}
