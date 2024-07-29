import { useForm } from "react-hook-form";

export const useReportAccordion = () => {
  const methods = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    onSubmit,
    methods,
  };
};
