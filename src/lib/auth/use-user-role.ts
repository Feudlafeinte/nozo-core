'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

type AppRole = 'admin' | 'team' | null;

interface UserRoleData {
  role: AppRole;
  loading: boolean;
  error: Error | null;
}

export function useUserRole(): UserRoleData {
  const [role, setRole] = useState<AppRole>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        setLoading(true);
        
        // Récupérer l'utilisateur courant
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          setRole(null);
          return;
        }

        // Récupérer le rôle depuis la table profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        setRole(profile?.role as AppRole);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { role, loading, error };
}

