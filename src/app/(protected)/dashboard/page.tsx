'use client';

import { useUserRole } from '@/lib/auth/use-user-role';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const { role, loading, error } = useUserRole();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
          <CardDescription className="text-destructive">
            {error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur NOZO</CardTitle>
          <CardDescription>
            Vous êtes connecté avec le rôle : <strong className="text-foreground">{role || 'non défini'}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cette page est protégée par le middleware. Seuls les utilisateurs authentifiés peuvent y accéder.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projets WORK</CardTitle>
            <CardDescription>Gestion opérationnelle</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Money</CardTitle>
            <CardDescription>Pilotage financier</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0 €</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Opportunités</CardTitle>
            <CardDescription>Pipeline CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

