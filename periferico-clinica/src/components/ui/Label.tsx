import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../utils/cn';
import { GlobalStyles } from '../../styles/styles';

type LocalProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export const Label: React.FC<LocalProps> = ({ className, ...props }) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        GlobalStyles.components.label.base,
        className
      )}
      {...props}
    />
    )
};

