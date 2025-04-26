
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";

// Моковые данные консультантов для выбора в форме
const consultants = [
  { id: "1", name: "Анна Смирнова" },
  { id: "2", name: "Михаил Петров" },
  { id: "3", name: "Елена Васильева" },
  { id: "4", name: "Дмитрий Иванов" },
  { id: "5", name: "Ольга Козлова" },
  { id: "6", name: "Сергей Морозов" },
];

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Оставьте отзыв о консультанте</h1>
              <p className="text-muted-foreground">
                Ваше мнение поможет другим клиентам и консультантам стать лучше
              </p>
            </div>
            
            <FeedbackForm consultants={consultants} />
          </div>
          
          <div className="mt-8 bg-secondary/50 rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Почему важно оставлять отзывы?</h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Помогаете другим клиентам выбрать подходящего консультанта</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Даёте консультантам возможность улучшить свои услуги</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Повышаете общее качество консалтинговых услуг</span>
              </li>
            </ul>
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

export default Feedback;
