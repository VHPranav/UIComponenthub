'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { CopyButton } from '@/components/copy-button';

type CodeTabsProps = {
  codes: Record<string, string>;
  lang?: string;
  themes?: { light: string; dark: string };
  copyButton?: boolean;
} & Omit<React.ComponentProps<typeof Tabs>, 'children'>;

function CodeTabs({
  codes,
  lang = 'bash',
  themes = {
    light: 'github-light',
    dark: 'github-dark',
  },
  className,
  defaultValue,
  value,
  onValueChange,
  copyButton = true,
  ...props
}: CodeTabsProps) {
  const { resolvedTheme } = useTheme();

  const [highlightedCodes, setHighlightedCodes] = React.useState<Record<
    string,
    string
  > | null>(null);
  const [selectedCode, setSelectedCode] = React.useState<string>(
    value ?? defaultValue ?? Object.keys(codes)[0] ?? '',
  );

  React.useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const newHighlightedCodes: Record<string, string> = {};

        for (const [command, val] of Object.entries(codes)) {
          const highlighted = await codeToHtml(val, {
            lang,
            themes: {
              light: themes.light,
              dark: themes.dark,
            },
            defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
          });

          newHighlightedCodes[command] = highlighted;
        }

        setHighlightedCodes(newHighlightedCodes);
      } catch (error) {
        console.error('Error highlighting codes', error);
        setHighlightedCodes(codes);
      }
    }
    loadHighlightedCode();
  }, [resolvedTheme, lang, themes.light, themes.dark, codes]);

  return (
    <Tabs
      data-slot="install-tabs"
      className={cn(
        'w-full rounded-xl border bg-zinc-50 dark:bg-[#0d0d0d] dark:border-white/10 overflow-hidden',
        className,
      )}
      {...props}
      value={selectedCode}
      onValueChange={(val) => {
        setSelectedCode(val);
        onValueChange?.(val);
      }}
    >
      <TabsList
        data-slot="install-tabs-list"
        className="flex w-full justify-between items-center h-12 rounded-none bg-transparent p-0 px-4 border-b border-border dark:border-white/10"
      >
        <div className="flex gap-x-4 h-full">
          {highlightedCodes &&
            Object.keys(highlightedCodes).map((code) => (
              <TabsTrigger
                key={code}
                value={code}
                className="relative flex items-center justify-center h-full text-sm font-medium text-muted-foreground dark:text-zinc-400 data-[state=active]:text-foreground dark:data-[state=active]:text-white transition-colors bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground dark:data-[state=active]:border-white rounded-none px-1"
              >
                {code}
              </TabsTrigger>
            ))}
        </div>

        {copyButton && highlightedCodes && (
          <CopyButton
            value={codes[selectedCode]}
            variant="ghost"
            className="text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white dark:hover:bg-white/10 h-8 w-8"
          />
        )}
      </TabsList>

      <div data-slot="install-tabs-contents">
        {highlightedCodes &&
          Object.entries(highlightedCodes).map(([code, val]) => (
            <TabsContent
              data-slot="install-tabs-content"
              key={code}
              className="w-full mt-0"
              value={code}
            >
              <div
                className="w-full text-sm overflow-auto p-4 font-sans [&>pre]:!bg-transparent [&>pre]:m-0 [&_code]:!text-[13px] [&_code]:font-sans [&_code_.line]:!px-0"
                dangerouslySetInnerHTML={{ __html: val }}
              />
            </TabsContent>
          ))}
      </div>
    </Tabs>
  );
}

export { CodeTabs, type CodeTabsProps };
