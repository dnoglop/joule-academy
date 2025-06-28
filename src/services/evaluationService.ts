import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Matriz9BoxEvaluation = Database['public']['Tables']['matriz_9box_evaluations']['Row'];
type Matriz9BoxEvaluationInsert = Database['public']['Tables']['matriz_9box_evaluations']['Insert'];

export const evaluationService = {
  async getUserEvaluations(userId: string) {
    const { data, error } = await supabase
      .from('matriz_9box_evaluations')
      .select(`
        *,
        user_profiles!matriz_9box_evaluations_user_id_fkey(full_name, email),
        evaluator:user_profiles!matriz_9box_evaluations_evaluator_id_fkey(full_name, email)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getEvaluationsByEvaluator(evaluatorId: string) {
    const { data, error } = await supabase
      .from('matriz_9box_evaluations')
      .select(`
        *,
        user_profiles!matriz_9box_evaluations_user_id_fkey(full_name, email),
        evaluator:user_profiles!matriz_9box_evaluations_evaluator_id_fkey(full_name, email)
      `)
      .eq('evaluator_id', evaluatorId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async createEvaluation(evaluation: Matriz9BoxEvaluationInsert) {
    const { data, error } = await supabase
      .from('matriz_9box_evaluations')
      .insert(evaluation)
      .select()
      .single();
    
    return { data, error };
  },

  async updateEvaluation(id: string, updates: Partial<Matriz9BoxEvaluation>) {
    const { data, error } = await supabase
      .from('matriz_9box_evaluations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getLatestEvaluation(userId: string) {
    const { data, error } = await supabase
      .from('matriz_9box_evaluations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    return { data, error };
  }
};