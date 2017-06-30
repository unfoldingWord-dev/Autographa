import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';

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
        if(this.state.selection == "chapter") {

            let reference = this.props.allProps.contextIdReducer.contextId;
            let currentChapter = reference.reference.chapter;
            var size = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]).length
            var searchVal = this.state.find.toString().toLowerCase();
            var replaceVal = this.state.replace;
            var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
            for (var i = 1; i <= size; i++) {
                var originalVerse = targetContent[i];
                if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {    
                    replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                    var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                    targetContent[i] = modifiedVerse;
                    targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter]
                    console.log(this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter])
                    this.setState({showResults:false,replaceCount:replacecount});
                }
            }
                
        }else {
            let reference = this.props.allProps.contextIdReducer.contextId;
            let currentChapter = reference.reference.chapter;
            let noOfChapters = this.props.allProps.groupsIndexReducer.groupsIndex.length;
            var searchVal = this.state.find.toString().toLowerCase();
            var replaceVal = this.state.replace;
            for (var i = 1; i <= noOfChapters; i++) {
                var noOfVerses = Object.keys(this.props.allProps.resourcesReducer.bibles.targetLanguage[i]).length
                for (var j = 1; j <= noOfVerses; j++) {
                    var targetContent = this.props.allProps.resourcesReducer.bibles.targetLanguage[i];
                    var originalVerse = targetContent[j]
                   if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                        var modifiedVerse = originalVerse.replace(searchVal, replaceVal);
                        replaceCount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                    }
                    //originalVerse[j] = modifiedVerse 
                    targetContent[j] = modifiedVerse    
                    //targetContent[i][j] = this.props.allProps.resourcesReducer.bibles.targetLanguage[currentChapter];
                    //this.setState({showResults:true});

                }
               console.log(targetContent)
            }
        }
    }


    selectRadioButton(selection){
        this.setState({selection:selection})
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
            <Modal.Title>Search and Replace</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ 
            this.state.showResults ? <div> 
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
            </div> : <div>Book Name:{bookName} Total Words Replaced:{this.state.replaceCount}<Button onClick={this.closeModal.bind(this)}>Close</Button></div> 
        }
        </Modal.Body>

      </Modal>
    );
  }
}

export default SearchAndReplace;
