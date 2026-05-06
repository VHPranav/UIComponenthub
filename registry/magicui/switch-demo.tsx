'use client';

import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Check, X } from 'lucide-react';

export default function SwitchDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">Standard</span>
        <Switch glow={false} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">With Icons</span>
        <Switch
          startIcon={<X />}
          endIcon={<Check />}
          thumbIcon={checked ? <Moon className="fill-current" /> : <Sun className="fill-current" />}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">Elastic & Glow</span>
        <Switch
          pressedWidth={28}
          glow
          className="scale-125"
        />
      </div>
    </div>
  );
}
