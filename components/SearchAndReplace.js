import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';

class SearchAndReplace extends React.Component {
    constructor(props){
        super(props);
        this.state = {targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage, find:"", replace:"",replaceCount:0,selection:'chapter'}
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
        if(this.state.selection == "chapter") {
        let reference = this.props.allProps.contextIdReducer.contextId;
        let currentChapter = reference.reference.chapter;
        var size = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]).length
        var searchVal = this.state.find.toString().toLowerCase();
        var replaceVal = this.state.replace;
        var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
        for (var i = 1; i < size; i++) {
          var originalVerse = targetContent[i];
           if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {    
                var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                //console.log(targetContent)
                //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;               
            }
            console.log(targetContent[i])
            targetContent[i] = modifiedVerse
            console.log(targetContent)
            this.setState({targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]})
            this.props.onHide();
        }
    }else {
        let reference = this.props.allProps.contextIdReducer.contextId;
        let currentChapter = reference.reference.chapter;
        let bookLength = this.props.allProps.groupsIndexReducer.groupsIndex.length;
        var searchVal = this.state.find.toString().toLowerCase();
        var replaceVal = this.state.replace;
        for (var i = 1; i < bookLength; i++) {
            var noOfVerses = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[i]).length
            for (var j = 3; j < noOfVerses; j++) {
                var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[i];
                var originalVerse = targetContent[j]
               if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                    var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                    //this.setState({targetContent:modifiedVerse})
                   //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;   
                }
                console.log(j)
                console.log(targetContent[i])
               targetContent[i] = modifiedVerse 
               this.props.onHide();
             //originalVerse[j] = modifiedVerse    
            }
            /*console.log(targetContent[i][j])
            targetContent[i] = modifiedVerse*/
        }
    }
}

/*    findAndReplaceText() {
        if (this.state.selection == "chapter") {
            let reference = this.props.allProps.contextIdReducer.contextId;
            let currentChapter = reference.reference.chapter;
            console.log(Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[i]).length)
            var noOfVerses = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]).length
            var searchVal = this.state.find.toString().toLowerCase();
            var replaceVal = this.state.replace;
            var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
            for (var i = 1; i < noOfVerses; i++) {
              var originalVerse = targetContent[i]
               if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                    var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                    this.setState({targetContent:modifiedVerse})
                   //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;
                }
            }
        } else {
            let reference = this.props.allProps.contextIdReducer.contextId;
            let currentChapter = reference.reference.chapter;
            let bookLength = this.props.allProps.groupsIndexReducer.groupsIndex.length;
            var searchVal = this.state.find.toString().toLowerCase();
            var replaceVal = this.state.replace;
            for (var i = 0; i < bookLength; i++) {
                var noOfVerses = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[i]).length
                for (var j = 1; j < noOfVerses; j++) {
                    var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[i][j];
                    var originalVerse = targetContent
                   if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                        var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                        this.setState({targetContent:modifiedVerse})
                       //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;   
                    }
                }
            }
        }
    }*/

    selectRadioButton(selection){
        console.log(selection)
        this.setState({selection:selection})
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
              <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this,'chapter')} defaultChecked={this.state.selection}>
                Current Chapter
              </Radio>
              {' '}
              <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this,'book')}>
                Current Book
              </Radio>
              {' '}
            </FormGroup>
            <div>
                <label>Find</label><br />
                <TextField hintText="Find" value={this.state.find} onChange={this.handleFindChange.bind(this)}/> <br />
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
