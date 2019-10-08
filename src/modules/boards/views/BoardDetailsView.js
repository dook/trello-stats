import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Searchbar from 'modules/common/components/Searchbar/Searchbar';
import DatePicker from 'modules/common/components/DatePicker/DatePicker';
import { appUrls } from 'urls';
import { matchUrl, resolveUrl } from 'base/utils';
import { boardsActions } from '../redux/actions';
import UserDetails from '../components/UserDetails';
import { addToRecentBoards } from 'base/utils/localstorage';

const UserDetailsPlaceholder = () => Array(4).fill().map((_, i) => (
  <li key={i} className="user-placeholder-container">
    <div className="user-placeholder__mobile-name" />
    <div className="user-placeholder">
      <span className="user-placeholder__initials"></span>
      <div className="user-placeholder__data">
        <div className="user-placeholder__data__name" />
        <div className="user-placeholder__data__tasks" />
      </div>
      <div className="board-user__stats">
        <div className="user-placeholder__stats__task-bar" />
        <div className="user-placeholder__stats__task-bar" />
        <div className="user-placeholder__stats__task-bar" />
      </div>
    </div>
  </li>
));

class BoardDetailsView extends React.Component {
  state = {
    search: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { url } = this.props.match;
    const id = matchUrl(appUrls.BOARDS.LIST, url).id;
    dispatch(boardsActions.fetchOne(id));
    addToRecentBoards(id);
  }

  onChange = (value) => {
    this.setState({ search: value });
  }

  handleDateChange = (from, to) => {
    const { dispatch } = this.props;
    const { url } = this.props.match;
    const id = matchUrl(appUrls.BOARDS.LIST, url).id;
    dispatch(boardsActions.fetchOne(id, from, to));
  }

  render() {
    const { members, membersNames, name, maxNum, isFetching, error } = this.props;
    const routeParams = matchUrl(appUrls.BOARDS.LIST, this.props.match.url);
    const settingsUrl = resolveUrl(appUrls.BOARDS.SETTINGS, routeParams);

    const filteredMembers = members.filter(
      (member) => member.fullName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    );

    return (
      <div className="board-details">
        <h2 className="header-2">{isFetching ? 'Loading...' : name}</h2>
        <div className="board-details__inputs">
          <Searchbar
            className="board-details__searchbar"
            placeholder="Find user"
            search={this.state.search}
            onChange={this.onChange}
            data={membersNames}
          />
          <DatePicker
            className="board-details__datepicker"
            onClose={this.handleDateChange}
          />
          <Link className="board-details__settings" to={settingsUrl}>
            <span className="board-details__settings-icon material-icons">settings</span>
          </Link>
        </div>
        <ul className="board-details__legend">
          <li className="board-details__legend-item board-details__legend-item--done">Done</li>
          <li className="board-details__legend-item board-details__legend-item--inprogress">In progress</li>
          <li className="board-details__legend-item board-details__legend-item--undone">Outdated</li>
        </ul>
        <ul className="board-details__list">
          {isFetching
            ? <UserDetailsPlaceholder />
            : filteredMembers.map((item, i) => (
              <UserDetails
                key={item.id}
                index={i}
                name={item.fullName}
                tasks={item.stats}
                maxNum={maxNum}
                img={item.avatarUrl} />
            ))}
          {error && (
            <p className="error">{'There was an error loading this board\'s details :('}</p>
          )}
        </ul>
      </div>
    );
  }
}

BoardDetailsView.propTypes = {
  url: PropTypes.string,
  match: PropTypes.object,
  dispatch: PropTypes.func,
  title: PropTypes.string,
  members: PropTypes.array,
  membersNames: PropTypes.array,
  name: PropTypes.string,
  maxNum: PropTypes.number,
  isFetching: PropTypes.bool,
  error: PropTypes.object,
  id: PropTypes.string
};

const mapStateToProps = ({ boards: { board } }) => {
  const { data } = board.users;
  const membersNames = data && data.members.map((member) => member.fullName);
  return {
    members: data && data.members || [],
    membersNames,
    name: data && data.name,
    maxNum: data && data.biggestCount,
    id: data && data.id,
    isFetching: board.users.isFetching,
    error: board.users.error
  };
};

export default connect(mapStateToProps)(BoardDetailsView);
