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
        reflists:[{option:"English-ULB", value:"ulb"},{option:"English-UDB",value:"udb"}],
        defaultRef:"ulb",defaultRefTwo:"ulb",defaultRefThree:"ulb",diffDisable:false,show:false,diffContent:"", layoutArray: [1] }//values has been changed, Hindi lang currently not changed,
        this.getDiffText = this.getDiffText.bind(this);
    }
    saveEditVerse() {
        let {loginReducer,  actions, contextIdReducer, resourcesReducer} = this.props;
        let {chapter, verse} = contextIdReducer.contextId.reference;
        let before = resourcesReducer.bibles.targetLanguage[chapter][verse];
        let verseText = document.getElementById('targetLanguage' + '_verse_' + verse).innerText;
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
    		let refContent = document.getElementsByClassName('refContent')[0];
        let { reference } = this.props.contextIdReducer.contextId;
        let { targetLanguage, ulb } = this.props.resourcesReducer.bibles;
        let currentChapter = targetLanguage[reference.chapter];
        var verse_Num = document.getElementsByClassName(verseNumber);
        var x = document.getElementsByClassName("highlight_remove");
        var i;
        refContent.querySelectorAll('div[data-verse^="r"]').style="background-color:'';padding-left:10px;padding-right:10px;display: inline-block;";
        for (i = 0; i < refContent.children.length; i++) {
        	let refDiv = refContent.querySelectorAll('div[data-verse^='+'"'+"r"+(i+1)+'"'+']');
                // console.log(refDiv)
                if (refDiv != 'undefined'){
                    refDiv[0].style="background-color:none;font-weight:none;padding-left:10px;padding-right:10px;";
                }
        }
        var limits = verseNumber.split("-").map(function(element) {
                    return parseInt(element, 10) - 1;
        });
        for(var j=limits[0]; j<=limits[1];j++){
        	if(refContent.querySelectorAll("div[data-verse=r"+(j+1)+"]")[0] != undefined){
            refContent.querySelectorAll("div[data-verse=r"+(j+1)+"]")[0].style = "background-color: rgba(11, 130, 255, 0.1);padding-left:10px;padding-right:10px;margin-right:10px;";
        	}
        }
        refContent.querySelectorAll('div[data-verse="r' + (limits[0] + 1) + '"]')[0].style.borderRadius = "10px 10px 0px 0px";
        if(limits[1] < refContent.children.length) {
        	refContent.querySelectorAll('div[data-verse="r' + (limits[1] + 1) + '"]')[0].style.borderRadius = "0px 0px 10px 10px";
        }else{
        	refContent.querySelectorAll('div[data-verse="r' + (limits[1]) + '"]')[0].style.borderRadius = "0px 0px 10px 10px";
        }

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
        console.log(document.getElementsByClassName("fontZoom")[0])
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
        if (logged == true) {
            this.setState({diffDisable:true,show:true})

        } else {
            this.setState({diffDisable:false,show:false})
        }
    }

    handleRefChange(event) {
        var defaultRef = event.target.value;
        this.setState({defaultRef:defaultRef})
    }

    handleRefChangeTwo(event) {
        var defaultRefTwo = event.target.value;
        this.setState({defaultRefTwo:defaultRefTwo})
    }

    handleRefChangeThree(event) {
        var defaultRefThree = event.target.value;
        this.setState({defaultRefThree:defaultRefThree})
    }

    render() {
        const dropdownOne = this.state.reflists.map(function(refDoc, index){
            return(
                <option value={refDoc.value}  key={index} >{refDoc.option}</option>
            )
        })


        const linkStyle = this.state.hover ? style.hover : style.button;

        let { contextIdReducer, projectDetailsReducer, resourcesReducer,  modalVisibility, modalSettingsVisibility,
        modalAboutUsVisibility, showAboutModal, showModal, showSettingsModal, hideModal,modalSearchVisibility,showSearchReplaceModal } = this.props
        let { reference } = contextIdReducer.contextId;
        let { targetLanguage, ulb, udb } = resourcesReducer.bibles;
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
              // console.log(bibleId+bible)
              let verseNumbers = Object.keys(currentChapter);
              let verses = chunkGroup.map( (verseNumber, index) => {
              let editable = bibleId === 'targetLanguage';
              if (!bible) debugger
              let verseText = bible[reference.chapter][index+1];
                return (
                    <div style={{display: "flex"}} key={index} data-verse={"r"+(index+1)} onClick={this.highlightRef.bind(this, verseNumber)}>
                        <div className="highlight_remove" style={{padding:"5px 0"}} >
                        <span className="verseNum" style={style.versenum}>{index+1} </span>
                        <span
                        style={{paddingLeft: "5px"}}
                        className={verseNumber}
                        id={bibleId + '_verse_' + (index+1)}
                        contentEditable={editable}
                        onBlur={this.saveEditVerse.bind(this)}
                        onFocus={this.changeCurrentVerse.bind(this, index+1)}
                        suppressContentEditableWarning={true}
                        >{verseText}</span>
                        </div>
                    </div>
                )
            })
                return verses
            }

            //console.log(defaultRef);
            const diffContent =  (lang) => {
            		var diffArray = [];
                var t_ins = 0;
                var t_del = 0;
                let { reference } = this.props.contextIdReducer.contextId;
                let { targetLanguage } = this.props.resourcesReducer.bibles;
								if (this.state.layoutDesign == 2 && lang != "target"){
								var verseText1 = this.props.resourcesReducer.bibles[this.state.defaultRef]
								var verseText2 = this.props.resourcesReducer.bibles[this.state.defaultRefTwo]
								var refString = "";
                for (var i = 1; i <= Object.keys(verseText1[reference.chapter]).length; i++) {
                    var ref1 = verseText1[reference.chapter][i];
                    var ref2 = verseText2[reference.chapter][i];
                    var d = dmp_diff.diff_main(ref1, ref2);
                    var diff_count = this.getDifferenceCount(d);
                    t_ins += diff_count["ins"];
                    t_del += diff_count["del"];
                    var ds = dmp_diff.diff_prettyHtml(d);
                    diffArray.push(ds);
                }

							 }else if(this.state.layoutDesign == 3 && lang != "target"){

							 	var verseText1 = "";
							 	var verseText2 = "";
							 	if(lang == "1"){
							 		verseText1 = this.props.resourcesReducer.bibles[this.state.defaultRef]
									verseText2 = this.props.resourcesReducer.bibles[this.state.defaultRefTwo]
									console.log(verseText1)

							 	}
							 	if(lang == "2"){
							 		verseText1 = this.props.resourcesReducer.bibles[this.state.defaultRefTwo]
									verseText2 = this.props.resourcesReducer.bibles[this.state.defaultRefThree]

							 	}
                 var size = Object.keys(this.props.resourcesReducer.bibles.targetLanguage[reference.chapter]).length
                 var refString = "";
                 console.log(verseText1)
                 console.log(verseText2)
                 for (var i = 1; i <= size; i++) {
                     var ref1 = verseText1[reference.chapter][i];
                     var ref2 = verseText2[reference.chapter][i]
                     var d = dmp_diff.diff_main(ref1, ref2);
                     var diff_count = this.getDifferenceCount(d);
                     t_ins += diff_count["ins"];
                     t_del += diff_count["del"];
                     var ds = dmp_diff.diff_prettyHtml(d);

                     diffArray.push(ds);
                 }
							 }
							 else if(this.state.layoutDesign == 2 && lang == "target"){

								 var verseText = this.props.resourcesReducer.bibles[this.state.defaultRefTwo]

                 let translatedText = targetLanguage[reference.chapter]
                 
                 var size = Object.keys(this.props.resourcesReducer.bibles.targetLanguage[reference.chapter]).length
                 var refString = "";
                 for (var i = 1; i <= size; i++) {
                     var ref1 = verseText[reference.chapter][i];
                     var ref2 = translatedText[i]
                     var d = dmp_diff.diff_main(ref1, ref2);
                     var diff_count = this.getDifferenceCount(d);
                     t_ins += diff_count["ins"];
                     t_del += diff_count["del"];
                     var ds = dmp_diff.diff_prettyHtml(d);

                     diffArray.push(ds);
                 }
							 }else if(this.state.layoutDesign == 3 && lang == "target"){

								 var verseText = this.props.resourcesReducer.bibles[this.state.defaultRefThree]

                 let translatedText = targetLanguage[reference.chapter]
                 
                 var size = Object.keys(this.props.resourcesReducer.bibles.targetLanguage[reference.chapter]).length
                 var refString = "";
                 for (var i = 1; i <= size; i++) {
                     var ref1 = verseText[reference.chapter][i];
                     var ref2 = translatedText[i]
                     var d = dmp_diff.diff_main(ref1, ref2);
                     var diff_count = this.getDifferenceCount(d);
                     t_ins += diff_count["ins"];
                     t_del += diff_count["del"];
                     var ds = dmp_diff.diff_prettyHtml(d);

                     diffArray.push(ds);
                 }
							 }

							 else{

							 	var verseText = this.props.resourcesReducer.bibles[this.state.defaultRef]

                 let translatedText = targetLanguage[reference.chapter]
                 
                 var size = Object.keys(this.props.resourcesReducer.bibles.targetLanguage[reference.chapter]).length
                 var refString = "";
                 for (var i = 1; i <= size; i++) {
                     var ref1 = verseText[reference.chapter][i];
                     var ref2 = translatedText[i]
                     var d = dmp_diff.diff_main(ref1, ref2);
                     var diff_count = this.getDifferenceCount(d);
                     t_ins += diff_count["ins"];
                     t_del += diff_count["del"];
                     var ds = dmp_diff.diff_prettyHtml(d);

                     diffArray.push(ds);
                 }
							 }

                let diffContent = diffArray.map((text, index) => {
                return (
                    <div style={{paddingTop: "7px"}} key={index+1}>
                    	<span className="verseNum" style={style.diffVerseNum}> {index+1}</span>
                    	<span dangerouslySetInnerHTML={{__html: text}} ></span>
                    </div>
                    )
                })

               return [diffContent, t_ins, t_del]
            }

            return (
            <div style={{overflow: "scroll", position: "relative"}}>
              <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation" style={{backgroundColor: "#0b82ff", position: "relative", marginBottom: "0"}}>
                <div className="container-fluid" style={{backgroundColor: "#0b82ff",fontFamily: "Helvetica"}}>
                    <div className="navbar-collapse collapse" id="navbar" style={{backgroundColor: "#0b82ff", width: "50%", float:"left"}}>
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <a className="navbar-brand" href="javascript:;"><img alt="Brand" src="../tC_apps/Autographa/assets/logo.png" /></a>
                    </div>                             
                            <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{float:"right"}}>
                                <ChapterModal  show ={ modalVisibility } onHide = { hideModal } chapters = { chapters } allProps = {this.props}/>
                                <SettingModal show ={ modalSettingsVisibility } onHide = { hideModal } />
                                <AboutUsModal show ={ modalAboutUsVisibility } onHide = { hideModal } allProps = {this.props}/>
                                <SearchAndReplace show ={ modalSearchVisibility } onHide = { hideModal } allProps = {this.props} versetext={verses('targetLanguage', targetLanguage)}/>
                                <span>
                                <Button className="btn btn-default" style={style.chapter} onClick = {showModal} id="chapterBtn" title="Select Chapter" disabled={this.state.diffDisable}>{projectDetailsReducer.manifest.project.name} {reference.chapter}</Button>
                                </span>
                              </div>
                    </div>
                    <div style={{backgroundColor: "#0b82ff", width: "50%", float:"left"}}>
                        <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                          <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>DIFF</span></li>
                          <li>
                              <Toggle onToggle={this.getDiffText} defaultToggled={false} style={style.toggle} thumbStyle={style.thumbOff} trackStyle={style.trackOff} thumbSwitchedStyle={style.thumbSwitched} trackSwitchedStyle={style.trackSwitched} labelStyle={style.labelStyle} />
                          </li>
                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} title="Find and replace" id="searchText" onClick = {showSearchReplaceModal} disabled={this.state.diffDisable}><Glyphicon glyph="search" />
                            </Button>


                            <Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}title="About" onClick = {showAboutModal} disabled={this.state.diffDisable}><Glyphicon glyph="info-sign" />
                            </Button>

                            {/*<Button style={linkStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick = {showSettingsModal} disabled={this.state.diffDisable}><Glyphicon glyph="wrench" />
                            </Button>*/}
                        </ul>
                    </div>
                </div>
            	</nav>
            	<div className="fontZoom" style={{width:"100%", marginBottom:"20px"}}>
                   {this.state.layoutDesign == 1 &&
                   <div>
                   <Col key={1}  lg={6} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                     {/*<h2>English ULB</h2>
                     <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                      <div style={{textAlign: "center", marginBottom:"20px"}}>
                      <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChange.bind(this)} value ={this.state.defaultRef}>
                          {dropdownOne}
                      </select>
                      </div>
                     <div className="refContent">
                     {this.state.defaultRef == "ulb" ?
                     verses(this.state.defaultRef, ulb):verses(this.state.defaultRef, udb)}
                     </div>
                     </Col>
                     <Col lg={6} style={{marginBottom:"34px"}}>
                      <h5 style={{textAlign: "center",textDecoration: "underline", fontWeight: "bold", marginBottom:"20px"}}>Translation</h5>
                      {/*<h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                      <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                      {this.state.show ? <div><span style={{color:"green", marginLeft:"30%",fontWeight:"bold"}}>{diffContent("target")[1]}:Additions &nbsp;</span><span style={{color:"red", fontWeight:"bold"}}>{diffContent()[2]}:Deletions</span><div id="targetContent">{diffContent()}</div></div>:
                      <div id ="targetContent">{verses('targetLanguage', targetLanguage)}</div>}
                    </Col>
                    </div>}

                  {this.state.layoutDesign == 2 &&
                  <div style={{}}>
                    <Col key={2} lg={4} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                       {/*<h2>English ULB</h2>
                       <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                        <div style={{textAlign: "center", marginBottom:"20px"}}>
                        <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChange.bind(this)} value ={this.state.defaultRef}>
                            {dropdownOne}
                        </select>
                        </div>
                       <div>
                       {this.state.defaultRef == "ulb" ?
                     verses(this.state.defaultRef, ulb):verses(this.state.defaultRef, udb)}
                       </div>
                    </Col>
                    <Col key={3} lg={4} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                       {/*<h2>English ULB</h2>
                       <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                        <div style={{textAlign: "center", marginBottom:"20px"}}>
                        <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChangeTwo.bind(this)} value ={this.state.defaultRefTwo}>
                            {dropdownOne}
                        </select>
                        </div>
                       <div>
                       {this.state.show ? (this.state.defaultRef == "ulb" ? diffContent("ulb") : diffContent("udb"))

                            : (this.state.defaultRefTwo == "ulb") ? verses(this.state.defaultRefTwo, ulb):verses(this.state.defaultRefTwo, udb)}
                       </div>
                    </Col>
                    <Col lg={4}>
                    <h5 style={{textAlign: "center",textDecoration: "underline", fontWeight: "bold", marginBottom:"20px"}}>Translation</h5>
                      {/*<h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                      <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                         {this.state.show ?<div id="targetContent">{diffContent("target")}</div>:
                      <div id ="targetContent"> {verses('targetLanguage', targetLanguage)}</div>}
                      </Col>
                  </div> }
                         {this.state.layoutDesign == 3 &&
                    <div>
                        <Col key={4} lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                           {/*<h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                            <div style={{textAlign: "center", marginBottom:"20px"}}>
                              <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChange.bind(this)} value ={this.state.defaultRef}>
                                  {dropdownOne}
                              </select>
                            </div>
                           <div>
                           {this.state.defaultRef == "ulb" ?
                            verses(this.state.defaultRef, ulb):verses(this.state.defaultRef, udb)}
                           </div>
                         </Col>
                         <Col key={5}  lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                           {/*<h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                            <div style={{textAlign: "center", marginBottom:"20px"}}>
                              <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChangeTwo.bind(this)} value ={this.state.defaultRefTwo}>
                                  {dropdownOne}
                              </select>
                            </div>
                           <div>
                           {this.state.show ? (this.state.defaultRef == "ulb" ? diffContent("1") : diffContent("1"))

                            : (this.state.defaultRefTwo == "ulb") ? verses(this.state.defaultRefTwo, ulb):verses(this.state.defaultRefTwo, udb)}
                           </div>
                         </Col>
                         <Col key={6}  lg={3} style={{backgroundColor: "#f5f8fa", borderRight: "1px solid #d3e0e9", padding: "0px 20px 60px"}}>
                            {/*<h2>English ULB</h2>
                           <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                            <div style={{textAlign: "center", marginBottom:"20px"}}>
                              <select style={style.dropdown} title="Select Reference Text" onChange={this.handleRefChangeThree.bind(this)} value ={this.state.defaultRefThree}>
                                  {dropdownOne}
                              </select>
                            </div>
                           <div>

                         {this.state.show ? (this.state.defaultRefThree == "ulb" ? diffContent("2") : diffContent("2"))

                            : (this.state.defaultRefThree == "ulb") ? verses(this.state.defaultRefThree, ulb):verses(this.state.defaultRefThree, udb)}
                           </div>
                         </Col>
                         <Col lg={3}>
                         <h5 style={{textAlign: "center",textDecoration: "underline", fontWeight: "bold", marginBottom:"20px"}}>Translation</h5>
                          {/*<h2>{projectDetailsReducer.manifest.target_language.name}</h2>
                          <h3>{projectDetailsReducer.bookName} {reference.chapter}:{reference.verse}</h3>*/}
                           {this.state.show ? <div id="targetContent">{diffContent("target")}</div>:
                            <div id ="targetContent"> {verses('targetLanguage', targetLanguage)}</div>}
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
                                <Slider sliderStyle={{ width: "100px", float:"left", marginTop:"10px"}}  onChange={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin}/>
                                {/*<input type="range" onInput={this.sliderFontChange.bind(this)}  onChange={this.sliderFontChange.bind(this)} value={this.state.currentFontValue} step={this.state.fontStep} max={this.state.fontMax} min={this.state.fontMin} />*/}
                                <div style={{float: "left"}}>
                                    <Button style={style.fontButtonPlus} disabled={this.state.diffDisable} className="btn btn-default font-button plus" title="Increase font size" onClick= {this.fontChange.bind(this, (+2))}>A+</Button>
                                </div>
                            </div>
                            <div style={{ float:"left", width:"50%"}} className="nav navbar-nav navbar-center verse-diff-on" >
                                <div className="btn-group navbar-btn layout" role="group" aria-label="...">
                                        <Button style={style.layoutButton} data-toggle="tooltip" className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,1)}  disabled={this.state.diffDisable} title="2-column layout">2x &nbsp;<img alt="Lyout 2x" style={style.svg} src="../tC_apps/Autographa/assets/two-columns-layout.svg" /></Button>
                                        <Button style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,2)} disabled={this.state.diffDisable} title="3-column layout">3x &nbsp;<img alt="Lyout 3x" style={style.svg} src="../tC_apps/Autographa/assets/two-columns-layout.svg" /></Button>
                                        <Button style={style.layoutButton} className="btn btn-primary btn-default" onClick = {this.handleChange.bind(this,3)}  disabled={this.state.diffDisable} title="4-column layout">4x &nbsp;<img alt="Lyout 4x" style={style.svg} src="../tC_apps/Autographa/assets/two-columns-layout.svg" /></Button>
                                </div>
                                <span style={{ color: "rgba(0, 0, 0, 0.5)", marginLeft: "188px",fontFamily: "Georgia,Serif", fontStyle:"italic"}}>{this.state.saveFunction ? this.state.finalTime:""}</span>
                                {/*<a  onClick={this.saveEditVerse.bind(this)} style={style.saveButton} id="save-btn" data-toggle="tooltip" data-placement="top" title="" className="btn btn-info btn-save navbar-btn" >Save</a>*/}
                            </div>
                      {/*</div>*/}
                </nav>
            </div>
        );
    }
}

module.exports = View;
