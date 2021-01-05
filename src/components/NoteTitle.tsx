import React from 'react'
import { Input, InputOnChangeData } from 'semantic-ui-react'

export default function NoteTitle(props: {
  defaultTitle?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void
}): JSX.Element {
  return (
    <Input
      defaultValue={props.defaultTitle}
      fluid
      onChange={props.onChange}
      placeholder="Title..."
      size="massive"
      transparent
    />
  )
}
