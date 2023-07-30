import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchFormButton,
  ButtonLabel,
  Form,
  SearchBar,
  SearchFormInput,
} from './ImageFinder.styled';
import { BiSearchAlt } from 'react-icons/bi';

const INITIAL_STATE = {
  queryValue: '',
};

class Searchbar extends React.Component {
  state = {
    queryValue: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.queryValue.trim() === '') {
      return;
    }
    const { queryValue } = this.state;
    this.props.onSubmit({ queryValue });

    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { queryValue } = this.state;
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormButton aria-label="search" type="submit">
            <BiSearchAlt />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            onChange={this.handleChange}
            value={queryValue}
            name="queryValue"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
