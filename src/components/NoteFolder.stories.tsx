import React from 'react'
import NoteFolder from './NoteFolder'

export default {
  component: NoteFolder,
  title: 'NoteFolder',
}

export const Default = (): JSX.Element => <NoteFolder />
export const Included = (): JSX.Element => (
  <NoteFolder options={[{ key: 'a', value: 'a', text: '調べ物' }]} />
)
