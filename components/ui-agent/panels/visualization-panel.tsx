'use client';

import { SankeyDiagram } from '../visualizations/sankey-diagram';
import { RiskDonut } from '../visualizations/risk-donut';

export function VisualizationPanel() {
  return (
    <main className="flex-1 bg-[#0A0A0A] relative overflow-hidden">
      {/* Category Headers */}
      <div className="absolute left-8 top-8 space-y-4 z-10">
        <h3 className="text-sm font-medium text-[#F5F5F5]">Hate Crime</h3>
      </div>
      <div className="absolute left-8 top-[45%] space-y-4 z-10">
        <h3 className="text-sm font-medium text-[#F5F5F5]">Standard Crime</h3>
      </div>

      {/* Sankey Diagram */}
      <div className="absolute inset-0">
        <SankeyDiagram />
      </div>

      {/* Donut Chart */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <RiskDonut />
      </div>
    </main>
  );
}
