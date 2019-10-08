import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { appUrls } from 'urls';
import { resolveUrl } from 'base/utils';

class Board extends React.Component {
  render() {
    const { id, title, bgImage, bgColor, index } = this.props;
    const boardUrl = resolveUrl(appUrls.BOARDS.LIST, { id: id });
    return (
      <Link
        className="board"
        to={boardUrl}
        style={{
          backgroundColor: bgColor,
          backgroundImage: `url(${bgImage})`,
          animationDelay: (10 * index) + 'ms'
        }}
      >
        <p className="board__title">{title}</p>
      </Link>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  bgImage: PropTypes.string,
  bgColor: PropTypes.string,
  index: PropTypes.number
};

export default Board;
