import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';

import { cn } from '@/lib/utils';

interface ButtonGroupProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    size?: 'default' | 'sm' | 'lg';
    children: ReactNode;
}

export const ButtonGroup = ({ className, orientation = 'horizontal', size = 'default', children }: ButtonGroupProps) => {
    const validChildren = Children.toArray(children).filter(isValidElement) as ReactElement<{ className?: string }>[];
    const totalButtons = validChildren.length;
    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';

    return (
        <div
            className={cn(
                'inline-flex divide-x',
                {
                    'flex-col': isVertical,
                    'w-fit': isVertical,
                    'h-9': size == 'default',
                    'h-8': size == 'sm',
                    'h-10': size == 'lg',
                },
                className,
            )}
        >
            {validChildren.map((child, index) => {
                const isFirst = index === 0;
                const isLast = index === totalButtons - 1;

                return cloneElement(child, {
                    className: cn(
                        {
                            'rounded-l-none': isHorizontal && !isFirst,
                            'rounded-r-none': isHorizontal && !isLast,
                            'border-l-0': isHorizontal && !isFirst,

                            'rounded-t-none': isVertical && !isFirst,
                            'rounded-b-none': isVertical && !isLast,
                            'border-t-0': isVertical && !isFirst,
                        },
                        child.props.className,
                    ),
                });
            })}
        </div>
    );
};
