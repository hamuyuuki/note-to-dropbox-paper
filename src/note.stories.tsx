import React from "react";
import Editor from 'rich-markdown-editor';

export default {
  title: 'Note'
};

export const ToStorybook = () => <Editor onChange={this.onChange} />;

ToStorybook.story = {
  name: 'default',
};
