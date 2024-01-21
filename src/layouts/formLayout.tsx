import { ReactNode } from "react";
import { FormProvider } from "src/contexts/formContext";

interface FormLayoutProps {
  children: ReactNode;
  formType: string;
}

const FormLayout = ({ children, formType }: FormLayoutProps) => {
  return (
    <FormProvider formType={formType}>
      {children}
    </FormProvider>
  )
}

export default FormLayout;
