import React, { Component} from "react";
import Editor from 'rich-markdown-editor';
import { Grid, Dropdown, Button, Container, Divider, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const countryOptions = [
  { key: 'a', value: 'a', text: '調べ物' },
  { key: 'b', value: 'b', text: '自宅' },
  { key: 'c', value: 'c', text: '会社' },
]

export default class App extends Component{
  render(){
    return(
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign='left'>
              <Dropdown placeholder='Select folder' search selection options={countryOptions} />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button primary>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider/>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Input size='massive' transparent fluid placeholder='Title...' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Editor placeholder='Body...' onChange={() => 1} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
