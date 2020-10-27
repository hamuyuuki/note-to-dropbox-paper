import React, { Component} from "react";
import Editor from 'rich-markdown-editor';
import { Grid, Dropdown, Button, Container, Divider, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import { browser } from 'webextension-polyfill-ts';

const folderOptions = [
  { key: 'a', value: 'a', text: '調べ物' },
  { key: 'b', value: 'b', text: '自宅' },
  { key: 'c', value: 'c', text: '会社' },
]

interface Props {}
interface State {
  titleValue: string,
  bodyValue: string,
}

export default class App extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { titleValue: "", bodyValue: "" };
  }

  onChangeTitle = (event, data) => {
    this.setState({ titleValue: data.value });
  }

  onChangeBody = (value) => {
    this.setState({ bodyValue: value() });
  };

  onClick = async (event, data) => {
    const redirectUrl = browser.identity.getRedirectURL("oauth2/callback");
    const client_id = "";
    const authorization_url = `https://www.dropbox.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirectUrl}&response_type=token`;

    const redirect_url = await browser.identity.launchWebAuthFlow({ 'url': authorization_url, 'interactive': true });
    const fragments = new URLSearchParams(new URL(redirect_url).hash.substr(1));

    const dropbox = new Dropbox({ fetch, accessToken: fragments.get("access_token") });
    const content = this.state.titleValue + '\n\n' + this.state.bodyValue.replace(/\\/g, "");
    const response = await dropbox.paperDocsCreate({ contents: content, import_format: {".tag": "markdown"}, parent_folder_id: "" });
    alert("Dropbox Paperへ登録が成功しました！");
  }

  render(){
    return(
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Dropdown placeholder='Select folder' search selection options={folderOptions} />
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
              <Editor defaultValue={this.state.bodyValue} placeholder='Body...' onChange={this.onChangeBody} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
