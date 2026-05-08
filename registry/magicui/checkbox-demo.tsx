'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6 items-center p-8">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="accent" variant="accent" size="lg" defaultChecked />
        <label
          htmlFor="accent"
          className="text-sm font-medium leading-none"
        >
          Accent Variant (Large)
        </label>
      </div>

      <div className="flex items-center space-x-2 opacity-50">
        <Checkbox id="disabled" disabled checked />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none"
        >
          Disabled State
        </label>
      </div>
    </div>
  );
}
