'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed text-white z-50 left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-zinc-500 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
