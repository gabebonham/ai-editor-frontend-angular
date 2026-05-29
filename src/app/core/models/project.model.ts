export interface Project {
    id: string;
    name: string;
    description?: string;
    owner?: string;
    html?: string;
    repoLink?: string;
    mdFileUrl?: string | null;
    widgetInjected: boolean;
    createdAt: string;
}