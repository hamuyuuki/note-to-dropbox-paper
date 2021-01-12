import React from 'react'
import Editor from 'rich-markdown-editor'
import { Loader } from 'semantic-ui-react'

export default function NoteEditor(props: {
  defaultValue?: string
  onChange?: (value: () => string) => void
}): JSX.Element {
  if (props.defaultValue === null) return <Loader active inline="centered" />

  return (
    <Editor
      defaultValue={props.defaultValue}
      placeholder="Body..."
      onChange={this.onChange}
    />
  )
}
