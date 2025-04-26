
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  email: z.string().email({
    message: "Введите корректный email",
  }),
  consultantId: z.string({
    required_error: "Выберите консультанта",
  }),
  rating: z.string({
    required_error: "Выберите оценку",
  }),
  message: z.string().min(10, {
    message: "Отзыв должен содержать минимум 10 символов",
  }),
});

interface FeedbackFormProps {
  preselectedConsultantId?: string;
  consultants: { id: string; name: string }[];
}

const FeedbackForm = ({ preselectedConsultantId, consultants }: FeedbackFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      consultantId: preselectedConsultantId || "",
      rating: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Отзыв отправлен",
        description: "Спасибо за ваш отзыв. Он будет опубликован после модерации.",
      });
      form.reset();
    }, 1500);
    
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ваше имя" {...field} />
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
                  <Input placeholder="example@mail.ru" {...field} />
                </FormControl>
                <FormDescription>
                  Мы не будем делиться вашим email ни с кем
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="consultantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Консультант</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value} 
                  disabled={!!preselectedConsultantId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите консультанта" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {consultants.map((consultant) => (
                      <SelectItem key={consultant.id} value={consultant.id}>
                        {consultant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Оценка</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите оценку" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5">5 - Отлично</SelectItem>
                    <SelectItem value="4">4 - Хорошо</SelectItem>
                    <SelectItem value="3">3 - Удовлетворительно</SelectItem>
                    <SelectItem value="2">2 - Плохо</SelectItem>
                    <SelectItem value="1">1 - Очень плохо</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш отзыв</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Опишите ваш опыт работы с консультантом..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Поделитесь подробностями вашего взаимодействия
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить отзыв"}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
