
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpRight, Shield, AlertTriangle, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Типы рисков
type RiskCategory = 'financial' | 'legal' | 'operational';
type Risk = {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  position: { x: number; y: number };
  solution: string;
};

// Данные о рисках
const risksData: Risk[] = [
  {
    id: "risk-1",
    title: "Налоговые проверки",
    description: "Неправильное ведение бухгалтерии может привести к штрафам при налоговой проверке.",
    category: "financial",
    severity: "high",
    position: { x: 30, y: 40 },
    solution: "Наши эксперты проводят предварительный аудит и готовят компанию к проверкам."
  },
  {
    id: "risk-2",
    title: "Проблемы с договорами",
    description: "Некорректно составленные договоры могут привести к юридическим спорам.",
    category: "legal",
    severity: "medium",
    position: { x: 70, y: 30 },
    solution: "Юридический отдел составляет и проверяет все договоры на соответствие законодательству."
  },
  {
    id: "risk-3",
    title: "Нарушение трудового законодательства",
    description: "Несоблюдение норм трудового права может привести к искам от сотрудников.",
    category: "legal",
    severity: "high",
    position: { x: 60, y: 70 },
    solution: "Проводим аудит HR-процессов и обновляем внутренние нормативные документы."
  },
  {
    id: "risk-4",
    title: "Сбои в операционных процессах",
    description: "Сбои в логистике и производстве могут привести к задержкам и потере клиентов.",
    category: "operational",
    severity: "medium",
    position: { x: 20, y: 60 },
    solution: "Внедряем системы мониторинга и автоматизации для минимизации сбоев."
  },
  {
    id: "risk-5",
    title: "Кассовые разрывы",
    description: "Проблемы с ликвидностью могут привести к неспособности выполнять обязательства.",
    category: "financial",
    severity: "critical",
    position: { x: 50, y: 20 },
    solution: "Разрабатываем стратегии управления ликвидностью и планирования денежных потоков."
  },
  {
    id: "risk-6",
    title: "Утечка данных",
    description: "Нарушение защиты данных может привести к штрафам и репутационным потерям.",
    category: "operational",
    severity: "critical",
    position: { x: 80, y: 50 },
    solution: "Внедряем комплексные системы защиты информации и проводим обучение персонала."
  }
];

// Цвета для уровней риска
const severityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
};

// Иконки для категорий
const categoryIcons = {
  financial: <Briefcase className="h-4 w-4" />,
  legal: <Shield className="h-4 w-4" />,
  operational: <AlertTriangle className="h-4 w-4" />
};

export default function RiskMapVisualization() {
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [activeCategory, setActiveCategory] = useState<RiskCategory | 'all'>('all');

  const filteredRisks = activeCategory === 'all' 
    ? risksData 
    : risksData.filter(risk => risk.category === activeCategory);

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Интерактивная карта рисков бизнеса</CardTitle>
          <CardDescription>
            Изучите распространенные риски и узнайте, как наша компания помогает их минимизировать
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value as RiskCategory | 'all')}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Все риски</TabsTrigger>
              <TabsTrigger value="financial">Финансовые</TabsTrigger>
              <TabsTrigger value="legal">Юридические</TabsTrigger>
              <TabsTrigger value="operational">Операционные</TabsTrigger>
            </TabsList>
            
            <div className="relative bg-gray-100 rounded-lg h-[500px] w-full overflow-hidden">
              {/* Условная тепловая карта рисков (можно заменить на реальное изображение) */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 opacity-50"></div>
              
              {/* Точки рисков */}
              <TooltipProvider>
                {filteredRisks.map((risk) => (
                  <Tooltip key={risk.id}>
                    <TooltipTrigger asChild>
                      <button
                        className={`absolute rounded-full border-2 ${
                          risk.severity === 'critical' ? 'w-8 h-8 animate-pulse border-red-500' :
                          risk.severity === 'high' ? 'w-7 h-7 border-orange-500' :
                          risk.severity === 'medium' ? 'w-6 h-6 border-yellow-500' :
                          'w-5 h-5 border-green-500'
                        } transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                          risk.severity === 'critical' ? 'bg-red-200' :
                          risk.severity === 'high' ? 'bg-orange-200' :
                          risk.severity === 'medium' ? 'bg-yellow-200' :
                          'bg-green-200'
                        }`}
                        style={{
                          left: `${risk.position.x}%`,
                          top: `${risk.position.y}%`
                        }}
                        onClick={() => setSelectedRisk(risk)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{risk.title}</p>
                      <p className="text-xs text-gray-500">{risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} риск</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
              
              {/* Легенда */}
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
                <p className="text-sm font-medium mb-2">Уровни риска:</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-200 border-2 border-red-500"></span>
                    <span className="text-xs">Критический</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-200 border-2 border-orange-500"></span>
                    <span className="text-xs">Высокий</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-200 border-2 border-yellow-500"></span>
                    <span className="text-xs">Средний</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-200 border-2 border-green-500"></span>
                    <span className="text-xs">Низкий</span>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Детали выбранного риска */}
      {selectedRisk && (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={severityColors[selectedRisk.severity]}>
                  {selectedRisk.severity === 'low' ? 'Низкий' : 
                   selectedRisk.severity === 'medium' ? 'Средний' : 
                   selectedRisk.severity === 'high' ? 'Высокий' : 'Критический'} риск
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {categoryIcons[selectedRisk.category]}
                  {selectedRisk.category === 'financial' ? 'Финансовый' : 
                   selectedRisk.category === 'legal' ? 'Юридический' : 'Операционный'}
                </Badge>
              </div>
              <CardTitle className="mt-2">{selectedRisk.title}</CardTitle>
              <CardDescription className="mt-1">{selectedRisk.description}</CardDescription>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600" 
              onClick={() => setSelectedRisk(null)}
            >
              ✕
            </button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Как мы решаем эту проблему:</h4>
              <p className="text-gray-700">{selectedRisk.solution}</p>
            </div>
            <Button asChild>
              <Link to="/risk-assessment" className="gap-2">
                Проверить риски вашего бизнеса
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CTA если нет выбранного риска */}
      {!selectedRisk && (
        <div className="text-center py-4">
          <p className="text-lg mb-4">Выберите точку на карте или пройдите тест для оценки рисков вашего бизнеса</p>
          <Button asChild size="lg">
            <Link to="/risk-assessment" className="gap-2">
              Пройти тест на рискоустойчивость
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
