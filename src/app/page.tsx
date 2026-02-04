'use client';
import SchemaDrivenForm, { FormProps, Module } from "@/component/SchemaDrivenForm/SchemaDrivenForm";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function Home() {
  const schema: Module[] = [
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
                name: "userName",
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
                name: "userEmail",
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
                name: "userCountry",
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
                name: "subscribeNewsletter",
              },
            ],
          },
        ],
    },
  ];

  const Schema = yup.object().shape({
    userName: yup.string().required("Name is required"),
    userEmail: yup.string().email("Invalid email format").required("Email is required"),
    userCountry: yup.string().required("Country is required"),
    subscribeNewsletter: yup.boolean(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      resolver: yupResolver(Schema) 
    }
  );
  return (
    <>
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <SchemaDrivenForm modules={schema} control={control} />
      <Button variant="contained" color="primary" type="submit" style={{marginLeft: '10%', marginBottom: '20px'}}>
        Submit
      </Button>
    </form>
    </>
  );
}
