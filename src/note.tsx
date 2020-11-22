import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import React from "react";
import Editor from 'rich-markdown-editor';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Divider, Dropdown, Grid, Input, InputOnChangeData, Loader, Message } from 'semantic-ui-react'
import { browser } from 'webextension-polyfill-ts';

type State = {
  titleValue: string,
  bodyValue: string,
  folderOptions: Array<{key: string, value: string, text: string}>,
  submitted: boolean
}

export default class App extends React.Component<{}, State>{
  state = { titleValue: "", bodyValue: null, folderOptions: [], submitted: false };

  async componentDidMount(): Promise<void> {
    this.setState({
      titleValue: (await browser.storage.local.get('titleValue')).titleValue,
      bodyValue: (await browser.storage.local.get('bodyValue')).bodyValue,
      folderOptions: [
        { key: 'a', value: 'a', text: '調べ物' },
        { key: 'b', value: 'b', text: '自宅' },
        { key: 'c', value: 'c', text: '会社' },
      ]
    });
  }

  handleDismiss = (): void => {
    this.setState({ submitted: false })
  };

  onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
    this.setState({ titleValue: data.value });
    browser.storage.local.set({ titleValue: data.value });
  }

  onChangeBody = (value: () => string): void => {
    this.setState({ bodyValue: value() });
    browser.storage.local.set({ bodyValue: value() });
  };

  onClick = async (): Promise<void> => {
    const background = (await browser.runtime.getBackgroundPage() as any);
    const accessToken = await background.getAccessToken();

    const dropbox = new Dropbox({ fetch, accessToken: accessToken });
    const content = this.state.titleValue + '\n\n' + this.state.bodyValue.replace(/\\/g, "");
    await dropbox.paperDocsCreate({ contents: content, import_format: {".tag": "markdown"}, parent_folder_id: "" });
    this.setState({ submitted: true })
    browser.storage.local.set({ titleValue: "", bodyValue: "" });
  }

  render(): JSX.Element {
    return(
      <Container>
        <Message positive hidden={!this.state.submitted} onDismiss={this.handleDismiss}>
          <Message.Header>Dropbox Paperへ登録が成功しました！</Message.Header>
        </Message>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Dropdown placeholder='Select folder' search selection options={this.state.folderOptions} />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button primary onClick={this.onClick}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider/>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Input defaultValue={this.state.titleValue} size='massive' transparent fluid placeholder='Title...' onChange={this.onChangeTitle} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {
                this.state.bodyValue !== null ?
                  <Editor defaultValue={this.state.bodyValue} placeholder='Body...' onChange={this.onChangeBody} /> :
                  <Loader active inline='centered' />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
