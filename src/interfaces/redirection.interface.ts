export interface IRedirection {
    id: number
    status: 'published' | 'draft' | 'archived'
    path: string
    url: string | null
    title: string | null
}
