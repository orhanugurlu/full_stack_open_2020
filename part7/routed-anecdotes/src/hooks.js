import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const attrib = () => {
    return { type, value, onChange }
  }

  return {
    type,
    value,
    onChange,
    reset,
    attrib
  }
}