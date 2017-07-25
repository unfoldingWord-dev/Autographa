import React from 'react';
import View from './components/View';
import fetchData from './FetchData/main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

// String constants
const NAMESPACE = "Autographa";

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisibility: false,
      modalSettingsVisibility: false,
      modalSearchVisibility: false
    };
  }

  view() {
    let view = <div />
    let { contextId } = this.props.contextIdReducer;
    if (contextId) {
      view = <MuiThemeProvider><View
        {...this.props}
            modalVisibility={this.state.modalVisibility}
            modalSettingsVisibility={this.state.modalSettingsVisibility}
            modalSearchVisibility={this.state.modalSearchVisibility}
            modalAboutUsVisibility={this.state.modalAboutUsVisibility}
            showModal={() => this.setState({ modalVisibility: true, selectedPane: false })}
            showSettingsModal={() => this.setState({ modalSettingsVisibility: true })}
            hideModal={() => this.setState({ modalVisibility: false, modalSettingsVisibility:false,modalSearchVisibility:false,modalAboutUsVisibility:false })}
            showSearchReplaceModal ={() => this.setState({ modalSearchVisibility: true })}
            showAboutModal ={() => this.setState({ modalAboutUsVisibility: true })}
      />
      </MuiThemeProvider>
    }
    return view;
  }

  render() {
    return (
      this.view()
    );
  }
}

Container.propTypes = {
  toolsReducer: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  loaderReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  commentsReducer: PropTypes.object.isRequired,
  remindersReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  verseEditReducer: PropTypes.object.isRequired,
  groupsIndexReducer: PropTypes.object.isRequired,
  groupsDataReducer: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

module.exports = {
  name: NAMESPACE,
  container: Container,
  fetchData: fetchData
};
