"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as XLSX from "xlsx";

type FormData = {
  file: FileList; // Keep this as FileList
};

const excelDataSchema = z.array(
  z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
  })
);

const ExcelUploadForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        file: z
          .any() // Change this to any for simplicity
          .refine(
            (val) => val instanceof FileList && val.length > 0,
            "File is required"
          ),
      })
    ),
  });

console.log('errors:', errors)
  const onSubmit = async (data: FormData) => {
    const file = data.file[0]; // Get the first file from FileList

    // Read the Excel file
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const binaryStr = new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      );

      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Log the parsed data
      console.log("Parsed Excel Data:", jsonData);

      // Validate the parsed data
      try {
        excelDataSchema.parse(jsonData);
        // Handle successful validation (e.g., send to API)
        console.log("Valid data:", jsonData);
      } catch (err) {
        // Set errors in React Hook Form
        if (err instanceof z.ZodError) {
          err.errors.forEach((error) => {
            setError("file", { message: error.message });
          });
          console.log("Invalid data:", err);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} accept=".xlsx, .xls" />
      {errors.file && <p className="text-red-500">{errors.file.message}</p>}
      <button type="submit">Upload</button>
    </form>
  );
};

export default ExcelUploadForm;
