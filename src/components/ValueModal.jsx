import {useState, useEffect} from 'react'
import {BsCheckLg} from 'react-icons/bs'

import ModalBase from './ModalBase/ModalBase'
import Button from './Button/Button'
import TextField from './TextField/TextField'
import {margin} from '../config/ui'
import Select from './Select/Select'

const ValueModal = ({isOn, handleClose, data, handleDelete, handleConfirm}) => {

  const [name, setName] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    setName(data?.name)
    setType(data?.type)
  }, [data])

  return (
    <ModalBase isOn={isOn} handleClose={handleClose} title='Value settings'>
      <TextField
        label='Nom'
        value={name || ''}
        action={(e) => setName(e)}
        style={{marginBottom: margin}}
      />
      <Select
        label='Type'
        style={{marginBottom: margin}}
        value={type}
        action={(e) => setType(e)}
        options={[
          {label: 'int', value: 'int'},
          {label: 'string', value: 'string'},
          {label: 'undefined', value: 'undefined'}
        ]}
      />
      <Button
        label='Delete the value'
        style={{marginBottom: margin}}
        action={handleDelete}
      />
      <Button icon={<BsCheckLg />} action={() => handleConfirm({name: name, type: type})} />
    </ModalBase>
  )
}

export default ValueModal