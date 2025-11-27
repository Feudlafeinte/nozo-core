'use client';

import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppSidebar } from './app-sidebar';

const breadcrumbMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projets (WORK)',
  '/money': 'Money',
};

export function AppHeader() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const breadcrumb = breadcrumbMap[pathname] || 'NOZO';

  return (
    <header className="sticky top-0 z-40 ml-64 h-16 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu (Drawer) */}
        <div className="flex items-center gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-foreground">{breadcrumb}</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Clair
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Sombre
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Système
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

