import { axiosClassic, axiosWithAuth } from '@/api/interceptors';

import { API_URL } from '@/config/api.config';

import { IActor, IEditActorInput } from '@/types/actor.types';

class ActorService {
  async getAll(searchTerm?: string) {
    const { data } = await axiosClassic.get<IActor[]>(API_URL.actors(''), {
      params: searchTerm ? { searchTerm } : {}
    });
    return data;
  }

  async getById(id: string) {
    return await axiosWithAuth.get<IActor>(API_URL.actors(`by-id/${id}`));
  }

  async getBySlug(slug: string) {
    return await axiosWithAuth.get<IActor>(API_URL.actors(`by-slug/${slug}`));
  }

  async create() {
    return await axiosWithAuth.post<string>(API_URL.actors(''));
  }
  async update(id: string, data: IEditActorInput) {
    return await axiosWithAuth.put(API_URL.actors(`${id}`), data);
  }
  async delete(id: string) {
    return await axiosWithAuth.delete(API_URL.actors(`${id}`));
  }
}

export const actorService = new ActorService();
