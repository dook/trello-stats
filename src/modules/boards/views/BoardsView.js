import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../components/Board';
import { boardsActions } from '../redux/actions';
import { getRecentBoards } from 'base/utils/localstorage';

class BoardsView extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(boardsActions.fetchAll());
  }

  boardPlaceholder = (i) => {
    return (
      <div className="board-placeholder" key={i} />
    );
  };

  render() {
    const { isFetching, error, boards, recentBoards, recentBoardsCount } = this.props;

    return (
      <>
        {(recentBoardsCount > 0  && !error) && (
          <>
            <h2 className="header-2">Recently Viewed</h2>
            <div className="boards-container">
              {isFetching
                ? Array(recentBoardsCount).fill().map((_, i) => this.boardPlaceholder(i))
                : recentBoards.map((item, i) => (
                  <Board
                    key={item.id}
                    index={i}
                    title={item.name}
                    id={item.id}
                    bgImage={item.backgroundUrl}
                    bgColor={item.backgroundColor}
                  />
                ))
              }
            </div>
          </>
        )}

        <h2 className="header-2">All Boards</h2>
        <div className="boards-container">
          {isFetching
            ? Array(5).fill().map((item, i) => this.boardPlaceholder(i))
            : boards.map((item, i) => (
              <Board
                key={item.id}
                index={i}
                title={item.name}
                id={item.id}
                bgImage={item.backgroundUrl}
                bgColor={item.backgroundColor}
              />
            ))}
          {error && (
            <p className="error">There was an error loading the boards :(</p>
          )}
        </div>
      </>
    );
  }
}

BoardsView.propTypes = {
  dispatch: PropTypes.func,
  boards: PropTypes.array,
  recentBoards: PropTypes.array,
  recentBoardsCount: PropTypes.number,
  isFetching: PropTypes.bool,
  error: PropTypes.object
};

const mapStateToProps = ({ boards: { allBoards } }) => {
  const recentBoardsIds = getRecentBoards();
  const boards = allBoards.list.data || [];
  const recentBoards = boards.filter((board) => recentBoardsIds.includes(board.id));

  return {
    boards,
    recentBoards,
    recentBoardsCount: recentBoardsIds.length,
    isFetching: allBoards.list.isFetching,
    error: allBoards.list.error,
  };
};


export default connect(mapStateToProps)(BoardsView);
