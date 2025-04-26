
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

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
  overallRating: z.string({
    required_error: "Выберите общую оценку",
  }),
  knowledgeRating: z.number().min(1).max(10),
  communicationRating: z.number().min(1).max(10),
  timelinessRating: z.number().min(1).max(10),
  recommendLikelihood: z.string({
    required_error: "Укажите вероятность рекомендации",
  }),
  satisfactionLevel: z.string({
    required_error: "Выберите уровень удовлетворенности",
  }),
  strongPoints: z.string().min(5, {
    message: "Пожалуйста, опишите сильные стороны консультанта",
  }).optional(),
  improvementAreas: z.string().min(5, {
    message: "Пожалуйста, опишите области для улучшения",
  }).optional(),
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
      overallRating: "",
      knowledgeRating: 5,
      communicationRating: 5,
      timelinessRating: 5,
      recommendLikelihood: "",
      satisfactionLevel: "",
      strongPoints: "",
      improvementAreas: "",
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
        
        <div className="p-4 bg-primary/5 rounded-lg border">
          <h3 className="font-semibold mb-4">Оценка работы консультанта</h3>
          
          <FormField
            control={form.control}
            name="overallRating"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Общая оценка</FormLabel>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <FormField
              control={form.control}
              name="knowledgeRating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Профессиональные знания</FormLabel>
                  <div className="flex flex-col space-y-2">
                    <Slider
                      value={[value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>{value}</span>
                      <span>10</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="communicationRating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Коммуникация</FormLabel>
                  <div className="flex flex-col space-y-2">
                    <Slider
                      value={[value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>{value}</span>
                      <span>10</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timelinessRating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Своевременность</FormLabel>
                  <div className="flex flex-col space-y-2">
                    <Slider
                      value={[value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>{value}</span>
                      <span>10</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="satisfactionLevel"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Насколько вы удовлетворены результатом работы?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="very-satisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Очень доволен</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="satisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Доволен</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="neutral" />
                      </FormControl>
                      <FormLabel className="font-normal">Нейтрально</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="dissatisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Недоволен</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="very-dissatisfied" />
                      </FormControl>
                      <FormLabel className="font-normal">Очень недоволен</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="recommendLikelihood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Насколько вероятно, что вы порекомендуете этого консультанта?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите вероятность" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="10">10 - Определенно порекомендую</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="5">5 - Возможно порекомендую</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="0">0 - Точно не порекомендую</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="strongPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сильные стороны консультанта</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Что вам особенно понравилось в работе консультанта?" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="improvementAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Области для улучшения</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Что можно было бы улучшить?" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
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
              <FormLabel>Детальный отзыв</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Расскажите подробнее о вашем опыте работы с консультантом..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Поделитесь подробностями вашего взаимодействия для помощи другим клиентам
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
