import React from 'react'
import { Message, MessageProps } from 'semantic-ui-react'

export default function NoteMessage(props: {
  success?: boolean
  error?: boolean
  onDismiss?: (event: React.MouseEvent<HTMLElement>, data: MessageProps) => void
}): JSX.Element {
  if (!props.success && !props.error) return <></>

  if (props.success) {
    return (
      <Message success onDismiss={props.onDismiss}>
        <Message.Header>Dropbox Paperへ登録が成功しました</Message.Header>
      </Message>
    )
  }

  if (props.error) {
    return (
      <Message error onDismiss={props.onDismiss}>
        <Message.Header>Dropbox Paperへ登録が失敗しました</Message.Header>
      </Message>
    )
  }
}
