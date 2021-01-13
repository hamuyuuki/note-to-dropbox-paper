import React from 'react'
import NoteEditor from './NoteEditor'

export default {
  component: NoteEditor,
  title: 'NoteEditor',
}

export const Default = (): JSX.Element => <NoteEditor />
export const Inputed = (): JSX.Element => (
  <NoteEditor defaultValue="# Inputed" />
)
