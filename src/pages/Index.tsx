
import { useState } from "react";
import Header from "@/components/Header";
import ConsultantCard, { ConsultantProps } from "@/components/ConsultantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

// Моковые данные консультантов
const consultantsData: ConsultantProps[] = [
  {
    id: "1",
    name: "Анна Смирнова",
    position: "Старший консультант",
    specialization: ["Финансы", "Бухгалтерия", "Налоги"],
    rating: 4.8,
    feedbackCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Михаил Петров",
    position: "Бизнес-консультант",
    specialization: ["Стратегия", "Развитие", "Маркетинг"],
    rating: 4.6,
    feedbackCount: 87,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Елена Васильева",
    position: "Юрист-консультант",
    specialization: ["Право", "Документы", "Договоры"],
    rating: 4.9,
    feedbackCount: 201,
    imageUrl: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Дмитрий Иванов",
    position: "ИТ-консультант",
    specialization: ["Технологии", "Автоматизация", "CRM"],
    rating: 4.7,
    feedbackCount: 154,
    imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Ольга Козлова",
    position: "HR-консультант",
    specialization: ["Персонал", "Обучение", "Подбор"],
    rating: 4.5,
    feedbackCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Сергей Морозов",
    position: "Налоговый консультант",
    specialization: ["Налоги", "Оптимизация", "Отчетность"],
    rating: 4.7,
    feedbackCount: 113,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConsultants = consultantsData.filter(consultant => 
    consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.specialization.some(spec => 
      spec.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Герой-секция */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Налаживаем обратную связь между клиентами и консультантами
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                Выбирайте лучших консультантов на основе реальных отзывов. Делитесь своим опытом и помогайте другим принимать правильные решения.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="lg">
                  <Link to="/feedback">Оставить отзыв</Link>
                </Button>
                <Button variant="outline" size="lg">
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секция с консультантами */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Наши консультанты</h2>
                <p className="text-muted-foreground mt-1">Выберите специалиста, который поможет решить ваши задачи</p>
              </div>
              
              <div className="w-full md:w-auto max-w-sm relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени или специализации..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredConsultants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConsultants.map((consultant) => (
                  <ConsultantCard key={consultant.id} {...consultant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">По вашему запросу не найдено консультантов</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Сбросить поиск
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA-секция */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-[800px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold">Поделитесь своим опытом</h2>
              <p className="text-primary-foreground/90 md:text-lg">
                Ваши отзывы помогают улучшать качество консультационных услуг и помогают другим клиентам выбрать подходящего специалиста.
              </p>
              <Button asChild variant="secondary" size="lg" className="mt-2">
                <Link to="/feedback">Оставить отзыв</Link>
              </Button>
            </div>
          </div>
        </section>
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

export default Index;
