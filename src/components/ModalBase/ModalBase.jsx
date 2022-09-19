import './ModalBase.scss'
import {secondary, light} from '../../config/colors'
import {margin, padding, borderRadius} from '../../config/ui'

const ModalBase = ({isOn, isBlocked, handleClose, title, children, style, className}) => {
  return (
    <>
      {
        isOn &&
        <div
          className={className}
          id='modalbase-container'
          style={{backgroundColor: 'rgba(100, 100, 100, 0.5)'}}
          onClick={!isBlocked ? handleClose : null}
        >
          <div
            id='body'
            style={{backgroundColor: secondary, padding: padding, borderRadius: borderRadius}}
            onClick={(e) => e.stopPropagation()}
          >
            {
              title &&
              <div
                id='title'
                style={{color: light, marginBottom: children && margin}}
              >
                {title}
              </div>
            }
            <div style={{...style}}>{children}</div>
          </div>
        </div>
      }
    </>
  )
}

export default ModalBase