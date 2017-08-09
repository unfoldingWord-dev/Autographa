/**
  * @description This component displays a modal when the user clicks the add
  * resources button on the scripture pane module.
******************************************************************************/
import React from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import style from '../css/Style';
class ChapterModal extends React.Component {
  constructor(props){
      super(props);
      this.changeChapter = this.changeChapter.bind(this);
  }

  changeChapter(contextId){
    console.log(contextId.reference.verse)
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
        <Modal.Body style={{ padding: '0px', backgroundColor: "var(--reverse-color)", color: "var(--text-color)" }}>
          <div style={{height: "350px", display: 'flex'}}>
            {
              
              Object.keys(chapters).map(function (chapter, index) {
                return(<Col sm={1} key = {index} ><span><a style={style.chapmodal}  href="javascript:void(0);"  onClick={() => _this.changeChapter(chapters[chapter][index].contextId) }>{index +1}</a></span></Col>)
              })
            }
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "var(--reverse-color)" }}>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChapterModal;
