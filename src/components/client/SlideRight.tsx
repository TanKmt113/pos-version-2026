import { Card, CardContent, CardHeader } from "../ui/Card";

interface SlideRightClientProps {
  className?: string;
}

export const SlideRightClient = ({ className = "" }: SlideRightClientProps) => {
  return (
    <Card className={`m-2 ${className}`}>
      <CardHeader>Slide Right Client</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
