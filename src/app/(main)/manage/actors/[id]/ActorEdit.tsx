'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import FileUpload from '@/components/ui/fileUpload/FileUpload';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import SlugField from '@/components/ui/form-elements/slug-fields/SlugField';
import TextEditor from '@/components/ui/form-elements/text-editor/TextEditor';
import Heading from '@/components/ui/heading/Heading';

import { IEditActorInput } from '@/types/actor.types';

import generateSlug from '@/utils/string/generateSlug';

import { useActorEdit } from './useActorEdit';

interface IActorEdit {
  actorId: string;
}

const ActorEdit: FC<IActorEdit> = ({ actorId }) => {
  const { actor, onSubmit, isLoading } = useActorEdit(actorId);
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
  } = useForm<IEditActorInput>({
    mode: 'onChange',
    values: {
      name: actor?.name || '',
      slug: actor?.slug || '',
      photoUrl: actor?.photoUrl || ''
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
        <Heading>Настройка актера</Heading>
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
                {...register('name', {
                  required: 'Имя обязательно'
                })}
                placeholder="Имя"
                error={errors.name}
              />
              <SlugField
                register={register}
                error={errors.slug}
                generate={() =>
                  setValue('slug', generateSlug(getValues('name')))
                }
              />

              <Controller
                name="photoUrl"
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
                    folder="actors"
                    placeholder="Фотография"
                    style={{ marginTop: 15 }}
                  />
                )}
                rules={{
                  required: 'Фотография обязательна!'
                }}
              />
            </div>
            <Button>Сохранить</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ActorEdit;
