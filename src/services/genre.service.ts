import { axiosClassic, axiosWithAuth } from '@/api/interceptors';

import { API_URL } from '@/config/api.config';

import { IEditGenreInput, IGenre } from '@/types/genre.types';

class GenreService {
  async getAll(searchTerm?: string) {
    const { data } = await axiosClassic.get<IGenre[]>(API_URL.genres(''), {
      params: searchTerm ? { searchTerm } : {}
    });
    return data;
  }

  async getBySlug(slug: string) {
    return await axiosClassic.get<IGenre>(API_URL.genres(`by-slug/${slug}`));
  }

  async getById(id: string) {
    return await axiosWithAuth.get<IGenre>(API_URL.genres(`by-id/${id}`));
  }

  async create() {
    return await axiosWithAuth.post<string>(API_URL.genres(''));
  }

  async update(id: string, data: IEditGenreInput) {
    return await axiosWithAuth.put<string>(API_URL.genres(`${id}`), data);
  }
  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.genres(`${id}`));
  }
}

export const genreService = new GenreService();
