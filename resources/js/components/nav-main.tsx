import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar();

    const [collapsibleState, setCollapsibleState] = useState<{ [key: string]: boolean }>({});

    const handleSidebarAndCollapsible = (event: React.MouseEvent, itemUrl: string, isCollapsibleOpen: boolean, isCollapsible: boolean = true) => {
        if (!sidebarOpen) {
            if (isCollapsible) {
                event.preventDefault();
            }
            setSidebarOpen(true);
        }

        if (!isCollapsibleOpen) {
            setCollapsibleState((prevState) => ({
                ...prevState,
                [itemUrl]: true,
            }));
        }
    };

    useEffect(() => {
        console.log(collapsibleState);
    }, [collapsibleState]);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.items ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={page.url.includes(item?.url ?? '')}
                            open={collapsibleState[item?.url ?? ''] ?? page.url.includes(item?.url ?? '')}
                            onOpenChange={(isOpen) =>
                                setCollapsibleState((prevState) => ({
                                    ...prevState,
                                    [item?.url ?? '']: isOpen,
                                }))
                            }
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger
                                    asChild
                                    onClick={(event) => handleSidebarAndCollapsible(event, item?.url ?? '', collapsibleState[item?.url ?? ''])}
                                >
                                    <SidebarMenuButton tooltip={item.title} isActive={page.url.includes(item?.url ?? '')} className="cursor-pointer">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronUp className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={subItem.url === page.url}>
                                                    <a href={subItem.url}>
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={item.url === page.url}
                                onClick={(event) => handleSidebarAndCollapsible(event, item?.url ?? '', collapsibleState[item?.url ?? ''], false)}
                            >
                                <Link href={item?.url ?? ''} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
