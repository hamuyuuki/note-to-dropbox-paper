import React from 'react'
import App from './note'

export default {
  title: 'Note',
}

export const ToStorybook = (): JSX.Element => <App />

ToStorybook.story = {
  name: 'default',
}
