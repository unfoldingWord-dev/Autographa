/**
 * @description:
 *  This className defines the entire view for Autographa tool
 */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
const DiffMatchPatch = require('diff-match-patch');
 var dmp_diff = new DiffMatchPatch();

// import "*" from "font-awesome/font-awesome";
import ChapterModal from './ChapterModal';
import style from '../css/Style';
import SettingModal from './SettingsModal';
import AboutUsModal from './AboutUsModal'
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import SearchAndReplace from './SearchAndReplace';
var data = require('../FetchData/chunks.json');

class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        hover: false, layoutDesign:1, fontMin: 14, fontMax: 26, currentFontValue: 14, fontStep: 2, fontSize: 14, saveFunction: false, finalTime:"",
        reflists:[{option:"English-ULB", value:"ULB"},{option:"English-UDB",value:"UDB"},{option:"Hindi-ULB",value:"hin_ulb"}],
        defaultRef:"ULB",diffDisable:false,show:false,diffContent:""}//values has been changed, Hindi lang currently not changed,
        this.getDiffText = this.getDiffText.bind(this);
    }

    saveEditVerse() {
        let {loginReducer,  actions, contextIdReducer, resourcesReducer} = this.props;
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
          console.log("saved")
          var timeStamp = this.props.verseEditReducer.modifiedTimestamp;
          var dateStamp = new Date(timeStamp);
          this.setState({finalTime:"Saved "+dateStamp.toLocaleTimeString()})
          console.log(this.state.finalTime)  
          if (isNaN(dateStamp)) {
            this.setState({saveFunction: false})
          } else{
          this.setState({saveFunction: true})
          }
          actions.addVerseEdit(before, verseText, ['draft'], username, this.state.finalTime);
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
     /*   let { reference } = this.props.contextIdReducer.contextId;
        let { targetLanguage, ULB } = this.props.resourcesReducer.bibles;
        let currentChapter = targetLanguage[reference.chapter];
        let verseNumbers = Object.keys(currentChapter);
        for (var i = 1; i <= verseNumbers.length; i++) { 
            let content = document.getElementById('ULB' + '_verse_' + i)
            content.style = "padding-left:10px;padding-right:0px;margin-right:0px"; 
        }*/
        var elementss = document.getElementsByClassName(verseNumber);
        var names = '';
        for(var i=0; i< elementss.length; i++) {
            names += elementss[i];
        }
        console.log(elementss)
        
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
        if (document.getElementsByClassName("fontZoom")[0].style.fontSize == "") {
            document.getElementsByClassName("fontZoom")[0].style.fontSize = "14px";
        }else{
            fontSize = parseInt(document.getElementsByClassName("fontZoom")[0].style.fontSize)
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
        document.getElementsByClassName("fontZoom")[0].style.fontSize = fontSize + "px";
    }
    

    sliderFontChange(event, value){
        document.getElementsByClassName("fontZoom")[0].style.fontSize = value + "px";
    }
 // insertion and deletion count in difference text by passing verse
    getDifferenceCount(verse_diff) {
        var insertions = 0;
        var deletions = 0;
        for (var x = 0; x < verse_diff.length; x++) {
            var op = verse_diff[x][0];
            var data = verse_diff[x][1];
            switch (op) {
                case DiffMatchPatch.DIFF_INSERT:
                    insertions += data.length;
                    break;
                case DiffMatchPatch.DIFF_DELETE:
                    deletions += data.length;
                    break;
                case DiffMatchPatch.DIFF_EQUAL:
                    insertions = 0;
                    deletions = 0;
                    break;
            }
        }
        return { ins: insertions, del: deletions }
    }

    getDiffText(event,logged) {
        console.log(logged);
        if (logged == true) {
            this.setState({diffDisable:true,show:true})   

        } else {
            this.setState({diffDisable:false,show:false})
        }
       
    }

    
    render() {

    function handleRefChange(event) {
        event.persist()
        var defaultRef = event.target.value;
    }

    function handleRefChangeTwo(event) {
        event.persist()
        var defaultRefTwo = event.target.value;
    }

    function handleRefChangeThree(event) {
        event.persist()
        var defaultRefThree = event.target.value;
    }

    //console.log(defaultRef);
    const diffContent =  () => {
        var diffArray = []; 
        var t_ins; 
        var t_del; 
        let { reference } =this.props.contextIdReducer.contextId;
        let { targetLanguage, ULB } = this.props.resourcesReducer.bibles; 
        let verseText = ULB[reference.chapter];
        let translatedText = targetLanguage[reference.chapter]         
        var size = Object.keys(this.props.resourcesReducer.bibles.targetLanguage[reference.chapter]).length
        //console.log(ref1)
        var refString = "";
        for (var i = 1; i <= size; i++) {
            var ref1 = verseText[i];
            var ref2 = translatedText[i]
            var d = dmp_diff.diff_main(ref1, ref2);
            var diff_count = this.getDifferenceCount(d);
            t_ins += diff_count["ins"];
            t_del += diff_count["del"];
            //console.log(t_del+t_ins)
            var ds = dmp_diff.diff_prettyHtml(d);
            //console.log(refString)
            //refString += '<div data-verse="r' + (i) + '"><span class="verse-num">' + (i) + '</span><span>' + ds + '</span></div>';
            //var diffContent = document.createElement('div');
            //diffcontent.innerHTML = refString; 
            diffArray.push(ds);
        }
        let diffContent = diffArray.map((text, index) => {
        return (
            <div key={index+1}>
            <span> {index+1}</span>
            <span dangerouslySetInnerHTML={{__html: text}} ></span>
            </div>
            )        
        })
        
        return diffContent
    }
    const dropdownOne = this.state.reflists.map(function(refDoc, index){
        return(
            <option value={refDoc.value}  key={index} >{refDoc.option}</option>
        )
    })            

    const linkStyle = this.state.hover ? style.hover : style.button;

        let { contextIdReducer, projectDetailsReducer, resourcesReducer,  modalVisibility, modalSettingsVisibility,
        modalAboutUsVisibility, showAboutModal, showModal, showSettingsModal, hideModal,modalSearchVisibility,showSearchReplaceModal } = this.props
        let { reference } = contextIdReducer.contextId;
        let { targetLanguage, ULB } = resourcesReducer.bibles;
        let currentChapter = targetLanguage[reference.chapter];
        let chapters = this.props.groupsDataReducer.groupsData;
        let verseNumbers = Object.keys(currentChapter);
        //console.log(verseNumbers)
            var i;
            var chunkIndex = 0;
            var chunkVerseStart; 
            var chunkVerseEnd;
            var chunkGroup = [];
            for (i = 0; i < data.chunks.length; i++) {
                chunkVerseStart = data.chunks[0][i]["firstvs"];
                chunkVerseEnd = data.chunks[0][i + 1]["firstvs"] - 1;
            }
            for (var i = 1; i <= verseNumbers.length; i++) {
                if (i > chunkVerseEnd){
                    chunkVerseStart = data.chunks[0][chunkIndex]["firstvs"];
                    if (chunkIndex === verseNumbers.length - 1 ) {
                        chunkVerseEnd = verseNumbers.length;      
                    } else {
                        chunkIndex++;
                        chunkVerseEnd = data.chunks[0][chunkIndex]["firstvs"];
                    }
                }  
                 var chunk = chunkVerseStart + '-' + chunkVerseEnd;
                 chunkGroup.push(chunk)
            }
            const verses = (bibleId, bible) => {
            let verseNumbers = Object.keys(currentChapter);
            let verses = chunkGroup.map( (verseNumber, index) => {
            let editable = bibleId === 'target';
            let verseText = bible[reference.chapter][index+1];
                return (
                    <div className="fontZoom" style={{display: "flex", lineHeight: "25px"}} key={index} >
                        <span style={style.versenum}>{index+1} </span>
                        <span onClick={this.highlightRef.bind(this, verseNumber)}
                        style={{paddingLeft: "10px"}}
                        className={verseNumber}
                        contentEditable={editable}
                        onBlur={this.saveEditVerse.bind(this)}
                        onFocus={this.changeCurrentVerse.bind(this, index+1)}
                        suppressContentEditableWarning={true}
                        >{verseText}</span>
                    </div>
                )
            })

            return verses
        }
              
              /*if (i <=chunkVerseEnd) {

                chunkVerseStart = data.chunks[0][chunkIndex]["firstvs"];
                chunkVerseEnd = data.chunks[0][chunkIndex + 1]["firstvs"];
                console.log(chunkVerseStart +"   and " + chunkVerseEnd)
                chunkGroup.push(chunkVerseStart +"-" + chunkVerseEnd)
                //chunkGroup.push(chunkVerseStart +"-" + chunkVerseEnd)
              } else{
                chunkVerseStart = data.chunks[0][chunkIndex]["firstvs"];
                chunkVerseEnd = data.chunks[0][chunkIndex + 1]["firstvs"];
                chunkIndex++;
                 console.log(chunkVerseStart +"   and " + chunkVerseEnd)  
              };
             
            console.log(chunkGroup)*/

        return (
          <div style={{overflow: "scroll", position: "relative"}}>  
              <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation" style={{backgroundColor: "#0b82ff", position: "relative", marginBottom: "0"}}>
                <div className="container-fluid" style={{backgroundColor: "#0b82ff"}}>
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <a className="navbar-brand" href="javascript:;"><img alt="Brand" src="../translationCore/tC_apps/Autographa/assets/logo.png" /></a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar" style={{backgroundColor: "#0b82ff"}}>
                        <ul className="nav navbar-nav"  style={{padding: "3px 0 0 0px"}}>
                            <li>
                              <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"150px"}}>
                                <ChapterModal  show ={ modalVisibility } onHide = { hideModal } chapters = { chapters } allProps = {this.props}/>
                                <SettingModal show ={ modalSettingsVisibility } onHide = { hideModal } />
                                <AboutUsModal show ={ modalAboutUsVisibility } onHide = { hideModal } allProps = {this.props}/>
                                <SearchAndReplace show ={ modalSearchVisibility } onHide = { hideModal } allProps = {this.props} versetext={verses('target', targetLanguage)}/>
                                <span>
                                <Button className="btn btn-default" style={style.chapter} onClick = {showModal} id="chapterBtn" title="Select Chapter" disabled={this.state.diffDisable}>Chapter</Button>
                                </span>
                              </div>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                          <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>OFF</span></li>
                          <li>
                              <Toggle onToggle={this.getDiffText} defaultToggled={false} style={style.toggle} thumbStyle={style.thumbOff} trackStyle={style.trackOff} thumbSwitchedStyle={style.thumbSwitched} trackSwitchedStyle={style.trackSwitched} labelStyle={style.labelStyle} />                            
                          </li>
                           <li style={{padding:"17px 0 0 0", color: "#fff", fontWeight: "bold"}}><span>ON</span></li>
                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} title="Find and replace" id="searchText" onClick = {showSearchReplaceModal} disabled={this.state.diffDisable}><Glyphicon glyph="search" />
                            </Button>
                          
                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} disabled={this.state.diffDisable}><Glyphicon glyph="cloud-download" />
                            </Button>
                          
                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick = {showAboutModal} disabled={this.state.diffDisable}><Glyphicon glyph="info-sign" />
                            </Button>
                          
                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick = {showSettingsModal} disabled={this.state.diffDisable}><Glyphicon glyph="wrench" />
                            </Button> 
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="fontZoom" style={{width:"100%", marginBottom:"20px"}}>
                   {this.state.layoutDesign == 1 &&
                   <div>
                   <Col key={1}  lg={6} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                     <h2>English ULB</h2>
                     <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                      <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChange} value ={this.state.defaultRef}>
                          {dropdownOne}
                      </select>
                     <div>
                     {verses(this.state.defaultRef, ULB)}
                     </div>
                     </Col>
                     <Col lg={6}>
                      <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                      <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                      {this.state.show ? <div id="targetContent">{diffContent()}</div>:
                      <div id ="targetContent">{verses('target', targetLanguage)}</div>}
                    </Col> 
                    </div>}

                  {this.state.layoutDesign == 2 &&
                  <div>
                    <Col key={2} lg={4} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                       <h2>English ULB</h2>
                       <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                        <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChange} value ={this.state.defaultRef}>
                            {dropdownOne}
                        </select>
                       <div>
                       {verses(this.state.defaultRef, ULB)}
                       </div>
                    </Col> 
                    <Col key={3} lg={4} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                       <h2>English ULB</h2>
                       <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                        <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChangeTwo} value ={this.state.defaultRefTwo}>
                            {dropdownOne}
                        </select>
                       <div>
                       {verses(this.state.defaultRef, ULB)}
                       </div>
                    </Col>
                    <Col lg={4}>
                      <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                      <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                         {this.state.show ?<div id="targetContent">{diffContent()}</div>:
                      <div id ="targetContent"> {verses('target', targetLanguage)}</div>}
                      </Col>
                  </div> }
                         {this.state.layoutDesign == 3 &&
                    <div>
                        <Col key={4} lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                           <h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                            <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChange} value ={this.state.defaultRef}>
                                {dropdownOne}
                            </select>
                           <div >
                           {verses(this.state.defaultRef, ULB)}
                           </div>
                         </Col>
                         <Col key={5}  lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                           <h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                            <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChangeTwo} value ={this.state.defaultRefTwo}>
                                {dropdownOne}
                            </select>
                           <div >
                           {verses(this.state.defaultRef, ULB)}
                           </div>
                         </Col>
                         <Col key={6}  lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                             <h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                            <select style={style.dropdown} title="Select Reference Text" onChange={handleRefChangeThree} value ={this.state.defaultRefThree}>
                                {dropdownOne}
                            </select>
                           <div >
                           {verses(this.state.defaultRef, ULB)}
                           </div>
                         </Col>
                         <Col lg={3}>
                          <h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>
                           {this.state.show ? <div id="targetContent">{diffContent()}</div>:
                            <div id ="targetContent"> {verses('target', targetLanguage)}</div>}
                         </Col>
                    </div> }
                </div> 
            <nav className="navbar navbar-default navbar-fixed-bottom" style={{left:"250px", height:"55px"}}>
                       {/*<div className="nav navbar-nav navbar-center verse-diff-on"> */}
                            <div style={{float:"left", width:"40%"}} className="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                                <div style={{float: "left"}}>
                                    <Button style={style.fontButtonMinus} className="btn btn-default font-button minus" disabled={this.state.diffDisable} title="Decrease font size" onClick= {this.fontChange.bind(this, (-2))}>A-</Button>
                                </div>
                                {/*<ReactBootstrapSlider style={style.sliderHorizontal} change={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin} orientation="horizontal" />*/}
                                <Slider sliderStyle={{ width: "100px", float:"left", marginTop:"11px"}}  onChange={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin}/>
                                {/*<input type="range" onInput={this.sliderFontChange.bind(this)}  onChange={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin} />*/}
                                <div style={{float: "left"}}>
                                    <Button style={style.fontButtonPlus} disabled={this.state.diffDisable} className="btn btn-default font-button plus" title="Increase font size" onClick= {this.fontChange.bind(this, (+2))}>A+</Button>
                                </div>
                            </div>
                            <div style={{ float:"left", width:"60%"}} className="nav navbar-nav navbar-center verse-diff-on" >
                                <div className="btn-group navbar-btn layout" role="group" aria-label="...">
                                        <Button style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,1)}  disabled={this.state.diffDisable} title="2-column layout">2x &nbsp;<i className="fa fa-columns fa-lg"></i></Button>
                                        <Button style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,2)} disabled={this.state.diffDisable} title="3-column layout">3x &nbsp;<i className="fa fa-columns fa-lg"></i></Button>
                                        <Button style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,3)}  disabled={this.state.diffDisable} title="4-column layout">4x &nbsp;<i className="fa fa-columns fa-lg"></i></Button>
                                </div>
                                <span style={{ color: "rgba(0, 0, 0, 0.5)", marginLeft: "188px",fontFamily: "Georgia,Serif", fontStyle:"italic"}}>{this.state.saveFunction ? this.state.finalTime:""}</span>
                            </div>
                      {/*</div>*/}
                </nav>
          </div>
       
        );
    }
}

module.exports = View;