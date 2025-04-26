
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, FileTextIcon, ShieldAlertIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";

// Типы вопросов и ответов
type Answer = {
  value: string;
  label: string;
  score: number;
};

type Question = {
  id: string;
  text: string;
  category: string;
  answers: Answer[];
};

type RiskResult = {
  category: string;
  score: number;
  level: 'low' | 'medium' | 'high';
  recommendations: string[];
};

// Данные вопросов
const questions: Question[] = [
  {
    id: "q1",
    text: "Как часто ваша компания проводит аудит финансовой отчетности?",
    category: "Финансовые риски",
    answers: [
      { value: "a1", label: "Не проводим", score: 3 },
      { value: "a2", label: "Раз в год", score: 2 },
      { value: "a3", label: "Раз в полгода", score: 1 },
      { value: "a4", label: "Ежеквартально", score: 0 }
    ]
  },
  {
    id: "q2",
    text: "Есть ли у вас актуальные юридические документы для всех сделок и контрактов?",
    category: "Юридические риски",
    answers: [
      { value: "a1", label: "Нет, часто работаем без документов", score: 3 },
      { value: "a2", label: "Только для крупных сделок", score: 2 },
      { value: "a3", label: "Да, но не всегда обновляем их", score: 1 },
      { value: "a4", label: "Да, все документы актуальны и проверены юристами", score: 0 }
    ]
  },
  {
    id: "q3",
    text: "Как часто вы проводите тренинги для сотрудников по безопасности?",
    category: "Операционные риски",
    answers: [
      { value: "a1", label: "Никогда не проводили", score: 3 },
      { value: "a2", label: "Только при найме", score: 2 },
      { value: "a3", label: "Раз в год", score: 1 },
      { value: "a4", label: "Ежеквартально", score: 0 }
    ]
  },
  {
    id: "q4",
    text: "Есть ли у вас резервные фонды на случай непредвиденных обстоятельств?",
    category: "Финансовые риски",
    answers: [
      { value: "a1", label: "Нет", score: 3 },
      { value: "a2", label: "Минимальные резервы", score: 2 },
      { value: "a3", label: "Резервы на 1-3 месяца работы", score: 1 },
      { value: "a4", label: "Существенные резервы на полгода и более", score: 0 }
    ]
  },
  {
    id: "q5",
    text: "Как организована защита персональных данных в вашей компании?",
    category: "Юридические риски",
    answers: [
      { value: "a1", label: "Никак не защищаем", score: 3 },
      { value: "a2", label: "Базовая защита", score: 2 },
      { value: "a3", label: "Следуем рекомендациям по защите данных", score: 1 },
      { value: "a4", label: "Комплексная система защиты с регулярным аудитом", score: 0 }
    ]
  },
  {
    id: "q6",
    text: "Насколько диверсифицирован ваш бизнес?",
    category: "Операционные риски",
    answers: [
      { value: "a1", label: "Один продукт/услуга, один рынок", score: 3 },
      { value: "a2", label: "Несколько продуктов/услуг, один рынок", score: 2 },
      { value: "a3", label: "Несколько продуктов/услуг, несколько рынков", score: 1 },
      { value: "a4", label: "Полностью диверсифицированный бизнес", score: 0 }
    ]
  }
];

// Рекомендации по категориям и уровням риска
const recommendations = {
  "Финансовые риски": {
    high: [
      "Немедленно организуйте аудит финансовой отчетности",
      "Создайте резервный фонд для непредвиденных расходов",
      "Разработайте план реагирования на кассовые разрывы"
    ],
    medium: [
      "Увеличьте частоту финансовых проверок",
      "Автоматизируйте систему мониторинга денежных потоков",
      "Рассмотрите возможность привлечения финансового консультанта"
    ],
    low: [
      "Продолжайте регулярный мониторинг финансовых показателей",
      "Разработайте долгосрочный финансовый план",
      "Рассмотрите дополнительные возможности оптимизации"
    ]
  },
  "Юридические риски": {
    high: [
      "Срочно проведите аудит юридической документации",
      "Наймите юриста или заключите договор с юридической фирмой",
      "Обновите все договоры в соответствии с текущим законодательством"
    ],
    medium: [
      "Систематизируйте юридические документы",
      "Разработайте шаблоны для типовых договоров",
      "Организуйте регулярные консультации с юристом"
    ],
    low: [
      "Поддерживайте актуальность юридической документации",
      "Следите за изменениями в законодательстве",
      "Проводите регулярную проверку соответствия деятельности нормативам"
    ]
  },
  "Операционные риски": {
    high: [
      "Проведите полный аудит бизнес-процессов",
      "Разработайте план обеспечения непрерывности бизнеса",
      "Внедрите системы резервного копирования данных"
    ],
    medium: [
      "Организуйте тренинги для сотрудников по безопасности",
      "Автоматизируйте ключевые бизнес-процессы",
      "Рассмотрите возможности для диверсификации бизнеса"
    ],
    low: [
      "Продолжайте совершенствовать операционные процессы",
      "Внедряйте инновационные решения для оптимизации",
      "Регулярно обновляйте планы реагирования на чрезвычайные ситуации"
    ]
  }
};

export default function RiskAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<RiskResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Расчет результатов
      calculateResults(newAnswers);
    }
  };
  
  const calculateResults = (finalAnswers: Record<string, string>) => {
    // Группируем вопросы по категориям
    const categoryGroups: Record<string, Question[]> = {};
    questions.forEach(q => {
      if (!categoryGroups[q.category]) {
        categoryGroups[q.category] = [];
      }
      categoryGroups[q.category].push(q);
    });
    
    // Рассчитываем баллы по категориям
    const categoryResults: RiskResult[] = [];
    
    Object.entries(categoryGroups).forEach(([category, categoryQuestions]) => {
      let totalScore = 0;
      
      categoryQuestions.forEach(q => {
        const answerValue = finalAnswers[q.id];
        const answer = q.answers.find(a => a.value === answerValue);
        if (answer) {
          totalScore += answer.score;
        }
      });
      
      // Нормализуем оценку в процентах от максимально возможной
      const maxPossibleScore = categoryQuestions.length * 3; // 3 - максимальный балл за вопрос
      const normalizedScore = (totalScore / maxPossibleScore) * 100;
      
      // Определяем уровень риска
      let level: 'low' | 'medium' | 'high';
      if (normalizedScore < 33) {
        level = 'low';
      } else if (normalizedScore < 66) {
        level = 'medium';
      } else {
        level = 'high';
      }
      
      // Получаем рекомендации
      const categoryRecs = recommendations[category as keyof typeof recommendations];
      const levelRecs = categoryRecs[level as keyof typeof categoryRecs];
      
      categoryResults.push({
        category,
        score: normalizedScore,
        level,
        recommendations: levelRecs
      });
    });
    
    setResults(categoryResults);
    setShowResults(true);
  };
  
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Проверьте рискоустойчивость вашего бизнеса
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Ответьте на несколько вопросов, чтобы получить персональную оценку рисков 
            и рекомендации от наших экспертов.
          </p>
        </div>
        
        {!showResults ? (
          <Card className="max-w-2xl mx-auto shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="mb-2">
                  {currentQuestion.category}
                </Badge>
                <span className="text-sm text-gray-500">
                  Вопрос {currentQuestionIndex + 1} из {questions.length}
                </span>
              </div>
              <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
              <Progress value={progress} className="h-2 mt-4" />
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={answers[currentQuestion.id] || ""}
                className="space-y-4 mt-4"
              >
                {currentQuestion.answers.map((answer) => (
                  <div key={answer.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={answer.value} 
                      id={answer.value}
                      onClick={() => handleAnswer(answer.value)}
                      className="cursor-pointer"
                    />
                    <Label 
                      htmlFor={answer.value} 
                      className="cursor-pointer flex-grow"
                    >
                      {answer.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
              >
                Назад
              </Button>
              <Button 
                onClick={() => {
                  if (answers[currentQuestion.id]) {
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                      calculateResults(answers);
                    }
                  }
                }}
                disabled={!answers[currentQuestion.id]}
                className="bg-purple-700 hover:bg-purple-800"
              >
                {currentQuestionIndex < questions.length - 1 ? "Далее" : "Завершить тест"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Результаты оценки рисков</CardTitle>
                <CardDescription>
                  На основе ваших ответов мы подготовили анализ рисков для вашего бизнеса
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">{result.category}</h3>
                        <Badge 
                          className={
                            result.level === 'low' ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            result.level === 'medium' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                            "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {result.level === 'low' ? "Низкий риск" : 
                           result.level === 'medium' ? "Средний риск" : 
                           "Высокий риск"}
                        </Badge>
                      </div>
                      
                      <Progress 
                        value={result.score} 
                        className={`h-2 mb-4 ${
                          result.level === 'low' ? "bg-green-100" :
                          result.level === 'medium' ? "bg-yellow-100" :
                          "bg-red-100"
                        }`}
                      />
                      
                      <div className="pl-4 border-l-2 border-gray-200">
                        <h4 className="font-medium mb-2">Рекомендации:</h4>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="flex items-start space-x-2">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {index < results.length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Button 
                  variant="outline" 
                  onClick={restartTest}
                  className="w-full sm:w-auto"
                >
                  Пройти тест снова
                </Button>
                <Button 
                  className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800"
                  onClick={() => {
                    // Можно добавить логику сохранения или отправки результатов
                    alert("Результаты сохранены. Наш консультант свяжется с вами в ближайшее время.");
                  }}
                >
                  Получить полный отчет
                </Button>
              </CardFooter>
            </Card>
            
            <div className="bg-purple-50 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <ShieldAlertIcon className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-purple-900">Что дальше?</h3>
              </div>
              
              <p className="text-purple-800 mb-6">
                На основе результатов теста наши эксперты могут разработать детальный план 
                минимизации рисков для вашего бизнеса. Оставьте заявку на консультацию.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-3">
                  <AlertCircleIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Индивидуальная стратегия</h4>
                    <p className="text-sm text-gray-600">
                      Разработаем план с учетом специфики вашего бизнеса
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-3">
                  <FileTextIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Документация</h4>
                    <p className="text-sm text-gray-600">
                      Подготовим все необходимые документы и регламенты
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button className="bg-purple-700 hover:bg-purple-800">
                  Записаться на консультацию
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
