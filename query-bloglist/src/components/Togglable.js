import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisble] = useState(false)

  const hideWhenVisble = { display: visible ? 'none' : '' }
  const showWhenVisble = { display: visible ? '' : 'none' }

  const toggleVisbility = () => setVisble(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisbility
    }
  })

  return (
    <div>
      <div style={hideWhenVisble}>
        <button onClick={toggleVisbility}>{ props.buttonLabel}</button>
      </div>
      <div style={showWhenVisble} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisbility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable
