import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceType } from "@/constants/serviceType";

import { MultiSelect } from "@/components/MultiSelect";
import { useMutation } from "@apollo/client";
import { REGISTER_LEAD } from "@/graphql/mutations";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().length(11, {
    message: "Provide your 11 digit mobile number",
  }),
  postcode: z.string().length(4, {
    message: "Provide a 4 digit postcode",
  }),
  services: z.array(
    z.enum(Object.values(ServiceType) as [string, ...string[]])
  ),
});

const RegisterInterestForm = () => {
  const [createLead, { data, loading, error }] = useMutation(REGISTER_LEAD);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      postcode: "",
      services: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    createLead({
      variables: {
        data: values,
      },
    }).then(() => {
      form.reset();
      toast("Created successfully", {
        style: { backgroundColor: "#4db34d", color: "white" },
      });
    });
  };

  const onError = () => {
    toast("Something went wrong", {
      style: { backgroundColor: "#ff3333", color: "white" },
    });
  };

  if (error) {
    toast("Something went wrong", {
      style: { backgroundColor: "#ff3333", color: "white" },
    });
  }
  return (
    <Card className="bg-white w-md">
      <CardHeader>
        <CardTitle className="text-lg">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            onError={onError}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@email.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="09xxxxxxxxxxx"
                      {...field}
                      maxLength={11}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx" {...field} maxLength={4} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-blue-500 text-white cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterInterestForm;
