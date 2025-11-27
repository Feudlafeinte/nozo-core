import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Projets (WORK)</CardTitle>
          <CardDescription>
            Gestion opérationnelle des projets : listes, tâches, sous-tâches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cette section sera développée dans les prochains sprints (Epic 3).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

