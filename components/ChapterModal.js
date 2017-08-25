/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import style from '../css/Style';
import RaisedButton from 'material-ui/RaisedButton';

class ChapterModal extends React.Component {
  constructor(props){
      super(props);
      this.changeChapter = this.changeChapter.bind(this);
  }

  changeChapter(contextId){
    // console.log(contextId)
    // console.log(contextId.reference)
    contextId.reference.verse = 1;
    this.props.allProps.actions.changeCurrentContextId(contextId);
    this.props.onHide(this);
  }

  render() {
     let { onHide,  show, chapters } = this.props;
     let { groupsData } = this.props.allProps.groupsDataReducer;
    
    var _this = this;
    return (
      <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-sm" >
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
          <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>
              Chapters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0px', backgroundColor: "var(--reverse-color)", color: "var(--text-color)", height:"200px" }}>
          <ul style={{listStyle: "none", width:"100%", float:"left", margin:"0", padding:"0"}}>
            {
              
              Object.keys(chapters).map(function (chapter, index) {
                return(<li style={{textAlign: "center", listStyle: "none", float: "left", width:"5%", padding:"2px", margin:"2%"}} key = {index}><a style={style.chapmodal}  href="javascript:void(0);"  onClick={() => _this.changeChapter(chapters[chapter][index].contextId) }>{index +1}</a></li>)
              })
            }
          </ul>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--reverse-color)" }}>
          <RaisedButton label="Close" primary={true} onClick={onHide} />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChapterModal;
