'use client';

export function TriggerRule() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4">
      <label className="text-xs text-[#737373] block mb-2">Trigger rule</label>
      <p className="text-sm">
        <span className="text-[#4ADE80] font-medium">[+5 keywords]</span>
        <span className="text-[#F5F5F5]"> in a </span>
        <span className="text-[#4ADE80] font-medium">[Post]</span>
        <span className="text-[#F5F5F5]"> on </span>
        <span className="text-[#4ADE80] font-medium">[Source of Interest]</span>
      </p>
    </div>
  );
}
