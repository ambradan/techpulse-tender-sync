export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          context: string | null
          created_at: string
          description: string | null
          employees: number | null
          founded_year: number | null
          id: string
          location: string | null
          name: string
          sector: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          id?: string
          location?: string | null
          name: string
          sector: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          id?: string
          location?: string | null
          name?: string
          sector?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      company_partners: {
        Row: {
          company_id: string | null
          id: string
          monthly_cost: number | null
          partner_id: string | null
          plan_type: string | null
          selected_at: string | null
        }
        Insert: {
          company_id?: string | null
          id?: string
          monthly_cost?: number | null
          partner_id?: string | null
          plan_type?: string | null
          selected_at?: string | null
        }
        Update: {
          company_id?: string | null
          id?: string
          monthly_cost?: number | null
          partner_id?: string | null
          plan_type?: string | null
          selected_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_partners_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_partners_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      market_news: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          id: string
          published_at: string | null
          source: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          source?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          source?: string | null
          title?: string
        }
        Relationships: []
      }
      market_trends: {
        Row: {
          category: string
          created_at: string
          id: string
          impact_score: number | null
          published_at: string | null
          source: string | null
          summary: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          impact_score?: number | null
          published_at?: string | null
          source?: string | null
          summary: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          impact_score?: number | null
          published_at?: string | null
          source?: string | null
          summary?: string
          title?: string
        }
        Relationships: []
      }
      partner_services: {
        Row: {
          created_at: string
          description: string | null
          id: string
          partner_id: string | null
          price: number | null
          service_name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          price?: number | null
          service_name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          partner_id?: string | null
          price?: number | null
          service_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_services_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          min_employees: number | null
          name: string
          price_per_employee: number | null
          pricing_type: string | null
          rating: number | null
          website_url: string | null
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          min_employees?: number | null
          name: string
          price_per_employee?: number | null
          pricing_type?: string | null
          rating?: number | null
          website_url?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          min_employees?: number | null
          name?: string
          price_per_employee?: number | null
          pricing_type?: string | null
          rating?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          company_id: string | null
          confidence: number | null
          created_at: string
          data: Json
          id: string
          period: string
          prediction_type: string
        }
        Insert: {
          company_id?: string | null
          confidence?: number | null
          created_at?: string
          data: Json
          id?: string
          period: string
          prediction_type: string
        }
        Update: {
          company_id?: string | null
          confidence?: number | null
          created_at?: string
          data?: Json
          id?: string
          period?: string
          prediction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "predictions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      predictions_basic: {
        Row: {
          ai_output: string | null
          company_id: string | null
          confidence: number | null
          created_at: string
          id: string
          period: string | null
          prediction_type: string
        }
        Insert: {
          ai_output?: string | null
          company_id?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          period?: string | null
          prediction_type: string
        }
        Update: {
          ai_output?: string | null
          company_id?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          period?: string | null
          prediction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "predictions_basic_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      recommended_tenders: {
        Row: {
          category: string | null
          company_id: string | null
          created_at: string
          deadline: string | null
          id: string
          match_score: number | null
          source: string | null
          title: string
          value: number | null
        }
        Insert: {
          category?: string | null
          company_id?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          match_score?: number | null
          source?: string | null
          title: string
          value?: number | null
        }
        Update: {
          category?: string | null
          company_id?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          match_score?: number | null
          source?: string | null
          title?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recommended_tenders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tendermatch_preferences: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          max_value: number | null
          min_match_score: number | null
          min_value: number | null
          notify_email: boolean | null
          notify_in_app: boolean | null
          preferred_categories: string[] | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          max_value?: number | null
          min_match_score?: number | null
          min_value?: number | null
          notify_email?: boolean | null
          notify_in_app?: boolean | null
          preferred_categories?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          max_value?: number | null
          min_match_score?: number | null
          min_value?: number | null
          notify_email?: boolean | null
          notify_in_app?: boolean | null
          preferred_categories?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tendermatch_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tenders_suggestions: {
        Row: {
          ai_suggestion: string | null
          company_id: string | null
          created_at: string
          deadline: string | null
          id: string
          match_score: number | null
          tender_title: string
        }
        Insert: {
          ai_suggestion?: string | null
          company_id?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          match_score?: number | null
          tender_title: string
        }
        Update: {
          ai_suggestion?: string | null
          company_id?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          match_score?: number | null
          tender_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenders_suggestions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_company_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "moderator"],
    },
  },
} as const
