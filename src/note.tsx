import React, { Component} from "react";
import Editor from 'rich-markdown-editor';
import { Grid, Dropdown, Button, Container, Divider, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const countryOptions = [
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
  }

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
