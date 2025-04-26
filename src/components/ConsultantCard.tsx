
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface ConsultantProps {
  id: string;
  name: string;
  position: string;
  specialization: string[];
  rating: number;
  feedbackCount: number;
  imageUrl: string;
}

const ConsultantCard = ({ 
  id, 
  name, 
  position, 
  specialization, 
  rating, 
  feedbackCount, 
  imageUrl 
}: ConsultantProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] w-full relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="mt-1">{position}</CardDescription>
        <div className="mt-3 flex flex-wrap gap-1">
          {specialization.slice(0, 2).map((spec, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {spec}
            </Badge>
          ))}
          {specialization.length > 2 && (
            <Badge variant="outline" className="font-normal">
              +{specialization.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {feedbackCount} {getFeedbackCountText(feedbackCount)}
        </span>
        <Button asChild size="sm">
          <Link to={`/consultant/${id}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

function getFeedbackCountText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "отзывов";
  }
  
  if (lastDigit === 1) {
    return "отзыв";
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "отзыва";
  }
  
  return "отзывов";
}

export default ConsultantCard;
