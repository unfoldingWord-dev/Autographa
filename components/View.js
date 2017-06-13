/**
 * @description:
 *  This className defines the entire view for Autographa tool
 */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
// import "*" from "font-awesome/font-awesome";
import ChapterModal from './ChapterModal';
import style from '../css/Style';
import SettingModal from './SettingsModal';
import Toggle from 'material-ui/Toggle';



class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hover: false}
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
    highlightRef(verseNumber, e){ 
        for (var i = 1; i < 10; i++) { //Currentl 10 is hard-coded to be changed when we have verse numbers
            let content = document.getElementById('ULB' + '_verse_' + i)
            content.style = "padding-left:10px;padding-right:0px;margin-right:0px"; 
        }
        console.log(verseNumber)      
        let verseText = document.getElementById('ULB' + '_verse_' + verseNumber);
        verseText.style = "background-color: rgba(11, 130, 255, 0.1);padding-left:10px;padding-right:10px;margin-right:10px; border-radius: 6px";  
    }

    mouseEnter(){
    this.setState({hover: true});
  }

  mouseLeave(){
    this.setState({hover: false});
  }
 
 
  render() {
    const linkStyle = this.state.hover ? style.hover : style.button;
    // const iconImage = this.state.hover ? this.props.hoverImage : this.props.imageName;
    // let icon; 
    // if(iconImage){
    //     icon = <img src={iconImage} style={style.img}/>;
    //     }
    let { contextIdReducer, projectDetailsReducer, resourcesReducer,  modalVisibility, modalSettingsVisibility,
      showModal, showSettingsModal, hideModal } = this.props
    let { reference } = contextIdReducer.contextId;
    let { targetLanguage, ULB } = resourcesReducer.bibles;
    let currentChapter = targetLanguage[reference.chapter];
    let chapters = this.props.groupsDataReducer.groupsData;
    console.log(this.props.groupsDataReducer.groupsData)
    console.log(this.props)
    //console.log(this.props.groupsDataReducer.groupsData);
    const verses = (bibleId, bible) => {
      let verseNumbers = Object.keys(currentChapter);
      let verses = verseNumbers.map( (verseNumber, index) => {
        let editable = bibleId === 'target';
        let verseText = bible[reference.chapter][verseNumber];
        return (

          <div style={{display: "flex"}} key={index}>

            <span style={style.versenum}>{verseNumber} </span>
            <span onClick={this.highlightRef.bind(this, verseNumber)}
            style={{paddingLeft: "10px"}}
            id={bibleId + '_verse_' + verseNumber}
            contentEditable={editable}
            onBlur={this.saveEditVerse.bind(this)}
            onFocus={this.changeCurrentVerse.bind(this, verseNumber)}
            suppressContentEditableWarning={true}
            >{verseText}
            </span>
          </div>
        )
      })
      return verses
    }
    
    return (
      
      <div id="test" style={{overflow: "scroll", position: "relative"}}>
          <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation" style={{backgroundColor: "#0b82ff", position: "relative", marginBottom: "0"}}>
            <div className="container-fluid" style={{backgroundColor: "#0b82ff"}}>
                <div className="navbar-header">
                    <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    <a className="navbar-brand"><img alt="Brand" src="../translationCore/tC_apps/Autographa/assets/logo.png" /></a>
                </div>
                <div className="navbar-collapse collapse" id="navbar" style={{backgroundColor: "#0b82ff"}}>
                    <ul className="nav navbar-nav"  style={{padding: "3px 0 0 0px"}}>
                        <li>
                          <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"150px"}}>
                            <a className="btn btn-default" style={style.book} data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">
                            Book</a>
                            <ChapterModal show ={ modalVisibility } onHide = { hideModal } chapters = { chapters } allProps = {this.props}/>
                            <SettingModal show ={ modalSettingsVisibility } onHide = { hideModal } />
                            <span>
                            <a className="btn btn-default" style={style.chapter} onClick = {showModal} id="chapterBtn" data-target="#myModal"  data-toggle="modal" data-placement="bottom"  title="Select Chapter" >Chapter</a>
                            </span>
                          </div>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                            <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>OFF</span></li>
                            <li>
                                {/*<label style={{marginTop:"17px"}} className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
                                    <input type="checkbox" id="switch-2" className="mdl-switch__input check-diff"/>
                                    <span className="mdl-switch__label"></span>
                                </label>*/}
                                <Toggle style={style.toggle} thumbStyle={style.thumbOff} trackStyle={style.trackOff} thumbSwitchedStyle={style.thumbSwitched} trackSwitchedStyle={style.trackSwitched} labelStyle={style.labelStyle} />                            
                            </li>
                             <li style={{padding:"17px 0 0 0", color: "#fff", fontWeight: "bold"}}><span>ON</span></li>
                              
                              <li style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} data-toggle="tooltip" data-placement="bottom" title="Find and replace" id="searchText"><Glyphicon glyph="search" />
                              </li>
                            
                              <li style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} ><Glyphicon glyph="cloud-download" />
                              </li>
                            
                              <li style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} ><Glyphicon glyph="info-sign" />
                              </li>
                            
                              <li style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick = {showSettingsModal}><Glyphicon glyph="wrench" />
                              </li>
                            
                    </ul>
                </div>
            </div>
        </nav>
        <Col sm={6} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
          <span><a href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="chapters"><i className="fa fa-cog fa-2x"></i></a></span>
          <h2>English ULB</h2>
          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
          <div >
          {verses('ULB', ULB)}
          </div>
        </Col>
        <Col sm={6} >
          <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
          {verses('target', targetLanguage)}
        </Col>
      </div>
   
    );
  }
}

module.exports = View;
