export type Category = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  displayOrder: number;
};

export type System = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  categoryId?: string;
  categorySlug?: string;
  categoryAr?: string;
  priceUsd?: number;
  icon: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  screenshots: string[];
  demoEnabled: boolean;
  displayOrder: number;
  published: boolean;
};

export type OrderKind = "contact" | "purchase" | "demo_request";
export type OrderStatus = "new" | "contacted" | "negotiating" | "won" | "lost";

export type Order = {
  id: string;
  kind: OrderKind;
  systemId?: string;
  systemName?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
  status: OrderStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "admin" | "demo_user" | "customer";
  demoExpiresAt?: string;
  createdAt: string;
};

export type Session = { token: string; user: User };

export type Stats = {
  totalOrders: number;
  newOrders: number;
  wonOrders: number;
  totalSystems: number;
  activeDemos: number;
  ordersByKind: Record<string, number>;
  ordersByStatus: Record<string, number>;
};

export type DemoRecord = {
  id: string;
  systemId: string;
  entityType: string;
  payload: Record<string, unknown>;
  isSeed: boolean;
  createdAt: string;
};
