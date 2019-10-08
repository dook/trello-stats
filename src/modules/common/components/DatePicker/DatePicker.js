import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import cx from 'classnames';

import { convertDate } from 'base/utils';

import 'flatpickr/dist/themes/material_green.css';

class DatePicker extends React.Component {
  state = {
    lastValue: null
  };

  handleClear = () => {
    this.setState({ lastValue: null });
    this.props.onClose(null, null);
  }

  handleClose = (selectedDates, valueString, instance) => {
    if (this.state.lastValue !== valueString) {
      if (selectedDates.length === 0 ) {
        this.handleClear();
      } else {
        const from = convertDate(selectedDates[0]);
        if (selectedDates.length === 1) {
          instance.setDate([selectedDates[0], selectedDates[0]], true);
          this.props.onClose(from, from);
        } else {
          const to = convertDate(selectedDates[1]);
          this.props.onClose(from, to);
        }
      }
      this.setState({ lastValue: valueString });
    }
  }

  render() {
    const { className } = this.props;
    const { lastValue } = this.state;
    const iconClasses = cx(
      'input__icon',
      'material-icons', {
        'input__icon--clear': lastValue,
        'input__icon--datepicker': !lastValue
      });
    return (
      <div className={cx('datepicker', className)}>
        <Flatpickr
          placeholder="All time"
          options={{
            mode: 'range',
            onClose: this.handleClose
          }}
        />
        <i className={iconClasses} onClick={this.handleClear}>
          {lastValue ? 'clear' : 'date_range'}
        </i>
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onClose: PropTypes.func,
};

export default DatePicker;
