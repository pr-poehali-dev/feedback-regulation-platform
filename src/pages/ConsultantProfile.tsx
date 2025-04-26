
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Mail, Phone, Calendar, MessageSquare, Award, ThumbsUp, ThumbsDown } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";

// Моковые данные консультанта
const consultantsData = {
  "1": {
    id: "1",
    name: "Анна Смирнова",
    position: "Старший консультант",
    specialization: ["Финансы", "Бухгалтерия", "Налоги"],
    rating: 4.8,
    experience: "8 лет",
    description: "Анна специализируется на финансовом консалтинге для малого и среднего бизнеса. Имеет опыт работы с различными отраслями и помогает оптимизировать финансовые процессы, улучшить отчетность и снизить налоговые риски.",
    contacts: {
      email: "anna.smirnova@consult.ru",
      phone: "+7 (999) 123-45-67"
    },
    feedbacks: [
      {
        id: "f1",
        author: "Иван Соколов",
        date: "15.03.2025",
        rating: 5,
        text: "Анна помогла нам оптимизировать налоговую нагрузку и навести порядок в бухгалтерии. Очень профессиональный подход и внимание к деталям.",
      },
      {
        id: "f2",
        author: "Мария Котова",
        date: "02.02.2025",
        rating: 5,
        text: "Отличный специалист! Благодаря рекомендациям Анны мы смогли сократить расходы и улучшить финансовые потоки компании. Рекомендую!",
      },
      {
        id: "f3",
        author: "Алексей Петров",
        date: "20.01.2025",
        rating: 4,
        text: "Качественная консультация по финансовым вопросам. Единственный минус - долго ждал ответа на некоторые вопросы, но в целом доволен результатом.",
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  "2": {
    id: "2",
    name: "Михаил Петров",
    position: "Бизнес-консультант",
    specialization: ["Стратегия", "Развитие", "Маркетинг"],
    rating: 4.6,
    experience: "10 лет",
    description: "Михаил помогает компаниям разрабатывать и внедрять стратегии развития, оптимизировать бизнес-процессы и выходить на новые рынки. Специализируется на инновационных решениях и цифровой трансформации бизнеса.",
    contacts: {
      email: "mikhail.petrov@consult.ru",
      phone: "+7 (999) 765-43-21"
    },
    feedbacks: [
      {
        id: "f1",
        author: "Сергей Иванов",
        date: "05.04.2025",
        rating: 5,
        text: "Михаил разработал для нас отличную стратегию выхода на новый рынок. Уже через 3 месяца мы увидели первые результаты!",
      },
      {
        id: "f2",
        author: "Анна Кузнецова",
        date: "18.03.2025",
        rating: 4,
        text: "Профессиональный подход к делу. Михаил помог нам выявить слабые места в бизнес-процессах и предложил работающие решения.",
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  }
};

// Определение типа для отзыва с полями like/dislike
interface Feedback {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  liked?: boolean;
  disliked?: boolean;
}

const ConsultantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  // Делаем копию отзывов, чтобы можно было модифицировать
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(
    (id && consultantsData[id as keyof typeof consultantsData]?.feedbacks) || []
  );
  
  // Проверяем, существует ли консультант с таким ID
  if (!id || !consultantsData[id as keyof typeof consultantsData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Консультант не найден</h1>
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const consultant = consultantsData[id as keyof typeof consultantsData];
  
  const handleFeedbackReaction = (feedbackId: string, reaction: 'like' | 'dislike') => {
    setFeedbacks(prevFeedbacks => 
      prevFeedbacks.map(feedback => {
        if (feedback.id === feedbackId) {
          if (reaction === 'like') {
            return {
              ...feedback,
              liked: !feedback.liked,
              disliked: false
            };
          } else {
            return {
              ...feedback,
              disliked: !feedback.disliked,
              liked: false
            };
          }
        }
        return feedback;
      })
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка - информация о консультанте */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={consultant.imageUrl} 
                        alt={consultant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold text-center">{consultant.name}</h1>
                    <p className="text-muted-foreground mb-2">{consultant.position}</p>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{consultant.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-sm">
                        ({consultant.feedbacks.length} {consultant.feedbacks.length === 1 ? 'отзыв' : 
                          (consultant.feedbacks.length >= 2 && consultant.feedbacks.length <= 4) ? 'отзыва' : 'отзывов'})
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {consultant.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => setActiveTab("feedback")}
                    >
                      Оставить отзыв
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Контактная информация</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{consultant.contacts.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{consultant.contacts.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Опыт работы: {consultant.experience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Правая колонка - вкладки */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">О консультанте</TabsTrigger>
                  <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                  <TabsTrigger value="feedback">Оставить отзыв</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="font-semibold text-xl mb-4">Об эксперте</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {consultant.description}
                      </p>
                      
                      <div className="border rounded-lg p-4 bg-secondary/30 mb-6">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Специализация
                        </h3>
                        <ul className="space-y-2">
                          {consultant.specialization.map((spec, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-primary">•</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button onClick={() => setActiveTab("feedback")} className="w-full">
                        Оставить отзыв
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="font-semibold text-xl mb-4">
                        Отзывы клиентов ({feedbacks.length})
                      </h2>
                      
                      {feedbacks.length > 0 ? (
                        <div className="space-y-6">
                          {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="border-b pb-6 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">{feedback.author}</h3>
                                  <p className="text-sm text-muted-foreground">{feedback.date}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground mb-3">
                                {feedback.text}
                              </p>
                              
                              <div className="flex items-center gap-4">
                                <button 
                                  className={`flex items-center gap-1 text-sm ${feedback.liked ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                                  onClick={() => handleFeedbackReaction(feedback.id, 'like')}
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  Полезно
                                </button>
                                <button 
                                  className={`flex items-center gap-1 text-sm ${feedback.disliked ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                                  onClick={() => handleFeedbackReaction(feedback.id, 'dislike')}
                                >
                                  <ThumbsDown className="h-3.5 w-3.5" />
                                  Не полезно
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                          <p className="text-muted-foreground">Пока нет отзывов</p>
                          <Button 
                            variant="link" 
                            onClick={() => setActiveTab("feedback")}
                            className="mt-2"
                          >
                            Будьте первым, кто оставит отзыв
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="feedback" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="font-semibold text-xl mb-6">
                        Оставить отзыв о консультанте
                      </h2>
                      
                      <FeedbackForm 
                        preselectedConsultantId={consultant.id}
                        consultants={[{ id: consultant.id, name: consultant.name }]}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 КонсалтФидбэк. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultantProfile;
