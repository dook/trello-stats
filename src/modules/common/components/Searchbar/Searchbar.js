import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      hint: ''
    };
  }

  handleChange = (e) => {
    const { data, onChange } = this.props;
    let ending = '';
    if (e.target.value.length > 1) {
      const found = data.find((item) => {
        return item.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase();
      });
      ending = found ? found.substring(e.target.value.length) : '';
    }
    this.setState({ search: e.target.value, hint: ending });
    onChange(e.target.value);
  }

  handleKey = (e) => {
    const { onChange } = this.props;
    const { hint, search } = this.state;
    if (e.key === 'Tab' || e.key === 'ArrowRight') {
      if (hint) {
        e.preventDefault();
        this.setState({ search: search + hint, hint: '' });
        onChange(hint);
      }
    }
  }

  handleClear = () => {
    const { onChange } = this.props;
    this.setState({ search: '', hint: '' });
    onChange('');
  }

  render() {
    const { className } = this.props;
    const { search } = this.state;
    const iconClasses = cx(
      'input__icon',
      'material-icons',
      {
        'input__icon--clear': search,
        'input__icon--search': !search
      });
    return (
      <div className={cx('searchbar', className)}>
        <input
          className="input searchbar__input"
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          placeholder={this.props.placeholder} />
        <i className={iconClasses} onClick={this.handleClear}>{search ? 'clear' : 'search'}</i>
        <p className="searchbar__hint">
          <span className="searchbar__hint__span">{this.state.search}</span><span>{this.state.hint}</span>
        </p>
      </div>
    );
  }
}

Searchbar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  search: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.array
};

export default Searchbar;
