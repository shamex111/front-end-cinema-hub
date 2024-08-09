'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import SlugField from '@/components/ui/form-elements/slug-fields/SlugField';
import TextEditor from '@/components/ui/form-elements/text-editor/TextEditor';
import Heading from '@/components/ui/heading/Heading';

import { IEditGenreInput } from '@/types/genre.types';

import generateSlug from '@/utils/string/generateSlug';

import { useGenreEdit } from './useGenreEdit';

interface IGenreEdit {
  genreId: string;
}

const DynamicTextEditor = dynamic(
  () => import('@/components/ui/form-elements/text-editor/TextEditor'),
  {
    ssr: false,
    loading: () => <SkeletonLoader className="h-96" />
  }
);

const GenreEdit: FC<IGenreEdit> = ({ genreId }) => {
  const { genre, onSubmit, isLoading } = useGenreEdit(genreId);
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
  } = useForm<IEditGenreInput>({
    mode: 'onChange',
    values: {
      name: genre?.name || '',
      slug: genre?.slug || '',
      description: genre?.description || '',
      icon: genre?.icon || 'LuCookie'
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
        <Heading>Настройка жанра</Heading>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-9 mt-14">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonLoader className="h-10" key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {
                  required: 'Название обязательно'
                })}
                placeholder="Название"
                error={errors.name}
                style={{ width: '31%' }}
              />
              <div style={{ width: '31%' }}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  generate={() =>
                    setValue('slug', generateSlug(getValues('name')))
                  }
                />
              </div>
              <Field
                {...register('icon', {
                  required: 'Иконка обязательна'
                })}
                placeholder="Иконка"
                error={errors.icon}
                style={{ width: '31%' }}
              />
            </div>
            <Controller
              name="description"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <DynamicTextEditor
                  placeholder="Описание"
                  onChange={onChange}
                  error={error}
                  value={value}
                />
              )}
            />
            <Button>Сохранить</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default GenreEdit;
