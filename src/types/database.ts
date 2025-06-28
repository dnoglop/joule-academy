export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string | null
          updated_at: string | null
          email_confirmed_at: string | null
          last_sign_in_at: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string | null
          updated_at?: string | null
          email_confirmed_at?: string | null
          last_sign_in_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
          updated_at?: string | null
          email_confirmed_at?: string | null
          last_sign_in_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          role: 'Admin' | 'Gestor' | 'Funcionario';
          department: string | null;
          position: string | null;
          manager_id: string | null;
          hire_date: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string | null;
          updated_at: string | null;
          seniority: string | null;
          contract_type: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          role?: 'Admin' | 'Gestor' | 'Funcionario';
          department?: string | null;
          position?: string | null;
          manager_id?: string | null;
          hire_date?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          seniority?: string | null;
          contract_type?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          role?: 'Admin' | 'Gestor' | 'Funcionario';
          department?: string | null;
          position?: string | null;
          manager_id?: string | null;
          hire_date?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          seniority?: string | null;
          contract_type?: string | null;
          status?: string;
        };
      };
      pdis: {
        Row: {
          id: string
          user_id: string | null
          manager_id: string | null
          title: string
          description: string | null
          status: 'rascunho' | 'ativo' | 'concluido' | 'cancelado'
          start_date: string
          end_date: string
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          manager_id?: string | null
          title: string
          description?: string | null
          status?: 'rascunho' | 'ativo' | 'concluido' | 'cancelado'
          start_date: string
          end_date: string
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          manager_id?: string | null
          title?: string
          description?: string | null
          status?: 'rascunho' | 'ativo' | 'concluido' | 'cancelado'
          start_date?: string
          end_date?: string
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      pdi_goals: {
        Row: {
          id: string
          pdi_id: string | null
          title: string
          description: string | null
          status: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado'
          target_date: string | null
          weight: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          pdi_id?: string | null
          title: string
          description?: string | null
          status?: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado'
          target_date?: string | null
          weight?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          pdi_id?: string | null
          title?: string
          description?: string | null
          status?: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado'
          target_date?: string | null
          weight?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      pdi_actions: {
        Row: {
          id: string
          goal_id: string | null
          title: string
          description: string | null
          status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
          due_date: string | null
          completed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          goal_id?: string | null
          title: string
          description?: string | null
          status?: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
          due_date?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          goal_id?: string | null
          title?: string
          description?: string | null
          status?: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
          due_date?: string | null
          completed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      trainings: {
        Row: {
          id: string
          title: string
          description: string | null
          category_id: string | null
          instructor: string | null
          duration_minutes: number | null
          difficulty_level: string | null
          video_url: string | null
          thumbnail_url: string | null
          materials_url: string | null
          tags: string[] | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category_id?: string | null
          instructor?: string | null
          duration_minutes?: number | null
          difficulty_level?: string | null
          video_url?: string | null
          thumbnail_url?: string | null
          materials_url?: string | null
          tags?: string[] | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category_id?: string | null
          instructor?: string | null
          duration_minutes?: number | null
          difficulty_level?: string | null
          video_url?: string | null
          thumbnail_url?: string | null
          materials_url?: string | null
          tags?: string[] | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      training_progress: {
        Row: {
          id: string
          user_id: string | null
          training_id: string | null
          progress_percentage: number | null
          completed_at: string | null
          last_watched_at: string | null
          watch_time_minutes: number | null
          rating: number | null
          comments: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          training_id?: string | null
          progress_percentage?: number | null
          completed_at?: string | null
          last_watched_at?: string | null
          watch_time_minutes?: number | null
          rating?: number | null
          comments?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          training_id?: string | null
          progress_percentage?: number | null
          completed_at?: string | null
          last_watched_at?: string | null
          watch_time_minutes?: number | null
          rating?: number | null
          comments?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      matriz_9box_evaluations: {
        Row: {
          id: string
          user_id: string | null
          evaluator_id: string | null
          performance_level: 'baixo' | 'medio' | 'alto'
          potential_level: 'baixo' | 'medio' | 'alto'
          performance_score: number | null
          potential_score: number | null
          comments: string | null
          recommendations: string | null
          evaluation_period: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          evaluator_id?: string | null
          performance_level: 'baixo' | 'medio' | 'alto'
          potential_level: 'baixo' | 'medio' | 'alto'
          performance_score?: number | null
          potential_score?: number | null
          comments?: string | null
          recommendations?: string | null
          evaluation_period?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          evaluator_id?: string | null
          performance_level?: 'baixo' | 'medio' | 'alto'
          potential_level?: 'baixo' | 'medio' | 'alto'
          performance_score?: number | null
          potential_score?: number | null
          comments?: string | null
          recommendations?: string | null
          evaluation_period?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string
          type: string | null
          category: string | null
          is_read: boolean | null
          action_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message: string
          type?: string | null
          category?: string | null
          is_read?: boolean | null
          action_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string
          type?: string | null
          category?: string | null
          is_read?: boolean | null
          action_url?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      team_overview: {
        Row: {
          id: string | null
          full_name: string | null
          email: string | null
          department: string | null
          position: string | null
          role: 'funcionario' | 'gestor' | null
          manager_name: string | null
          total_pdis: number | null
          active_pdis: number | null
          completed_trainings: number | null
          avg_performance: number | null
          avg_potential: number | null
        }
      }
      pdi_dashboard: {
        Row: {
          id: string | null
          title: string | null
          status: 'rascunho' | 'ativo' | 'concluido' | 'cancelado' | null
          start_date: string | null
          end_date: string | null
          user_name: string | null
          manager_name: string | null
          total_goals: number | null
          completed_goals: number | null
          total_actions: number | null
          completed_actions: number | null
          completion_percentage: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      performance_level: 'baixo' | 'medio' | 'alto'
      user_role: 'funcionario' | 'gestor'
      pdi_status: 'rascunho' | 'ativo' | 'concluido' | 'cancelado'
      goal_status: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado'
      action_status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
      potential_level: 'baixo' | 'medio' | 'alto'
      competency_type: 'tecnica' | 'comportamental' | 'lideranca'
    }
  }
}