// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Define the types for the form data
// interface FormData {
//   name: string;
//   framework: string;
// }

// export default function CardWithForm() {
//   // State to manage form data
//   const [formData, setFormData] = React.useState<FormData>({
//     name: "",
//     framework: "",
//   });

//   // Handle form data change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData); // For now, you can log the form data or send it to an API
//   };

//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Create project</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Name of your project"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select
//                 value={formData.framework}
//                 onValueChange={(value) =>
//                   setFormData((prevData) => ({ ...prevData, framework: value }))
//                 }
//               >
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline">Cancel</Button>
//             <Button type="submit">Deploy</Button>
//           </CardFooter>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


import Header from '../../components/Header';  // Adjusted path to match the correct location
import {LoginForm} from '../../components/login-form';  // Adjusted path to match the correct location



export default function Home() {
  return (
    <div>
      <Header />  {/* This renders the header component */}
      <LoginForm />  {/* This renders the login form component */}
      <main>
        <h1>Welcome to the main page!</h1>
        {/* Other content */}
      </main>
    </div>
  );
}
