'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const DialogContext = React.createContext<{ open: boolean }>({ open: false });

const AnimatedDialog = ({ children, ...props }: DialogPrimitive.DialogProps) => {
  const [open, setOpen] = React.useState(props.defaultOpen || false);
  
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    props.onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open: props.open !== undefined ? props.open : open }}>
      <DialogPrimitive.Root 
        {...props} 
        open={props.open !== undefined ? props.open : open} 
        onOpenChange={handleOpenChange}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

const AnimatedDialogTrigger = DialogPrimitive.Trigger;
const AnimatedDialogPortal = DialogPrimitive.Portal;
const AnimatedDialogClose = DialogPrimitive.Close;

const AnimatedDialogBackdrop = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { open } = React.useContext(DialogContext);
  
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Overlay
          ref={ref}
          asChild
          forceMount
          {...props}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
              className
            )}
          />
        </DialogPrimitive.Overlay>
      )}
    </AnimatePresence>
  );
});
AnimatedDialogBackdrop.displayName = DialogPrimitive.Overlay.displayName;

const AnimatedDialogPopup = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  const { open } = React.useContext(DialogContext);

  return (
    <AnimatedDialogPortal forceMount>
      <AnimatedDialogBackdrop />
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Content
            ref={ref}
            asChild
            forceMount
            {...props}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
              className={cn(
                'bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-6 shadow-2xl sm:max-w-lg',
                className
              )}
            >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-[60]">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        )}
      </AnimatePresence>
    </AnimatedDialogPortal>
  );
});
AnimatedDialogPopup.displayName = DialogPrimitive.Content.displayName;

const AnimatedDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col gap-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
AnimatedDialogHeader.displayName = 'AnimatedDialogHeader';

const AnimatedDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);
AnimatedDialogFooter.displayName = 'AnimatedDialogFooter';

const AnimatedDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-xl font-bold leading-none tracking-tight', className)}
    {...props}
  />
));
AnimatedDialogTitle.displayName = DialogPrimitive.Title.displayName;

const AnimatedDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AnimatedDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  AnimatedDialog,
  AnimatedDialogTrigger,
  AnimatedDialogClose,
  AnimatedDialogPopup,
  AnimatedDialogHeader,
  AnimatedDialogFooter,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
  AnimatedDialogBackdrop,
};
