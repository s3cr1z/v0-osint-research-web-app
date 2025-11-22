'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode as D3SankeyNode, SankeyLink as D3SankeyLink } from 'd3-sankey';

interface SankeyNode {
  name: string;
  category: string;
  impact?: string;
  risk?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

const sankeyData = {
  nodes: [
    // Sources (left)
    { name: 'Hate Crime', category: 'source' },
    { name: 'Standard Crime', category: 'source' },
    // Targets (right)
    { name: 'Physical harm to JC members', category: 'target', impact: 'Very High Impact', risk: 28 },
    { name: 'Harassment', category: 'target', impact: 'Low Impact', risk: 44 },
    { name: 'Economic impact to JC businesses', category: 'target', impact: 'Medium Impact', risk: 42 },
    { name: 'Property Crime', category: 'target', impact: 'High Impact', risk: 52 },
    { name: 'Vice', category: 'target', impact: 'Medium Impact', risk: 40 },
    { name: 'Petty Crime', category: 'target', impact: 'Low Impact', risk: 35 },
  ],
  links: [
    // Hate Crime connections
    { source: 0, target: 2, value: 30 },
    { source: 0, target: 3, value: 20 },
    { source: 0, target: 4, value: 25 },
    // Standard Crime connections
    { source: 1, target: 2, value: 25 },
    { source: 1, target: 5, value: 35 },
    { source: 1, target: 6, value: 20 },
    { source: 1, target: 7, value: 15 },
  ],
};

export function SankeyDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 200, bottom: 20, left: 20 };

    const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
      .nodeWidth(20)
      .nodePadding(24)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const { nodes, links } = sankeyGenerator({
      nodes: sankeyData.nodes.map((d) => ({ ...d })),
      links: sankeyData.links.map((d) => ({ ...d })),
    }) as SankeyGraph<SankeyNode, SankeyLink>;

    // Draw links
    svg
      .append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d) => {
        const sourceNode = d.source as any;
        return sourceNode.name === 'Hate Crime' ? '#8B5A5A' : '#5A8B6A';
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d) => Math.max(1, d.width || 0))
      .style('mix-blend-mode', 'screen');

    // Draw nodes
    svg
      .append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', (d) => d.x0 || 0)
      .attr('y', (d) => d.y0 || 0)
      .attr('height', (d) => (d.y1 || 0) - (d.y0 || 0))
      .attr('width', (d) => (d.x1 || 0) - (d.x0 || 0))
      .attr('fill', (d) => {
        if (d.category === 'source') {
          return d.name === 'Hate Crime' ? '#6B4444' : '#446B54';
        }
        return '#2E2E2E';
      })
      .attr('rx', 2);

    // Draw node labels
    svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d) => (d.x0 || 0) < width / 2 ? (d.x0 || 0) - 8 : (d.x1 || 0) + 8)
      .attr('y', (d) => ((d.y1 || 0) + (d.y0 || 0)) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d) => (d.x0 || 0) < width / 2 ? 'end' : 'start')
      .attr('fill', '#F5F5F5')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .text((d) => d.name);

    // Draw impact/risk labels for target nodes
    svg
      .append('g')
      .selectAll('text.impact')
      .data(nodes.filter((n) => n.category === 'target'))
      .join('text')
      .attr('class', 'impact')
      .attr('x', (d) => (d.x1 || 0) + 8)
      .attr('y', (d) => ((d.y1 || 0) + (d.y0 || 0)) / 2 + 14)
      .attr('fill', (d) => {
        const impact = d.impact || '';
        if (impact.includes('Very High')) return '#EF4444';
        if (impact.includes('High')) return '#F97316';
        if (impact.includes('Medium')) return '#EAB308';
        return '#22C55E';
      })
      .attr('font-size', '11px')
      .text((d) => `${d.impact}, Risk ${d.risk}%`);

  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
