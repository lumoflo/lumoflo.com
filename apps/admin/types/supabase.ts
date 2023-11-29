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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customers: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          email: string
          id: string
          instagram_username: string
          landmark: string | null
          locality: string
          name: string
          phone_no: string
          pincode: string
          state: string
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          email: string
          id: string
          instagram_username: string
          landmark?: string | null
          locality: string
          name: string
          phone_no: string
          pincode: string
          state: string
          updated_at: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          instagram_username?: string
          landmark?: string | null
          locality?: string
          name?: string
          phone_no?: string
          pincode?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      Orders: {
        Row: {
          awb: string | null
          breadth: number | null
          courier: Database["public"]["Enums"]["COURIER"]
          created_at: string
          customer_id: string | null
          height: number | null
          id: string
          length: number | null
          order_id: string
          pickup_id: string
          prebook: boolean
          remarks: string | null
          shipping_cost: number | null
          status: Database["public"]["Enums"]["Status"]
          store_id: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          awb?: string | null
          breadth?: number | null
          courier?: Database["public"]["Enums"]["COURIER"]
          created_at?: string
          customer_id?: string | null
          height?: number | null
          id: string
          length?: number | null
          order_id: string
          pickup_id: string
          prebook?: boolean
          remarks?: string | null
          shipping_cost?: number | null
          status?: Database["public"]["Enums"]["Status"]
          store_id?: string | null
          updated_at: string
          weight?: number | null
        }
        Update: {
          awb?: string | null
          breadth?: number | null
          courier?: Database["public"]["Enums"]["COURIER"]
          created_at?: string
          customer_id?: string | null
          height?: number | null
          id?: string
          length?: number | null
          order_id?: string
          pickup_id?: string
          prebook?: boolean
          remarks?: string | null
          shipping_cost?: number | null
          status?: Database["public"]["Enums"]["Status"]
          store_id?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_pickup_id_fkey"
            columns: ["pickup_id"]
            isOneToOne: false
            referencedRelation: "Pickups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Stores"
            referencedColumns: ["id"]
          }
        ]
      }
      Otp: {
        Row: {
          customer_id: string | null
          email: string
          expires: string
          id: string
          order_id: string
          otp: string
        }
        Insert: {
          customer_id?: string | null
          email: string
          expires: string
          id: string
          order_id: string
          otp: string
        }
        Update: {
          customer_id?: string | null
          email?: string
          expires?: string
          id?: string
          order_id?: string
          otp?: string
        }
        Relationships: [
          {
            foreignKeyName: "Otp_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Otp_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          }
        ]
      }
      Pickups: {
        Row: {
          id: string
          pickup_date: string
          pickup_id: number
          pickup_location: string
        }
        Insert: {
          id: string
          pickup_date: string
          pickup_id: number
          pickup_location: string
        }
        Update: {
          id?: string
          pickup_date?: string
          pickup_id?: number
          pickup_location?: string
        }
        Relationships: []
      }
      Posts: {
        Row: {
          caption: string
          created_at: string
          id: string
          post_created_at: string
          post_link: string
          quantity: number
          store_id: string | null
          updated_at: string
        }
        Insert: {
          caption: string
          created_at?: string
          id: string
          post_created_at: string
          post_link: string
          quantity?: number
          store_id?: string | null
          updated_at: string
        }
        Update: {
          caption?: string
          created_at?: string
          id?: string
          post_created_at?: string
          post_link?: string
          quantity?: number
          store_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Posts_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Stores"
            referencedColumns: ["id"]
          }
        ]
      }
      Slides: {
        Row: {
          id: string
          order_id: string | null
          parent_post_id: string
          post_id: string | null
          post_link: string
        }
        Insert: {
          id: string
          order_id?: string | null
          parent_post_id: string
          post_id?: string | null
          post_link: string
        }
        Update: {
          id?: string
          order_id?: string | null
          parent_post_id?: string
          post_id?: string | null
          post_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "Slides_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Slides_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          }
        ]
      }
      Stores: {
        Row: {
          created_at: string
          id: string
          instagram_token: string
          name: string
          subdomain: string
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          instagram_token: string
          name: string
          subdomain: string
          updated_at: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          instagram_token?: string
          name?: string
          subdomain?: string
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "Stores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          updated_at: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      COURIER: "DEFAULT" | "DELHIVERY" | "OTHER"
      Size: "SMALL" | "MEDIUM" | "LARGE"
      Status:
        | "PENDING"
        | "ACCEPTED"
        | "SHIPPED"
        | "PACKED"
        | "DELIVERED"
        | "CANCELLED"
        | "MANIFESTED"
        | "OUT_FOR_DELIVERY"
        | "HOLD"
        | "RTO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
