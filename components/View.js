/**
 * @description:
 *  This class defines the entire view for Autographa tool
 */
import React from 'react'
import { Row, Col } from 'react-bootstrap'

class View extends React.Component {

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
    let { contextIdReducer, projectDetailsReducer, resourcesReducer } = this.props
    let { reference } = contextIdReducer.contextId;
    let { targetLanguage, ULB } = resourcesReducer.bibles;
    let currentChapter = targetLanguage[reference.chapter];
    console.log(this.props);

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
        <Col sm={6}>
          <h2>English ULB1</h2>
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
