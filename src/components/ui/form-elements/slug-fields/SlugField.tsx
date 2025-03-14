import { FC } from 'react'
import { ISlugField } from '../field/form-interface'
import Field from '../field/Field'
import styles from './SlugField.module.scss'

const SlugField: FC<ISlugField> = ({error,register,generate}) => {
  return <div className='relative'>
      <Field
              {...register('slug', {
                required: 'Ссылка обязательна'
              })} placeholder='Ссылка' error={error} 
            />
            <div className={styles.badge} onClick={generate}>сгенерировать</div>
  </div>
}

export default SlugField