import React from 'react';
import View from './components/View';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    debugger
    let view = <div />
    let { contextId } = this.props.contextIdReducer;
    debugger
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

export default Container;
