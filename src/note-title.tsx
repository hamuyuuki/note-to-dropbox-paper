import React from 'react'
import { Input, InputOnChangeData } from 'semantic-ui-react'

export function noteTitle(props: {title: string, onChange: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void}) : JSX.Element {
  return <Input defaultValue={props.title} size='massive' transparent fluid placeholder='Title...' onChange={props.onChange} />
}
