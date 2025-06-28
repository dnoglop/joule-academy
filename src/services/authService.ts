import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

export const authService = {
  // --- Funções de Autenticação Padrão ---
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    return { error };
  },

  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // --- Função para Criar Novo Funcionário via Edge Function ---
  // ESTA É A FUNÇÃO QUE ESTAVA FALTANDO E CAUSANDO O ERRO.
  async createEmployee(employeeData: { email: string; profileData: any }) {
    const { data, error } = await supabase.functions.invoke('create-employee', {
      body: employeeData,
    });
    return { data, error };
  },

  // --- Funções de Manipulação de Perfil ---
  async getAllUserProfiles() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('full_name', { ascending: true });
    
    return { data, error };
  },
  
  async getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: any }> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    return { data, error };
  }
};