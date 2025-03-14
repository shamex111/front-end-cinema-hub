import Button from '@/components/ui/form-elements/button/Button'
import { Icon } from '@/components/ui/Icon'
import { FC } from 'react'

interface IAdminCreateButton {
    onClick: () => void
}

const AdminCreateButton: FC<IAdminCreateButton> = ({onClick}) => {
  return <Button onClick={onClick} className='px-4'>
    <Icon name='LuPlus' className='size-4 mr-2'/>
    Создать
  </Button>
}

export default AdminCreateButton