import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { appUrls } from 'urls';
import { resolveUrl } from 'base/utils';
import { boardsActions } from 'modules/boards/redux/actions';
import ListTile from '../components/SettingsModal/ListTile/ListTile';

class SettingsView extends React.Component {
  state = {
    excluded: [],
    done: [],
    undone: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { match: { params } } = this.props;
    dispatch(boardsActions.fetchLists(params.id));
    dispatch(boardsActions.fetchSettings(params.id));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.done !== this.props.settings.done) {
      const { excluded, done, undone } = this.props.settings;
      this.setState({
        excluded,
        done,
        undone
      });
    }
  }

  listPlaceholder = (i) => {
    return (
      <div className="list-tile-placeholder" key={i} />
    );
  };

  handleSave = () => {
    const { excluded, done, undone } = this.state;
    const { dispatch, match: { params } } = this.props;
    const options = { payload: { ...this.props.settings, excluded, done, undone } };
    dispatch(boardsActions.updateSettings(params.id, options));
    dispatch(push(resolveUrl(appUrls.BOARDS.LIST, params))); // TODO: move to saga on success
  };

  handleClickExcluded = (id) => {
    const { excluded, done, undone } = this.state;
    if (excluded.includes(id)) {
      return this.setState({
        excluded: excluded.filter((item) => {
          return item !== id;
        })
      });
    }
    if (!excluded.includes(id)) {
      return this.setState({
        excluded: [...excluded, id],
        done: done.filter((item) => {
          return item !== id;
        }),
        undone: undone.filter((item) => {
          return item !== id;
        })
      });
    }
  };

  handleClickDone = (id) => {
    const { excluded, done, undone } = this.state;
    if (done.includes(id)) {
      return this.setState({
        done: done.filter((item) => {
          return item !== id;
        })
      });
    }
    if (!done.includes(id)) {
      return this.setState({
        done: [...done, id],
        undone: undone.filter((item) => {
          return item !== id;
        }),
        excluded: excluded.filter((item) => {
          return item !== id;
        })
      });
    }
  };

  handleClickUndone = (id) => {
    const { excluded, done, undone } = this.state;
    if (undone.includes(id)) {
      return this.setState({
        undone: undone.filter((item) => {
          return item !== id;
        })
      });
    }
    if (!undone.includes(id)) {
      return this.setState({
        undone: [...undone, id],
        done: done.filter((item) => {
          return item !== id;
        }),
        excluded: excluded.filter((item) => {
          return item !== id;
        })
      });
    }
  };

  render() {
    const { lists, isFetching, isError, match } = this.props;
    const { excluded, done, undone } = this.state;
    return (
      <div className="settings-view">
        <h2 className="header-2">Customize your board statistics</h2>
        <div className="settings-category">
          <p className="settings-category__heading">Choose lists to <strong>ignore</strong></p>
          <ul className="settings-category__list">
            {isFetching
              ? Array(4).fill().map((_, i) => this.listPlaceholder(i))
              : lists.map((item, i) => (
                <ListTile
                  key={item.id}
                  index={i}
                  name={item.name}
                  isActive={excluded.includes(item.id)}
                  onClick={() => {
                    this.handleClickExcluded(item.id);
                  }}
                />
              ))}
          </ul>
        </div>
        <div className="settings-category">
          <p className="settings-category__heading">Choose lists with <strong>done</strong> tasks</p>
          <ul className="settings-category__list">
            {isFetching
              ? Array(4).fill().map((_, i) => this.listPlaceholder(i))
              : lists.map((item, i) => (
                <ListTile
                  key={item.id}
                  index={i}
                  name={item.name}
                  isActive={done.includes(item.id)}
                  onClick={() => {
                    this.handleClickDone(item.id);
                  }}
                />
              ))}
          </ul>
        </div>
        <div className="settings-category">
          <p className="settings-category__heading">Choose lists with <strong>outdated</strong> tasks </p>
          <ul className="settings-category__list">
            {isFetching
              ? Array(4).fill().map((_, i) => this.listPlaceholder(i))
              : lists.map((item, i) => (
                <ListTile
                  key={item.id}
                  index={i}
                  name={item.name}
                  isActive={undone.includes(item.id)}
                  onClick={() => {
                    this.handleClickUndone(item.id);
                  }}
                />
              ))}
          </ul>
        </div>
        <div className="settings-buttons">
          <button
            className="settings-buttons__button settings-buttons__button--save"
            onClick={this.handleSave}
            disabled={isFetching || isError}
          >
            Save
          </button>
          <Link
            to={resolveUrl(appUrls.BOARDS.LIST, match.params)}
            className="settings-buttons__button settings-buttons__button--cancel"
          >
            Cancel
          </Link>
        </div>
      </div>
    );
  }
}

SettingsView.propTypes = {
  history: PropTypes.object,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func,
  url: PropTypes.string,
  lists: PropTypes.array,
  settings: PropTypes.object,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  match: PropTypes.object
};

const mapStateToProps = ({ boards: { board: { settings, lists } }}) => {
  return {
    lists: lists.data || [],
    settings: settings.data || {},
    isFetching: !!(lists.isFetching || settings.isFetching),
    isError: !!(lists.error || settings.error)
  };
};

export default connect(mapStateToProps)(SettingsView);
