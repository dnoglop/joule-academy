// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'gestor' | 'funcionario';
  department: string | null;
  position: string | null;
  manager_id: string | null;
  hire_date: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  seniority: string | null;
  contract_type: string | null;
  status: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchUserProfile = async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      console.log('No user ID available for profile fetch');
      return;
    }

    // Evitar múltiplas chamadas simultâneas
    if (profileLoading) {
      console.log('Profile fetch already in progress');
      return;
    }

    setProfileLoading(true);
    
    try {
      console.log('Fetching profile for user:', targetUserId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows found

      if (error) {
        console.error('Error fetching user profile:', error);
        
        // Se o erro for 404 (perfil não encontrado), tente criar um
        if (error.code === 'PGRST116' || error.message.includes('No rows found')) {
          console.log('Profile not found, attempting to create...');
          await createUserProfile(targetUserId);
        }
        return;
      }

      if (data) {
        console.log('Profile fetched successfully:', data);
        setUserProfile(data);
      } else {
        console.log('No profile found, creating new profile...');
        await createUserProfile(targetUserId);
      }
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const userData = await supabase.auth.getUser();
      const email = userData.data.user?.email || '';
      
      console.log('Creating profile for user:', userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: userId,
            full_name: email.split('@')[0], // Use email prefix as default name
            email: email,
            role: 'funcionario' as const,
            status: 'Ativo'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return;
      }

      console.log('Profile created successfully:', data);
      setUserProfile(data);
    } catch (error) {
      console.error('Unexpected error creating user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }

      // Profile will be fetched by the auth state change listener
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // Small delay to ensure user is properly authenticated
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 100);
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signOut,
    updatePassword,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};