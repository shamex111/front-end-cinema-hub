'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import FileUpload from '@/components/ui/fileUpload/FileUpload';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import Select from '@/components/ui/form-elements/select/Select';
import SlugField from '@/components/ui/form-elements/slug-fields/SlugField';
import Heading from '@/components/ui/heading/Heading';

import { IMovieEditInput } from '@/types/movie.types';

import generateSlug from '@/utils/string/generateSlug';

import { useAdminActors } from './useAdminActors';
import { useAdminGenres } from './useAdminGenres';
import { useMovieEdit } from './useMovieEdit';

interface IMovieEdit {
  movieId: string;
}

const MovieEdit: FC<IMovieEdit> = ({ movieId }) => {
  const { movie, onSubmit, isLoading } = useMovieEdit(movieId);

  const { genres, isGenresLoading } = useAdminGenres();
  const { actors, isActorsLoading } = useAdminActors();
  const router = useRouter();
  const back = () => {
    router.back();
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm<IMovieEditInput>({
    mode: 'onChange',
    values: {
      title: movie?.title || '',
      slug: movie?.slug || '',
      country: movie?.country || '',
      duration: movie?.duration || 0,
      year: movie?.year || 0,
      poster: movie?.poster || '',
      bigPoster: movie?.bigPoster || '',
      videoUrl: movie?.videoUrl || '',
      genres: movie?.genres.map(genre => genre.id) || [],
      actors: movie?.actors.map(actor => actor.id) || []
    }
  });
  return (
    <div className="px-6">
      <div className="flex items-center gap-2">
        <Image
          onClick={back}
          src="/images/strelka_vlevo_dnqp3nj9xgp7_16 (1).png"
          alt="Назад"
          width={14}
          height={14}
          className="hover:cursor-pointer"
        />
        <Heading>Настройка фильма</Heading>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-9 mt-14">
            {Array.from({ length: 2 }).map((_, index) => (
              <SkeletonLoader className="h-10" key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('title', {
                  required: 'Название обязательно'
                })}
                placeholder="Название"
                error={errors.title}
              />
              <SlugField
                register={register}
                error={errors.slug}
                generate={() =>
                  setValue('slug', generateSlug(getValues('title')))
                }
              />

              <Field
                {...register('country', {
                  required: 'Страна обязательна!'
                })}
                placeholder="Страна"
                error={errors.country}
                style={{ width: '31%' }}
              />
              <Field
                {...register('duration', {
                  required: 'Длительность обязательна'
                })}
                placeholder="Длительность (в мин.) "
                error={errors.duration}
                style={{ width: '31%' }}
              />
              <Field
                {...register('year', {
                  required: 'Год обязателен'
                })}
                placeholder="Год"
                error={errors.year}
                style={{ width: '31%' }}
              />

              <Controller
                name="genres"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    options={genres || []}
                    error={error}
                    field={field}
                    placeholder="Жанры"
                    isLoading={isGenresLoading}
                    isMulti
                  />
                )}
                rules={{
                  required: 'Пожалуйста выберите хотя бы один жанр!'
                }}
              />
              <Controller
                name="actors"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    options={actors || []}
                    error={error}
                    field={field}
                    placeholder="Актеры"
                    isLoading={isActorsLoading}
                    isMulti
                  />
                )}
                rules={{
                  required: 'Пожалуйста выберите хотя бы одного актера!'
                }}
              />
              <Controller
                name="poster"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error }
                }) => (
                  <FileUpload
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="movies"
                    placeholder="Постер"
                    style={{ marginTop: 15 }}
                  />
                )}
                rules={{
                  required: 'Постер обязателен!'
                }}
              />
              <Controller
                name="bigPoster"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error }
                }) => (
                  <FileUpload
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="movies"
                    placeholder="Большой постер"
                    style={{ marginTop: 15 }}
                  />
                )}
                rules={{
                  required: 'Большой постер обязателен!'
                }}
              />
              <Controller
                name="videoUrl"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error }
                }) => (
                  <FileUpload
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder="videos"
                    placeholder="Видео"
                    style={{ marginBottom: 35 }}
                    isNoImage
                  />
                )}
                rules={{
                  required: 'Видео обязательно!'
                }}
              />
            </div>
            <Button className="px-4">Сохранить</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default MovieEdit;
