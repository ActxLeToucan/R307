export interface IRedirection {
    id: number
    status: 'published' | 'draft' | 'archived'
    path: string
    url: string | null
    title: string | null
    type: 301 | 302 | 307 | 308
}
