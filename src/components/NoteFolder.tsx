import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export default function NoteEditor(props: {
  options?: { key: string; value: string; text: string }[]
}): JSX.Element {
  return (
    <Dropdown
      placeholder="Select folder"
      search
      selection
      options={props.options}
    />
  )
}
