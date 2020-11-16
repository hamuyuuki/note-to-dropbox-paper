import React, { Component} from "react";
import Editor from 'rich-markdown-editor';
import { Grid, Dropdown, Button, Container, Divider, Input, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import { browser } from 'webextension-polyfill-ts';


interface Props {}
interface State {
  titleValue: string,
  bodyValue: string,
  folderOptions: Array<{key: string, value: string, text: string}>
}

export default class App extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { titleValue: "", bodyValue: "", folderOptions: [] };
  }

  async componentDidMount() {
    this.setState({
      titleValue: (await browser.tabs.query({ active: true }))[0].title,
      // bodyValue: (await browser.tabs.query({ active: true }))[0].url,
      folderOptions: [
        { key: 'a', value: 'a', text: '調べ物' },
        { key: 'b', value: 'b', text: '自宅' },
        { key: 'c', value: 'c', text: '会社' },
      ]
    });
  }

  onChangeTitle = (event, data) => {
    this.setState({ titleValue: data.value });
  }

  onChangeBody = (value) => {
    this.setState({ bodyValue: value() });
  };

  onClick = async (event, data) => {
    const background: any = await browser.runtime.getBackgroundPage();
    const accessToken = await background.getAccessToken();

    const dropbox = new Dropbox({ fetch, accessToken: accessToken });
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
                this.state.bodyValue ?
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
