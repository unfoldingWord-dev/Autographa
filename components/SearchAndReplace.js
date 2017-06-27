import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';

class SearchAndReplace extends React.Component {
    constructor(props){
        super(props);
        this.state = {targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage, find:"", replace:"",replaceCount:0}
        console.log(this.props)
    }

    escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    handleFindChange(e) {
        this.setState({find: e.target.value});
    }

    handleReplaceChange(e) {
       this.setState({replace: e.target.value});
    }

    findAndReplaceText() {
        let reference = this.props.allProps.contextIdReducer.contextId;
        let currentChapter = reference.reference.chapter;
        var size = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]).length
        var searchVal = this.state.find.toString().toLowerCase();
        var replaceVal = this.state.replace;
        var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
        for (var i = 1; i < size; i++) {
          var originalVerse = targetContent[i]
           if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                console.log(modifiedVerse)
                this.setState({targetContent:modifiedVerse})
               //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;
               
            }
        }
    }
    selectRadioButton(e){
        console.log(e.target.value)
    }

  render() {
     let { onHide,  show, chapters } = this.props;
    
    return (
      <Modal show={show} onHide={onHide} bsSize="lg">
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
            <Modal.Title>Search and Replace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this)}>
                Current Chapter
              </Radio>
              {' '}
              <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this)}>
                Current Book
              </Radio>
              {' '}
            </FormGroup>
        <div>
            <label>Find</label><br />
            <TextField value={this.state.find} onChange={this.handleFindChange.bind(this)}/> <br />
            <label>Replace With</label><br />
            <TextField hintText="Replacement" value={this.state.replace} onChange={this.handleReplaceChange.bind(this)}/>
            <Button onClick={this.findAndReplaceText.bind(this)}>Replace</Button>
        </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SearchAndReplace;
