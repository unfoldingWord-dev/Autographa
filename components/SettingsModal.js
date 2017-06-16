/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
const { dialog } = require('electron').remote;
import { Modal, Button, Col, Tab, Tabs, Nav, Row, NavItem } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SettingModal extends React.Component {
  constructor(props){
        super(props);
        this.state = {value: ''};
  }

    targetExportPath(e){
        dialog.showOpenDialog({
            properties: ['openDirectory'],
            filters: [{ name: 'All Files', extensions: ['*'] }],
            title: "Select import folder for target"
        }, function(selectedDir) {
                if (selectedDir != null) {
                    this.setState({value: selectedDir});
                }
            }.bind(this));
    };

  render() {
    let { onHide,  show } = this.props;
    var _this = this;
    return (
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-sm" style={{}}>
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>
              Settings
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ padding: '0px', backgroundColor: "var(--reverse-color)", color: "var(--text-color)" }}>
          <div style={{height: "350px", display: 'flex'}}>
             <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                          <NavItem eventKey="first">
                            Translation Details
                          </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                          <Tab.Pane eventKey="first">
                           <div className="form-group">
                                <label htmlFor="ref-path">Path to Folder Location</label><br />
                                {/*<input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />*/}
                                <TextField hintText="Path of folder containing USFM files" value={this.state.value} onClick={(e) =>this.targetExportPath(e)}/>
                          </div> 
                        {/*<button style={{float:"right", marginRight: "33px"}} className="btn btn-success" id="save-settings">Save</button>
                        <Button label="Save" onClick={onHide}>Save</Button>*/}
                        <RaisedButton label="Save" primary={true} onClick={onHide}/>
                          </Tab.Pane>
                        </Tab.Content>

                        
                    </Col>
                </Row>
            </Tab.Container>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--reverse-color)" }}>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettingModal;
