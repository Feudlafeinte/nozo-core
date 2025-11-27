import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function MoneyPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Money</CardTitle>
          <CardDescription>
            Pilotage financier : budget signé, extras, factures, reste à facturer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cette section sera développée dans les prochains sprints (Epic 4).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

