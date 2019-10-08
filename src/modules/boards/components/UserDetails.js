import React from 'react';
import PropTypes from 'prop-types';
import UserStats from 'modules/common/components/UserStats/UserStats';
import UserAvatar from 'modules/common/components/UserAvatar/UserAvatar';

class UserDetails extends React.Component {
  render() {
    const { name, tasks, maxNum, img, index } = this.props;
    return (
      <li
        className="board-user"
        style={{
          animationDelay: (50 * index) + 'ms'
        }}
      >
        <p className="board-user__name board-user__name--mobile">{name}</p>
        <div className="board-user__card">
          <UserAvatar img={img} name={name} />
          <div className="board-user__info">
            <p className="board-user__name">{name}</p>
            <p className="board-user__total">
              Total tasks: <span className="board-user__total__number">{tasks.total}</span>
            </p>
          </div>
          <div className="board-user__stats">
            <UserStats type="done" tasks={tasks.done} width={maxNum === 0 ? maxNum : (tasks.done / maxNum) * 100} />
            <UserStats type="todo" tasks={tasks.todo} width={(maxNum === 0 ? maxNum : tasks.todo / maxNum) * 100} />
            <UserStats
              type="outdated"
              tasks={tasks.undone}
              width={(maxNum === 0 ? maxNum : tasks.undone / maxNum) * 100}
            />
          </div>
        </div>
      </li>
    );
  }
}

UserDetails.propTypes = {
  name: PropTypes.string,
  tasks: PropTypes.object,
  maxNum: PropTypes.number,
  img: PropTypes.string,
  index: PropTypes.number
};

export default UserDetails;
