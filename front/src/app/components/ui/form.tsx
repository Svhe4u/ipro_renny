// src/components/ui/form.tsx

export const Form = ({ children }: { children: React.ReactNode }) => {
    return <form>{children}</form>;
  };
  
  export const FormField = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  };
  
  export const FormItem = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  };
  
  export const FormLabel = ({ children }: { children: React.ReactNode }) => {
    return <label>{children}</label>;
  };
  
  export const FormControl = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  };
  
  export const FormDescription = ({ children }: { children: React.ReactNode }) => {
    return <p>{children}</p>;
  };
  
  export const FormMessage = ({ children }: { children: React.ReactNode }) => {
    return <span>{children}</span>;
  };
  