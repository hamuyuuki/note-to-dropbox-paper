import React from 'react'
import NoteMessage from './NoteMessage'

export default {
  component: NoteMessage,
  title: 'NoteMessage',
}

export const Default = (): JSX.Element => <NoteMessage />
export const Success = (): JSX.Element => <NoteMessage success />
export const Error = (): JSX.Element => <NoteMessage error />
