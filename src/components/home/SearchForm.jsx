import React from 'react';
import { History } from 'react-router';
import debounce from 'lodash/function/debounce';

const SearchForm = React.createClass({
  mixins: [History],
  getInitialState() {
    return {
      text: this.props.searchText
    };
  },
  componentDidMount() {
    this.emitChangeDelayed = debounce(this.emitChange, 300);
  },
  handleChange(e) {
    const text = e.target.value;
    this.setState({
      text
    });
    this.emitChangeDelayed(text);
  },
  emitChange(text) {
    if (text) {
      this.history.pushState(null, `/search/${text}`);
    } else {
      this.history.pushState(null, '/');
    }
    // console.log('SearchForm emitChange', text);
  },
  render() {
    const style = {
      boxSizing: 'border-box', // to prevent the input from overlapping the container
      padding: '0.5em 1em',
      border: '3px solid #ddd',
      borderRadius: 6,
      fontSize: '1em'
    };
    return (
        <div className="ui input icon">
          <input
            type="text"
            style={ style }
            onChange={ this.handleChange }
          />
        <span className="mega-octicon octicon-search ui icon"></span>
        </div>
    );
  }
});
module.exports = SearchForm;
