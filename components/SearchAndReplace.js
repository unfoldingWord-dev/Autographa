import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';

class SearchAndReplace extends React.Component {
  constructor(props){
      super(props);
      this.state = {targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage, find:"", replace:"",replaceCount:0}
      console.log(this.props)
  }

  /*  findAndReplaceText(searchText){
        if (this.refs.searchText !== null) {
            var input = this.refs.searchText;
            var inputValue = input.value;
            console.log(input)
        }
    }*/
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
    console.log(reference);
    let currentChapter = reference.reference.chapter;
        console.log(currentChapter);
        var a = [];
        var verses_arr = []; 
        var replacedVerse = {};
        var chapter_hash = {};
        var searchVal = this.state.find.toString().toLowerCase();
        console.log(searchVal);
        var replaceVal = this.state.replace;
        var targetContent = this.state.targetContent;
        console.log(targetContent)
        for (var i = 1; i < 7; i++) {
          a.push(targetContent[i]);
          console.log(a)
        }
        /*for (var i = 0; i < a.length; i++) {
            a[i]
        }*/
          var originalVerse = targetContent[i]
          console.log(originalVerse[i])
           if (originalVerse[i].search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                var modifiedVerse = originalVerse[i].replace(searchVal, replaceVal);
                console.log(modifiedVerse)
                this.setState({targetContent:modifiedVerse})
               //var replaceCount += originalVerse.match(new RegExp(escapeRegExp(searchVal), 'g')).length;
               
        }
    

          //let matches = targetContent[4][1].filter(searchVal);
       
           /* if (targetContent[4].search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0 ){
                console.log(searchVal)
            }*/
        
               
        /*let { reference } = contextIdReducer.contextId;
        let { targetLanguage, ULB } = resourcesReducer.bibles;
        let currentChapter = targetLanguage[reference.chapter];
        let chapters = this.props.groupsDataReducer.groupsData;
        const verses = (bibleId, bible) => {
        let verseNumbers = Object.keys(currentChapter);
        let verses = verseNumbers.map( (verseNumber, index) => {
        let editable = bibleId === 'target';
        let verseText = bible[reference.chapter][verseNumber];*/
        console.log("Find:"+ this.state.find);
        console.log("Replace:"+ this.state.replace);
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
              <Radio name="radioGroup" inline>
                Current Chapter
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
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
