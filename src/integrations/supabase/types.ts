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
          name: string
          sector: string
          updated_at: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          id?: string
          name: string
          sector: string
          updated_at?: string
        }
        Update: {
          context?: string | null
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          id?: string
          name?: string
          sector?: string
          updated_at?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
