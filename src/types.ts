/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetricCard {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface CampaignData {
  name: string;
  value: number;
}

export interface FunnelStep {
  name: string;
  count: number;
  percentage: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: "Performance" | "Social" | "International" | "Healthcare";
  description: string;
  image: string;
  channels: string[];
  metrics: {
    spends: string;
    leads?: string;
    ctr: string;
    cpl: string;
    qualityLeads?: string;
    coa?: string;
    roi?: string;
  };
  details: string[];
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
