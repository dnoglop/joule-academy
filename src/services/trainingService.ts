import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Training = Database['public']['Tables']['trainings']['Row'];
type TrainingInsert = Database['public']['Tables']['trainings']['Insert'];
type TrainingProgress = Database['public']['Tables']['training_progress']['Row'];
type TrainingProgressInsert = Database['public']['Tables']['training_progress']['Insert'];

export const trainingService = {
  async getActiveTrainings() {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getTrainingById(id: string) {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async createTraining(training: TrainingInsert) {
    const { data, error } = await supabase
      .from('trainings')
      .insert(training)
      .select()
      .single();
    
    return { data, error };
  },

  async updateTraining(id: string, updates: Partial<Training>) {
    const { data, error } = await supabase
      .from('trainings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async getUserTrainingProgress(userId: string) {
    const { data, error } = await supabase
      .from('training_progress')
      .select(`
        *,
        trainings(title, description, duration_minutes)
      `)
      .eq('user_id', userId)
      .order('last_watched_at', { ascending: false });
    
    return { data, error };
  },

  async getTrainingProgress(userId: string, trainingId: string) {
    const { data, error } = await supabase
      .from('training_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('training_id', trainingId)
      .single();
    
    return { data, error };
  },

  async updateTrainingProgress(userId: string, trainingId: string, progress: Partial<TrainingProgress>) {
    const { data, error } = await supabase
      .from('training_progress')
      .upsert({
        user_id: userId,
        training_id: trainingId,
        ...progress,
        last_watched_at: new Date().toISOString()
      })
      .select()
      .single();
    
    return { data, error };
  },

  async completeTraining(userId: string, trainingId: string, rating?: number, comments?: string) {
    const { data, error } = await supabase
      .from('training_progress')
      .upsert({
        user_id: userId,
        training_id: trainingId,
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
        last_watched_at: new Date().toISOString(),
        rating,
        comments
      })
      .select()
      .single();
    
    return { data, error };
  }
};