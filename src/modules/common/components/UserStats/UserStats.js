import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class UserStats extends React.Component {
  render() {
    const { type, tasks, width } = this.props;
    const taskBarClass = cx({
      'board-user__stats__task-bar--done': type === 'done',
      'board-user__stats__task-bar--undone': type === 'outdated',
      'board-user__stats__task-bar--todo': type === 'todo'
    });
    return (
      <div
        className="board-user__stats__task-bar board-user__stats__task-bar--gray"
        data-tip={`${type} tasks`}
        data-delay-show="500"
      >
        <div className={taskBarClass} style={{ width: width + '%' }}>
          <p className="task-bar__number">{tasks}</p>
        </div>
      </div>
    );
  }
}

UserStats.propTypes = {
  type: PropTypes.string,
  tasks: PropTypes.number,
  width: PropTypes.number
};

export default UserStats;
