
import { Helmet } from "react-helmet";
import RiskMapVisualization from "@/components/RiskMapVisualization";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

export default function RiskMap() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Карта рисков бизнеса | Консалтинговая компания</title>
      </Helmet>
      <Header />
      
      <div className="container mx-auto pt-8 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Интерактивная карта рисков бизнеса
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Изучите типичные риски, с которыми сталкиваются компании, и узнайте, 
            как наши консультанты помогут минимизировать их влияние на ваш бизнес.
          </p>
        </div>
        
        <div className="mb-12">
          <RiskMapVisualization />
        </div>
        
        <div className="bg-purple-100 rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                Не знаете, какие риски угрожают вашему бизнесу?
              </h2>
              <p className="text-purple-800">
                Пройдите наш тест и получите персонализированный чек-лист рисков и рекомендации
                от наших экспертов.
              </p>
            </div>
            <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
              <Link to="/risk-assessment" className="flex items-center gap-2">
                Пройти тест
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-50 text-purple-700 mb-4">
              <MapPinIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Идентификация рисков</h3>
            <p className="text-gray-600">
              Наши эксперты помогут выявить все потенциальные угрозы для вашего бизнеса 
              и классифицировать их по степени опасности.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-50 text-purple-700 mb-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Разработка стратегии</h3>
            <p className="text-gray-600">
              Создаем индивидуальный план минимизации рисков с учетом особенностей 
              вашей компании и отрасли.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-50 text-purple-700 mb-4">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Внедрение решений</h3>
            <p className="text-gray-600">
              Помогаем внедрить защитные механизмы и процедуры, которые снизят 
              вероятность негативных последствий.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
