export interface AnomalyTimelinePoint {
  timestamp: string;
  anomalies: number;
  critical: number;
  industrial: number;
  wildfire: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RiskDistribution {
  level: string;
  count: number;
  color: string;
}

export interface HeatTypeComparison {
  type: string;
  count: number;
  description: string;
}

export interface OriginComparisonPoint {
  month: string;
  industrial: number;
  natural: number;
  agricultural: number;
}

export interface AnalyticsOverview {
  anomalies_over_time: AnomalyTimelinePoint[];
  event_category_distribution: CategoryDistribution[];
  risk_level_distribution: RiskDistribution[];
  persistent_vs_sudden: HeatTypeComparison[];
  industrial_vs_natural: OriginComparisonPoint[];
}
