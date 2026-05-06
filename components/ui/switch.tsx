'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  thumbClassName?: string;
  pressedWidth?: number;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  thumbIcon?: React.ReactElement;
  glow?: boolean;
};

function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className,
  thumbClassName,
  pressedWidth = 24,
  startIcon,
  endIcon,
  thumbIcon,
  glow = true,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const [isPressed, setIsPressed] = React.useState(false);

  const toggle = () => {
    if (disabled) return;
    const nextChecked = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  return (
    <div
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        'relative flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isChecked ? 'bg-primary' : 'bg-muted-foreground/20',
        disabled && 'opacity-50 cursor-not-allowed',
        glow && isChecked && 'shadow-[0_0_15px_hsla(var(--primary),0.5)]',
        className
      )}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <div className={cn(
          "transition-opacity duration-200",
          isChecked ? "opacity-0" : "opacity-100"
        )}>
          {startIcon && React.cloneElement(startIcon as React.ReactElement, {
            className: cn("size-3 text-muted-foreground", (startIcon as any).props?.className)
          })}
        </div>
        <div className={cn(
          "transition-opacity duration-200",
          isChecked ? "opacity-100" : "opacity-0"
        )}>
          {endIcon && React.cloneElement(endIcon as React.ReactElement, {
            className: cn("size-3 text-primary-foreground", (endIcon as any).props?.className)
          })}
        </div>
      </div>

      {/* Thumb Container */}
      <div className="relative w-full h-full p-1">
        <motion.div
          animate={{
            x: isChecked ? 20 : 0,
            width: isPressed ? pressedWidth : 16,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.8
          }}
          className={cn(
            'flex h-4 items-center justify-center rounded-full bg-background shadow-sm ring-0',
            thumbClassName
          )}
        >
          <AnimatePresence mode="wait">
            {thumbIcon && (
              <motion.div
                key={isChecked ? 'checked' : 'unchecked'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-muted-foreground"
              >
                {React.cloneElement(thumbIcon as React.ReactElement, {
                  className: cn("size-2.5", (thumbIcon as any).props?.className)
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export { Switch, type SwitchProps };
