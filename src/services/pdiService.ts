import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type PDI = Database['public']['Tables']['pdis']['Row'];
type PDIInsert = Database['public']['Tables']['pdis']['Insert'];
type PDIGoal = Database['public']['Tables']['pdi_goals']['Row'];
type PDIGoalInsert = Database['public']['Tables']['pdi_goals']['Insert'];
type PDIAction = Database['public']['Tables']['pdi_actions']['Row'];
type PDIActionInsert = Database['public']['Tables']['pdi_actions']['Insert'];

export const pdiService = {
  async getUserPDIs(userId: string) {
    const { data, error } = await supabase
      .from('pdis')
      .select(`
        *,
        user_profiles!pdis_user_id_fkey(full_name, email),
        manager:user_profiles!pdis_manager_id_fkey(full_name, email)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getManagerPDIs(managerId: string) {
    const { data, error } = await supabase
      .from('pdis')
      .select(`
        *,
        user_profiles!pdis_user_id_fkey(full_name, email),
        manager:user_profiles!pdis_manager_id_fkey(full_name, email)
      `)
      .eq('manager_id', managerId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async createPDI(pdi: PDIInsert) {
    const { data, error } = await supabase
      .from('pdis')
      .insert(pdi)
      .select()
      .single();
    
    return { data, error };
  },

  async updatePDI(id: string, updates: Partial<PDI>) {
    const { data, error } = await supabase
      .from('pdis')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getPDIGoals(pdiId: string) {
    const { data, error } = await supabase
      .from('pdi_goals')
      .select('*')
      .eq('pdi_id', pdiId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  async createPDIGoal(goal: PDIGoalInsert) {
    const { data, error } = await supabase
      .from('pdi_goals')
      .insert(goal)
      .select()
      .single();
    
    return { data, error };
  },

  async updatePDIGoal(id: string, updates: Partial<PDIGoal>) {
    const { data, error } = await supabase
      .from('pdi_goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getPDIActions(goalId: string) {
    const { data, error } = await supabase
      .from('pdi_actions')
      .select('*')
      .eq('goal_id', goalId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  async createPDIAction(action: PDIActionInsert) {
    const { data, error } = await supabase
      .from('pdi_actions')
      .insert(action)
      .select()
      .single();
    
    return { data, error };
  },

  async updatePDIAction(id: string, updates: Partial<PDIAction>) {
    const { data, error } = await supabase
      .from('pdi_actions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getPDIDashboard() {
    const { data, error } = await supabase
      .from('pdi_dashboard')
      .select('*')
      .order('start_date', { ascending: false });
    
    return { data, error };
  }
};