export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Hors ligne</h1>
        <p className="text-muted-foreground">
          Réessayez quand la connexion revient.
        </p>
      </div>
    </main>
  );
}

