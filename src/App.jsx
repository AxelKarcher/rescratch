import {useState} from 'react'
import {IoMdPlay} from 'react-icons/io'

import './App.scss'
import Button from './components/Button/Button'
import PanelBase from './components/PanelBase'
import {margin} from './config/ui'
// import InstructionModal from './components/InstructionModal'
import ValueModal from './components/ValueModal'

const operators = ['+', '-', '*', '/']

const instructionsBtns = [
  {label: 'if'},
  {label: 'while'},
  {label: 'operation', choices: operators},
  {label: 'print'}
]

const typesColors = {
  'undefined': 'black',
  'int': 'orange',
  'string': 'green'
}

const App = () => {

  const [instructions, setInstructions] = useState([])
  const [values, setValues] = useState([])
  const [instructionModalData, setInstructionModalData] = useState(undefined)
  const [valueModalId, setValueModalId] = useState()
  const [nextValueId, setNextLastValueId] = useState(0)

  const handleAddValue = () => {
    setValues((old) => [
      ...old,
      {id: nextValueId, name: 'value' + nextValueId, type: 'undefined'}
    ])
    setNextLastValueId((old) => old + 1)
  }

  const handleAddInstruction = (e) => {
    setInstructions((old) => [...old, e])
  }

  const handleConfirmInstruction = (e) => {
    handleAddInstruction(e)
    setInstructionModalData(undefined)
  }

  const handleRemoveInstruction = (index) => {
    setInstructions((old) => old?.filter((elem, i) => {
      return i !== index
    }))
  }

  const run = () => {
    console.log('RUN')
  }

  const handleDeleteValue = () => {
    setValues((old) => old?.filter((elem, i) => {return elem?.id !== valueModalId}))
    setValueModalId(undefined)
  }

  const handleConfirmValueChanges = (e) => {
    setValues((old) => old?.map((elem, i) => {
      return i !== valueModalId ? elem : {...elem, name: e?.name, type: e?.type}
    }))
    setValueModalId(undefined)
  }

  return (
    <div id='app-container'>
      {/* <InstructionModal
        isOn={instructionModalData !== undefined}
        handleClose={() => setInstructionModalData(undefined)}
        data={instructionModalData}
        handleChoice={(e) => handleConfirmInstruction(e)}
      /> */}
      <ValueModal
        isOn={valueModalId !== undefined}
        handleClose={() => setValueModalId(undefined)}
        data={values?.filter((elem) => {return elem?.id === valueModalId})[0]}
        handleDelete={handleDeleteValue}
        handleConfirm={(e) => handleConfirmValueChanges(e)}
      />
      <PanelBase style={{display: 'flex', flexDirection: 'column', marginBottom: margin}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button
            style={{marginBottom: values?.length ? margin : 0, marginRight: margin}}
            label='New value'
            action={handleAddValue}
          />
          <Button
            disabled={!instructions?.length}
            icon={<IoMdPlay />}
            action={run}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {values?.map((elem, i) => (
            <Button
              key={i}
              label={elem?.name}
              style={{backgroundColor: typesColors[elem?.type],
                marginRight: i !== values?.length - 1 ? margin : 0
              }}
              action={() => setValueModalId(elem?.id)}
            />
          ))}
        </div>
      </PanelBase>
      <div style={{display: 'flex', alignItems: 'flex-start'}}>
        <PanelBase id='instructions-btns'>
          {instructionsBtns?.map((elem, i) => (
            <Button
              key={i}
              label={elem?.label}
              style={{marginBottom: i !== instructionsBtns?.length - 1 ? margin : 0}}
              action={
                elem?.choices
                ?
                () => setInstructionModalData(elem)
                :
                () => handleAddInstruction(elem?.label)
              }
            />
          ))}
        </PanelBase>
        {
          instructions?.length > 0 &&
          <PanelBase id='edit-panel' style={{marginLeft: margin}}>
            {instructions?.map((elem, i) => (
              <span key={i} onClick={() => handleRemoveInstruction(i)}>{elem}</span>
            ))}
          </PanelBase>
        }
      </div>
    </div>
  )
}

export default App
