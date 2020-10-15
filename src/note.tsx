import React, { Component} from "react";
import Editor from 'rich-markdown-editor';
import { Grid, Dropdown, Button, Container, Divider, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

const folderOptions = [
  { key: 'a', value: 'a', text: '調べ物' },
  { key: 'b', value: 'b', text: '自宅' },
  { key: 'c', value: 'c', text: '会社' },
]

interface Props {}
interface State {
  value: String,
}

export default class App extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { value: "Title" };
  }

  onChange = (value) => {
    this.setState({value: value()});
  };

  onClick = async (event, data) => {
    const dropbox = new Dropbox({ fetch, accessToken: "" });
    const response = await dropbox.paperDocsCreate({ contents: this.state.value, import_format: {".tag": "markdown"} });
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
              <Input size='massive' transparent fluid placeholder='Title...' value={this.state.value} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Editor placeholder='Body...' onChange={this.onChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
