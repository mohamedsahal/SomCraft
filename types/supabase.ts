export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone_number: string | null
          country_code: string
          role: 'student' | 'instructor' | 'admin'
          bio: string | null
          github_url: string | null
          linkedin_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          country_code?: string
          role?: 'student' | 'instructor' | 'admin'
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          country_code?: string
          role?: 'student' | 'instructor' | 'admin'
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          level: 'beginner' | 'intermediate' | 'advanced'
          status: 'draft' | 'published' | 'archived'
          duration: string | null
          thumbnail_url: string | null
          instructor_id: string | null
          price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          status?: 'draft' | 'published' | 'archived'
          duration?: string | null
          thumbnail_url?: string | null
          instructor_id?: string | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          status?: 'draft' | 'published' | 'archived'
          duration?: string | null
          thumbnail_url?: string | null
          instructor_id?: string | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      course_sections: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      course_lessons: {
        Row: {
          id: string
          section_id: string
          title: string
          content: string | null
          video_url: string | null
          duration: number | null
          order_index: number
          is_free: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_id: string
          title: string
          content?: string | null
          video_url?: string | null
          duration?: number | null
          order_index: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          title?: string
          content?: string | null
          video_url?: string | null
          duration?: number | null
          order_index?: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrolled_at?: string
          completed_at?: string | null
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          last_watched_at: string | null
          watch_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          last_watched_at?: string | null
          watch_time?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          last_watched_at?: string | null
          watch_time?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'student' | 'instructor' | 'admin'
      course_level: 'beginner' | 'intermediate' | 'advanced'
      course_status: 'draft' | 'published' | 'archived'
    }
  }
} 