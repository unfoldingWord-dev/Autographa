import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class SearchAndReplace extends React.Component {
    constructor(props){
        super(props);
        this.state = {targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage, find:"", replace:"",replaceCount:0,selection:'chapter',showResults:true}
 
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
        var replacecount = 0;
        let {loginReducer, actions, contextIdReducer, resourcesReducer, groupsIndexReducer} = this.props.allProps;
        let {chapter, verse} = contextIdReducer.contextId.reference;
        let username = loginReducer.userdata.username;

        if(this.state.selection == "chapter") {
            console.log("hi");
            var size = Object.keys(resourcesReducer.bibles.targetLanguage[chapter]).length
            var searchVal = this.state.find.toString();
            var replaceVal = this.state.replace;
            var targetContent = resourcesReducer.bibles.targetLanguage[chapter];
            for (var i = 1; i <= size; i++) {
                let before = resourcesReducer.bibles.targetLanguage[chapter][i];
                var originalVerse = targetContent[i];
                if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {    
                    replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                    var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                    targetContent[i] = modifiedVerse;

                    if (before !== modifiedVerse) {
                        actions.addVerseEdit(before, modifiedVerse, ['draft'], username);
                    }
                    targetContent = resourcesReducer.bibles.targetLanguage[chapter]
                    // console.log(this.props.allProps.resourcesReducer.bibles.targetLanguage[chapter])
                    this.setState({showResults:false,replaceCount:replacecount});
                }
            }
                
        }else {
            console.log(groupsIndexReducer)
            let noOfChapters = groupsIndexReducer.groupsIndex.length;
            var searchVal = this.state.find.toString().toLowerCase();
            var replaceVal = this.state.replace;
            // var currentChapterVerse = resourcesReducer.bibles.targetLanguage[chapter]
            // console.log(resourcesReducer.bibles.targetLanguage[1])
            for (var i = 1; i <= noOfChapters; i++) {
                var noOfVerses = Object.keys(resourcesReducer.bibles.targetLanguage[i]).length
                for (var j = 1; j <= noOfVerses; j++) {
                    // console.log(resourcesReducer.bibles.targetLanguage[i])
                    // let before = resourcesReducer.bibles.targetLanguage[chapter][j];
                    var targetContent = resourcesReducer.bibles.targetLanguage[i]
                    var originalVerse = targetContent[j]
                   if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                        var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                        targetContent[j] = modifiedVerse 

                        if (originalVerse !== modifiedVerse) {
                            actions.addVerseEdit(originalVerse, modifiedVerse, ['draft'], username);
                        }   
                        // replaceCount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                    }
                    //originalVerse[j] = modifiedVerse 
                    //targetContent[i][j] = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
                    //this.setState({showResults:true});

                }
               // console.log(targetContent)
            }
        }
    }


    selectRadioButton(e){
      // console.log(event.target.value)
      //   this.setState({selection:selection})
        e.persist();
          setTimeout(() => {
            this.setState({selection: e.target.value}) 
          }, 100)
  // console.log(e.target.value)
    }

    closeModal(){
        this.setState({showResults:true,replaceCount:0,replace:"",find:""})
        this.props.onHide();
    }

  render() {
    const bookName = this.props.allProps.projectDetailsReducer.bookName
    let { onHide,  show, chapters } = this.props;
    return (
      <Modal show={show} onHide={onHide} bsSize="lg">
        <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
            <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>Search and Replace</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ 
            this.state.showResults ? <div> 
            <RadioButtonGroup name="SearchAndReplace" style={{display: "flex"}} defaultSelected={this.state.selection} onChange={this.selectRadioButton.bind(this)}
    >
              <RadioButton
                value="chapter"
                label="Current Chapter"
                style={{width: "20%"}}
              />
              <RadioButton
                value="book"
                label="Current Book"
                style={{width: "20%"}}
              />
            </RadioButtonGroup>
                {/*<FormGroup>
                  <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this,'chapter')} defaultChecked={this.state.selection}>
                    Current Chapter
                  </Radio>
                  {' '}
                  <Radio name="radioGroup" inline onChange={this.selectRadioButton.bind(this,'book')}>
                    Current Book
                  </Radio>
                  {' '}
                </FormGroup>*/}
                <div>
                    {/*<label>Find</label><br />*/}
                    <TextField hintText="Find" floatingLabelText="Find" value={this.state.find} onChange={this.handleFindChange.bind(this)}/> <br />
                    {/*<label>Replace With</label><br />*/}
                    <TextField hintText="Replacement" floatingLabelText="Replace With" value={this.state.replace} onChange={this.handleReplaceChange.bind(this)}/> <br />
                    <RaisedButton label="Replace" primary={true} onClick={this.findAndReplaceText.bind(this)} />
                </div>
            </div> : <div>Book Name:{bookName} Total Words Replaced:{this.state.replaceCount}<Button onClick={this.closeModal.bind(this)}>Close</Button></div> 
        }
        </Modal.Body>

      </Modal>
    );
  }
}

export default SearchAndReplace;