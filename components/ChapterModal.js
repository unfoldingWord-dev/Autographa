/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
class ChapterModal extends React.Component {
  constructor(props){
      super(props);
      console.log(this.props)
  }

  render() {
     let { onHide,  show, chapters } = this.props;
     let { groupsData } = this.props.allProps.groupsDataReducer
    
    var _this = this;
    return (
      <Modal show={show} onHide={onHide} bsSize="lg" aria-labelledby="contained-modal-title-sm">
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>
              Chapters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0px', height: "550px", backgroundColor: "var(--reverse-color)", color: "var(--text-color)" }}>
          <div style={{height: "350px", display: 'flex'}}>
            {
              
              Object.keys(chapters).map(function (chapter, index) {
                return(<Col sm={1} key = {index} ><span><a href="javascript:void(0);"  onClick={() => _this.props.allProps.actions.changeCurrentContextId(chapters[chapter][index].contextId)}>{chapter}</a></span></Col>)
              })
          }
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--reverse-color)" }}>
          <Button bsStyle="prime" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChapterModal;
