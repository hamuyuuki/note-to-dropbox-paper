import React from 'react'
import NoteTitle from './NoteTitle'

export default {
  component: NoteTitle,
  title: 'NoteTitle',
}

export const Default = (): JSX.Element => <NoteTitle />
export const Inputed = (): JSX.Element => <NoteTitle defaultTitle="Inputed" />
