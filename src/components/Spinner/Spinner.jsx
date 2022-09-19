import './Spinner.scss'
import {primary} from '../../config/colors'

const Spinner = ({size, thick}) => {
  return (
    <div
      id='spinner-container'
      style={{width: size || 40, height: size || 40, borderWidth: thick || 5,
        borderTopColor: primary, borderBottomColor: primary
      }}
    />
  )
}

export default Spinner