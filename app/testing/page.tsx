"use client";
import React from "react";
import { InputForm } from "@/components/custom/input-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { fakerData } from "@/data/faker-data";
import { toast } from "sonner";

// Define the schema
const FormSchema = z.object({
  full_name: z.string().min(3, { message: "Full Name Required" }),
  pn: z
    .string()
    .min(6, { message: "Personal Number Required" })
    .transform((val) => parseInt(val)),
  phone: z
    .string()
    .min(10, { message: "Phone Numbers Required" })
    .transform((val) => val.replace(/\s+/g, "")),
  saldo: z.string().min(10, { message: "Phone Numbers Required" }),
  birthday: z.date({ message: "Birthday Required" }),
});

const Page = () => {
  const form = useForm<any>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast.info(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <div className="container flex juctify-center items-center h-screen mx-auto">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {fakerData.map((data, idx) => (
          <InputForm
            key={idx}
            type={data.type}
            form={form}
            fieldName={data.value}
            placeholder={data.label}
          />
        ))}
        <Button data-id="button-submit" className="my-5">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Page;
