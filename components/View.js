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
import ReactBootstrapSlider from 'react-bootstrap-slider';



class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hover: false, 
                  layoutDesign:1, 
                  fontMin: 14, 
                  fontMax: 26, 
                  currentFontValue: 10, 
                  fontStep: 2,
                  fontSize: 14
          }
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
    let { reference } = this.props.contextIdReducer.contextId;
    let { targetLanguage, ULB } = this.props.resourcesReducer.bibles;
    let currentChapter = targetLanguage[reference.chapter];
    let verseNumbers = Object.keys(currentChapter);
      for (var i = 1; i <= verseNumbers.length; i++) { 
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

   handleChange(key) {
        this.setState({layoutDesign: key});
    }



    fontChange(multiplier) {
        let fontSize = this.state.fontMin;
        if (document.getElementsByClassName("test")[0].style.fontSize == "") {
            document.getElementsByClassName("test")[0].style.fontSize = "14px";
        }else{
            fontSize = parseInt(document.getElementsByClassName("test")[0].style.fontSize)
        }
        if(multiplier < 0){
            if((multiplier+fontSize) <= this.state.fontMin ){
                fontSize = this.state.fontMin
            }else{
                fontSize = multiplier + fontSize
            }
        }else{
            if((multiplier+fontSize) >= this.state.fontMax ){
                fontSize = this.state.fontMax
            }else{
                fontSize = multiplier + fontSize
            }
        }
         this.setState({currentFontValue: fontSize})
        document.getElementsByClassName("test")[0].style.fontSize = fontSize + "px";
    }
    sliderFontChange(obj){
        document.getElementsByClassName("test")[0].style.fontSize = obj.target.value + "px";
    }
 
 
  render() {
    const linkStyle = this.state.hover ? style.hover : style.button;
    let { contextIdReducer, projectDetailsReducer, resourcesReducer,  modalVisibility, modalSettingsVisibility,
    showModal, showSettingsModal, hideModal } = this.props
    let { reference } = contextIdReducer.contextId;
    let { targetLanguage, ULB } = resourcesReducer.bibles;
    let currentChapter = targetLanguage[reference.chapter];
    let chapters = this.props.groupsDataReducer.groupsData;

    const verses = (bibleId, bible) => {
      let verseNumbers = Object.keys(currentChapter);
      let verses = verseNumbers.map( (verseNumber, index) => {
        let editable = bibleId === 'target';
        let verseText = bible[reference.chapter][verseNumber];
        return (


          <div style={{display: "flex", lineHeight: "25px"}} key={index}>
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

    const layout = (i) => {
      if(this.state.layoutDesign == 2) {
        console.log(this.state.layoutDesign == 2)
        var j = 4 
     
      }
      else if (this.state.layoutDesign == 3) {
        console.log(this.state.layoutDesign == 3)
        var j = 3
       
      }
      else {
      console.log(this.state.layoutDesign == 1)

      var j =  6
      }
    
         return (
             <Col key={i} lg={j}style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
              <h2>English ULB</h2>
              <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
              <div>
              {verses('ULB', ULB)}
              </div>
            </Col> )
       } 

        var rows = [];
        for (var i = 1; i <= this.state.layoutDesign; i++) {
            rows.push(layout(i));
        }


    return (  
      <div style={{overflow: "scroll", position: "relative"}}>
          <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation" style={{backgroundColor: "#0b82ff", position: "relative", marginBottom: "0"}}>
            <div className="container-fluid" style={{backgroundColor: "#0b82ff"}}>
                <div className="navbar-header">
                    <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    <a className="navbar-brand" href="javascript:;"><img alt="Brand" src="../translationCore/tC_apps/Autographa/logos/logo.png" /></a>
                </div>
                <div className="navbar-collapse collapse" id="navbar" style={{backgroundColor: "#0b82ff"}}>
                    <ul className="nav navbar-nav"  style={{padding: "3px 0 0 0px"}}>
                        <li>
                          <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"150px"}}>
                            <a className="btn btn-default" style={style.book} data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">
                            Book</a>
                            <ChapterModal  show ={ modalVisibility } onHide = { hideModal } chapters = { chapters } allProps = {this.props}/>
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
                                <Toggle style={style.toggle} thumbStyle={style.thumbOff} trackStyle={style.trackOff} thumbSwitchedStyle={style.thumbSwitched} trackSwitchedStyle={style.trackSwitched} labelStyle={style.labelStyle} />                            
                            </li>
                             <li style={{padding:"17px 0 0 0", color: "#fff", fontWeight: "bold"}}><span>ON</span></li>
                             <li></li>
                              
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
      <div className="test">
        {rows}
        { this.state.layoutDesign == 1 &&
          <Col className="test" lg={6}>
            <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
            <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
            {verses('target', targetLanguage)}
          </Col>}
                      { this.state.layoutDesign == 2 &&
          <Col lg={4}>
            <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
            <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
            {verses('target', targetLanguage)}
          </Col>}
                      { this.state.layoutDesign == 3 &&
          <Col lg={3}>
            <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
            <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
            {verses('target', targetLanguage)}
          </Col>}
        </div>
            <nav className="navbar navbar-default navbar-fixed-bottom" style={{left:"250px"}}>
             <div className="nav navbar-nav navbar-center verse-diff-on"> 

                        <div style={{float:"left"}} className="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                            <span>
                                <a style={style.fontButtonMinus} className="btn btn-default font-button minus" data-toggle="tooltip" data-placement="top" title="Decrease font size" onClick= {this.fontChange.bind(this, (-2))}>A-</a>
                            </span>
                            <ReactBootstrapSlider className={style.sliderHorizontal} change={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin}  />
                            <span>
                                <a style={style.fontButtonPlus} className="btn btn-default font-button plus" data-toggle="tooltip" data-placement="top" title="Increase font size" onClick= {this.fontChange.bind(this, (+2))}>A+</a>
                            </span>
                        </div>

                    <div className="nav navbar-nav navbar-center verse-diff-on" style={{marginLeft: "150px"}}>
                        <div className="btn-group navbar-btn layout" role="group" aria-label="...">
                                <a style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,1)}  title="2-column layout">2x &nbsp;<i className="fa fa-columns fa-lg"></i></a>
                                <a style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,2)} title="3-column layout">3x &nbsp;<i className="fa fa-columns fa-lg"></i></a>
                                <a style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,3)}  title="4-column layout">4x &nbsp;<i className="fa fa-columns fa-lg"></i></a>
                        </div>
                    </div>
          </div>
        </nav>
      </div>
   
    );
  }
}

module.exports = View;
