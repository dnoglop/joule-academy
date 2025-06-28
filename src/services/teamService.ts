import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

export const teamService = {
  async getTeamOverview() {
    const { data, error } = await supabase
      .from('team_overview')
      .select('*')
      .order('full_name', { ascending: true });
    
    return { data, error };
  },

  async getTeamMembers(managerId?: string) {
    let query = supabase
      .from('user_profiles')
      .select(`
        *,
        manager:user_profiles!user_profiles_manager_id_fkey(full_name, email)
      `);

    if (managerId) {
      query = query.eq('manager_id', managerId);
    }

    const { data, error } = await query.order('full_name', { ascending: true });
    
    return { data, error };
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        manager:user_profiles!user_profiles_manager_id_fkey(full_name, email)
      `)
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async updateUserProfile(id: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getManagers() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('role', 'gestor')
      .order('full_name', { ascending: true });
    
    return { data, error };
  },

  async getDepartments() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('department')
      .not('department', 'is', null)
      .order('department', { ascending: true });
    
    if (data) {
      const uniqueDepartments = [...new Set(data.map(item => item.department))];
      return { data: uniqueDepartments, error };
    }
    
    return { data: [], error };
  }
};