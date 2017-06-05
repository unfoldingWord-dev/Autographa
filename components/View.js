/**
 * @description:
 *  This class defines the entire view for Autographa tool
 */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/lib/Button';
import ChapterModal from './ChapterModal';


class View extends React.Component {

  constructor(props) {
    super(props);
  }

  saveEditVerse() {
    let {loginReducer, actions, contextIdReducer, resourcesReducer} = this.props;
    let {chapter, verse} = contextIdReducer.contextId.reference;
    let before = resourcesReducer.bibles.targetLanguage[chapter][verse];
    let verseText = document.getElementById('target' + '_verse_' + verse).innerText;
    let username = loginReducer.userdata.username;
    // verseText state is undefined if no changes are made in the text box.
    if (!loginReducer.loggedInUser) {
      that.props.actions.selectModalTab(1, 1, true);
      that.props.actions.openAlertDialog("You must be logged in to edit a verse");
      return;
    }
    if (before !== verseText) {
      actions.addVerseEdit(before, verseText, ['draft'], username);
    }
  }

  changeCurrentVerse(verseNumber, e) {
    let {actions, contextIdReducer} = this.props;
    let {contextId} = contextIdReducer;
    contextId = JSON.parse(JSON.stringify(contextId));
    contextId.reference.verse = verseNumber;
    actions.changeCurrentContextId(contextId);
  }

 
 
  render() {
    let { contextIdReducer, projectDetailsReducer, resourcesReducer,  modalVisibility,
      showModal, hideModal } = this.props
    let { reference } = contextIdReducer.contextId;
    let { targetLanguage, ULB } = resourcesReducer.bibles;
    let currentChapter = targetLanguage[reference.chapter];
    let chapters = this.props.groupsDataReducer.groupsData;
    console.log(this.props.groupsDataReducer.groupsData)
    console.log(this.props)

    // console.log(this.props.groupsDataReducer.groupsData);

    const verses = (bibleId, bible) => {
      let verseNumbers = Object.keys(currentChapter);
      let verses = verseNumbers.map( (verseNumber, index) => {
        let editable = bibleId === 'target';
        let verseText = bible[reference.chapter][verseNumber];
        return (
          <div key={index}>
            <span>{verseNumber} </span>
            <span
            id={bibleId + '_verse_' + verseNumber}
            contentEditable={editable}
            onBlur={this.saveEditVerse.bind(this)}
            onFocus={this.changeCurrentVerse.bind(this, verseNumber)}
            >{verseText}
            </span>
          </div>
        )
      })
      return verses
    }
    


    return (
      <div>
        <ChapterModal  show ={ modalVisibility } onHide = { hideModal } chapters = { chapters } allProps = {this.props}/>
        <span><Button onClick = {showModal} >Chapter</Button></span>
        <Col sm={6}>
          <span><a href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="chapters"><i className="fa fa-cog fa-2x"></i></a></span>
          <h2>English ULB</h2>
          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
          {verses('ULB', ULB)}
        </Col>
        <Col sm={6}>
          <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
          {verses('target', targetLanguage)}
        </Col>
      </div>
    );
  }
}


module.exports = View;
