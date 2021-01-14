import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  InputOnChangeData,
  Message,
} from 'semantic-ui-react'
import { browser } from 'webextension-polyfill-ts'
import NoteEditor from './components/NoteEditor'
import NoteTitle from './components/NoteTitle'

type State = {
  titleValue: string
  bodyValue: string
  folderOptions: Array<{ key: string; value: string; text: string }>
  successfulSubmission: boolean
  failedSubmission: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default class App extends React.Component<{}, State> {
  state = {
    titleValue: '',
    bodyValue: null,
    folderOptions: [],
    successfulSubmission: false,
    failedSubmission: false,
  }

  async componentDidMount(): Promise<void> {
    this.setState({
      titleValue: (await browser.storage.local.get('titleValue')).titleValue,
      bodyValue: (await browser.storage.local.get('bodyValue')).bodyValue,
      folderOptions: [
        { key: 'a', value: 'a', text: '調べ物' },
        { key: 'b', value: 'b', text: '自宅' },
        { key: 'c', value: 'c', text: '会社' },
      ],
    })
  }

  handleDismiss = (): void => {
    this.setState({ successfulSubmission: false, failedSubmission: false })
  }

  onChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ): void => {
    this.setState({ titleValue: data.value })
    browser.storage.local.set({ titleValue: data.value })
  }

  onChangeBody = (value: () => string): void => {
    this.setState({ bodyValue: value() })
    browser.storage.local.set({ bodyValue: value() })
  }

  onClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const background = (await browser.runtime.getBackgroundPage()) as any
    const accessToken = await background.getAccessToken()

    const content =
      this.state.titleValue + '\n\n' + this.state.bodyValue.replace(/\\/g, '')

    try {
      const dropbox = new Dropbox({ fetch, accessToken: accessToken })
      dropbox.paperDocsCreate({
        contents: content,
        import_format: { '.tag': 'markdown' },
        parent_folder_id: '',
      })
    } catch (e) {
      this.setState({ failedSubmission: true })
    }

    this.setState({ successfulSubmission: true })
    browser.storage.local.set({ titleValue: '', bodyValue: '' })
  }

  render(): JSX.Element {
    return (
      <Container>
        <Message
          positive
          hidden={!this.state.successfulSubmission}
          onDismiss={this.handleDismiss}
        >
          <Message.Header>Dropbox Paperへ登録が成功しました</Message.Header>
        </Message>
        <Message
          negative
          hidden={!this.state.failedSubmission}
          onDismiss={this.handleDismiss}
        >
          <Message.Header>Dropbox Paperへ登録が失敗しました</Message.Header>
        </Message>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Dropdown
                placeholder="Select folder"
                search
                selection
                options={this.state.folderOptions}
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button primary onClick={this.onClick}>
                Submit
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <NoteTitle
                defaultTitle={this.state.titleValue}
                onChange={this.onChangeTitle}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <NoteEditor
                defaultValue={this.state.bodyValue}
                onChange={this.onChangeBody}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
