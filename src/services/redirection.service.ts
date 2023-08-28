import axios from 'axios';

import { type IRedirection } from '@/interfaces/redirection.interface';
import { HttpException } from '@/exceptions/HttpException';
import { DIRECTUS_TOKEN, DIRECTUS_URL } from '@/config';

class RedirectionService {
    public async getRedirection (path: string): Promise<IRedirection | null> {
        const redirection = await this.getDirectusItems<IRedirection>('redirections', {
            'filter[status][_eq]': 'published',
            'filter[path][_eq]': path,
            limit: '1'
        });
        return redirection[0] ?? null;
    }

    private async getDirectusItems<Type> (collection: string, params: any = {}): Promise<Type[]> {
        if (DIRECTUS_URL == null) throw new HttpException(500, 'Directus URL not set');
        if (DIRECTUS_TOKEN == null) throw new HttpException(500, 'Directus token not set');

        return axios({
            method: 'get',
            url: `${DIRECTUS_URL}/items/${collection}`,
            params,
            headers: {
                Authorization: `Bearer ${DIRECTUS_TOKEN}`
            }
        }).then(response => response.data.data as Type[]);
    }
}

export default RedirectionService;
