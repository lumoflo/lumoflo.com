import { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@lumoflo/utils";

import { Button, buttonVariants } from "./button";

import React = require("react");

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function LoadingButton({
  children,
  className,
  isLoading,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  props?: ButtonProps;
}) {
  return (
    <Button {...props} className={cn(className)}>
      {isLoading && (
        <span>
          <Loader2 className={"mr-2 h-4 w-4 animate-spin"} />
        </span>
      )}
      {children}
    </Button>
  );
}
