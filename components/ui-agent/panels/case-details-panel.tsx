'use client';

import { CaseHeader } from '../case/case-header';
import { CaseMetadata } from '../case/case-metadata';
import { TriggerRule } from '../case/trigger-rule';
import { SourcePerson } from '../case/source-person';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CaseDetailsPanel() {
  return (
    <aside className="w-[420px] bg-[#111111] border-r border-[#2E2E2E] flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <CaseHeader />
          <CaseMetadata />
          <TriggerRule />
          <SourcePerson />
        </div>
      </ScrollArea>
    </aside>
  );
}
