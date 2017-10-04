import React from 'react';
import { Modal, Button, Col, Radio, FormGroup } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class SearchAndReplace extends React.Component {
    constructor(props){
        super(props);
        this.state = {targetContent:this.props.allProps.resourcesReducer.bibles.targetLanguage, find:"", replace:"",replaceCount:0,selection:'chapter',showSearchReplace:"search", checked:false}
 
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
        document.body.style = "pointer-events:none";
        this.setState({showSearchReplace: "loader"});

        setTimeout(function(){
            this.findReplaceSearchInputs();  
            document.body.style = "none";
            this.setState({showSearchReplace:"count"});
        }.bind(this),2000);
    }

    findReplaceSearchInputs(){
        var replacecount = 0;
        let {loginReducer, actions, contextIdReducer, resourcesReducer, groupsIndexReducer} = this.props.allProps;
        let {chapter, verse} = contextIdReducer.contextId.reference;
        let username = loginReducer.userdata.username;
        console.log(this.state.checked)
        if(this.state.selection == "chapter" ) {
            if (this.state.checked) {
                var size = Object.keys(resourcesReducer.bibles.targetLanguage[chapter]).length
                var searchVal = this.state.find.toUpperCase();
                console.log(searchVal)
                var replaceVal = this.state.replace;
                var targetContent = resourcesReducer.bibles.targetLanguage[chapter];
                 console.log(targetContent)
                // console.log(targetContent)
                for (var i = 1; i <= size; i++) {
                    let before = resourcesReducer.bibles.targetLanguage[chapter][i].toUpperCase();
                    // console.log(before)
                    var originalVerse = targetContent[i];
                    if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {    
                        replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                        var modifiedVerse = originalVerse.replace(new RegExp(this.escapeRegExp(searchVal), 'g'), replaceVal);
                        targetContent[i] = modifiedVerse;
                        if (before !== modifiedVerse) {
                            actions.addVerseEdit(before, modifiedVerse, ['draft'], username);
                            // this.setState({replaceCount:replacecount}); 
                        }
                        // targetContent = resourcesReducer.bibles.targetLanguage[chapter]
                        // targetContet = targetContent2.toLowerCase();
                        // console.log(this.props.allProps.resourcesReducer.bibles.targetLanguage[chapter])
                    }
                }
                console.log(targetContent)




            } else{
            console.log("in else")
            var size = Object.keys(resourcesReducer.bibles.targetLanguage[chapter]).length
            var searchVal = this.state.find.toString();
            var replaceVal = this.state.replace;
            var targetContent = resourcesReducer.bibles.targetLanguage[chapter];
            for (var i = 1; i <= size; i++) {

                // console.log(before)
                var originalVerse = targetContent[i];
                if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {    
                    replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;               
                    var modifiedVerse = originalVerse.replace(new RegExp(this.escapeRegExp(searchVal), 'g'), replaceVal);
                    resourcesReducer.bibles.targetLanguage[chapter][i] = modifiedVerse

                    if (originalVerse !== modifiedVerse) {
                    	let {contextId} = contextIdReducer;
								        contextId = JSON.parse(JSON.stringify(contextId));
								        contextId.reference.verse = i;
								        actions.changeCurrentContextId(contextId);
                        actions.addVerseEdit(originalVerse, modifiedVerse, ['draft'], username);
                        //this.setState({replaceCount:replacecount}); 
                    }	
                    // console.log(this.props.allProps.resourcesReducer.bibles.targetLanguage[chapter])
                }
            }
             


            };

                    
        }else {
            if(this.state.checked) {
                console.log("in if")
            this.props.allProps.loaderReducer.show = true
            let noOfChapters = groupsIndexReducer.groupsIndex.length;
            var searchVal = this.state.find.toUpperCase();
            var replaceVal = this.state.replace;
            for (var i = 1; i <= noOfChapters; i++) {
                var noOfVerses = Object.keys(resourcesReducer.bibles.targetLanguage[i]).length
                for (var j = 1; j <= noOfVerses; j++) {
                    var targetContent = resourcesReducer.bibles.targetLanguage[i];
                    var originalVerse = targetContent[j]
                   if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                        var modifiedVerse = originalVerse.replace(new RegExp(this.escapeRegExp(searchVal), 'g'), replaceVal);
                        replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;
                        targetContent[j] = modifiedVerse 
                        if (originalVerse !== modifiedVerse) {
                            actions.addVerseEdit(originalVerse, modifiedVerse, ['draft'], username);
                            this.setState({replaceCount:replacecount});
                        }                                                     
                    }
                }
            }

            }
            else{
            console.log("in else")
            this.props.allProps.loaderReducer.show = true
            let noOfChapters = groupsIndexReducer.groupsIndex.length;
            var searchVal = this.state.find.toLowerCase();
            var replaceVal = this.state.replace;
            for (var i = 1; i <= noOfChapters; i++) {
                var noOfVerses = Object.keys(resourcesReducer.bibles.targetLanguage[i]).length
                for (var j = 1; j <= noOfVerses; j++) {
                    var targetContent = resourcesReducer.bibles.targetLanguage[i]
                    var originalVerse = targetContent[j]
                   if (originalVerse.search(new RegExp(this.escapeRegExp(searchVal), 'g')) >= 0) {
                        var modifiedVerse = originalVerse.replace(new RegExp(this.escapeRegExp(searchVal), 'g'), replaceVal);
                        replacecount += originalVerse.match(new RegExp(this.escapeRegExp(searchVal), 'g')).length;
                        targetContent[j] = modifiedVerse 
                        if (originalVerse !== modifiedVerse) {
                            actions.addVerseEdit(originalVerse, modifiedVerse, ['draft'], username);
                            this.setState({replaceCount:replacecount});
                        }                                                     
                    }
                }
            }
        }
    }
}

    updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

    selectRadioButton(e){
        e.persist();
        setTimeout(() => {
            this.setState({selection: e.target.value}) 
        }, 100)
    }

    closeModal(){
        this.setState({showSearchReplace:"search",replaceCount:0,replace:"",find:""})
        this.props.onHide();
    }

    render() {
        const bookName = this.props.allProps.projectDetailsReducer.bookName
        let { onHide,  show, chapters } = this.props;

        var partial;
        if (this.state.showSearchReplace == 'search') {
        partial = <div> 
                    <FormGroup>
                    <RadioButtonGroup name="SearchAndReplace" style={{display: "flex", marginBottom:"2%"}} defaultSelected={this.state.selection} onChange={this.selectRadioButton.bind(this)}>
                        <RadioButton
                        value="chapter"
                        label="Current Chapter"
                        style={{width: "40%"}}
                        />
                        <RadioButton
                        value="book"
                        label="Current Book"
                        style={{width: "40%"}}
                        />
                        </RadioButtonGroup>
                        <Checkbox
                        label="Select for Capital search"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={{}}
                        />
                    </FormGroup>
                    <div>
                        <label>Find</label><br />
                        <TextField hintText="Find" value={this.state.find} onChange={this.handleFindChange.bind(this)}/> <br />
                        <label>Replace With</label><br />
                        <TextField hintText="Replacement" value={this.state.replace} onChange={this.handleReplaceChange.bind(this)}/> <br />
                        <RaisedButton style={{marginLeft: "474px"}} label="Replace" primary={true} onClick={this.findAndReplaceText.bind(this)} />
                    </div>
                </div>;
        } else if (this.state.showSearchReplace == 'loader') {
            partial = <div key="0"><img src="../tC_apps/Autographa/assets/giphy.gif" style={{marginLeft:"26%"}} /></div>;
        } else if (this.state.showSearchReplace == 'count'){    
            partial =  <div key="1" style={{fontStyle:"italic   "}}>Book Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {bookName}<br/> Replace Count : {this.state.replaceCount} occurrences<br/><br/>
            <RaisedButton style={{marginLeft: "474px"}} label="Close" primary={true} onClick={this.closeModal.bind(this)} /></div>
        }        
        return (
            <Modal show={show} onHide={onHide} >
                <Modal.Header style={{ backgroundColor: "var(--accent-color-dark)" }} closeButton>
                      <Modal.Title id="contained-modal-title-sm"
            style={{ textAlign: "center", color: "var(--reverse-color)" }}>Search and Replace</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {partial}  
                </Modal.Body> 
            </Modal>
        );
    }
}
            

export default SearchAndReplace;
