var style = {
  pane: {
    contentLTR: {
      overflowY: 'auto',
      direction: 'ltr',
      flex: 'auto',
      padding: '0 15px 10px',
    },
    contentRTL: {
      overflowY: 'auto',
      direction: 'rtl',
      flex: 'auto',
      padding: '0 15px 10px',
    },
    title: {
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: "-5px",
    },
    subtitle:{
      color: "var(--text-color-light)",
      fontStyle: 'bold',
      fontFamily: "noto sans"
    },
  },
  scripturePane: {
    flex: '1 0 180px',
    margin: '10px',
    boxShadow: '0 3px 10px var(--background-color)',
    borderRadius: '2px',
  },
  titleBar: {
    flex: '0 0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: 'var(--reverse-color)',
    backgroundColor: 'var(--accent-color-dark)',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  body: {
    flex: '1 1 140px',
    display: 'flex'
  },
  firstBible: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherBible: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1px solid var(--border-color)',
  },
  firstPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid var(--reverse-color)',
  },
  otherPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid var(--border-color)',
  },
  verseTitle: {
    flex: '0 0 35px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px 5px 15px'
  }, 
  button: {
    color: "#fff",
    backgroundImage: "linear-gradient(to bottom,#0b82ff 0,#0b82ff 100%)",
    borderColor: "#0b82ff",
    fontSize: "25px",
    paddingTop: "10px",
    marginRight: "10px",
    marginLeft: "20px"
  },
  chapter: {
       color: "#0b82ff",
       fontWeight: "bold",
       backgroundColor: "#fff",
       marginLeft: "210px"
  },
   hover: {
    color: "#fff",
    backgroundImage: "linear-gradient(to bottom,#0b82ff 0,#0b82ff 100%)",
    borderColor: "#0b82ff",
    fontSize: "25px",
    paddingTop: "10px",
    marginRight: "10px",
    marginLeft: "20px"
  },
    versenum: {
      paddingTop: "1px",
      fontWeight: "bold",
      fontSize: "12px"
    },
  toggle: {
      marginTop: "15px"
    },
    thumbOff: {
      backgroundColor: '#03a9f4',
    },
    trackOff: {
      backgroundColor: '#03a9f4',
    },
    thumbSwitched: {
      backgroundColor: '#fff',
    },
    trackSwitched: {
      backgroundColor: '#295482',
    },
    chapmodal: {
      marginTop: "10px",
      color: "#0b63bf",
      fontSize: "inherit", 
      width: "42px", 
      display: "inline-block", 
      backgroundColor: "#f5f5f5",
      textAlign: "center",
    },
    layoutButton: {
      backgroundImage: "linear-gradient(to bottom,#0b82ff 0,#0b82ff 100%)",
    },
    sliderHorizontal: {
      width: "50px",
    },
    fontButtonMinus: {
        backgroundImage: "linear-gradient(to bottom,#fbfbfb 0,#fbfbfb 100%)",
        WebkitBoxShadow: "none",
        border: "none", 
        fontWeight: "bold", 
        color: "#0b82ff", 
        fontSize: "15px"
    },
     fontButtonPlus: {
        backgroundImage: "linear-gradient(to bottom,#fbfbfb 0,#fbfbfb 100%)",
        WebkitBoxShadow: "none",
        border: "none", 
        fontWeight: "bold", 
        color: "#0b82ff", 
        fontSize: "20px"
    },
      dropdown: {
          backgroundColor: "#0b82ff",
          color: "#ffffff",
          fontWeight: "bold",
          width: "130px",
          borderRadius: "6px",
          height: "30px",
          paddingLeft: "9px",
     },
     saveButton: {
          color: "#fff",
          fontWeight: "600",
          backgroundImage: "linear-gradient(rgba(11, 130, 255, 1) 0px, rgba(11, 130, 255, 1) 100%)",
          borderColor: "#204d74",
          float: "right",
          marginRight: "50px",
        },
     imagecss: {
          marginLeft: "88px",
          border: "5px solid #0b82ff",  
      },
    }

module.exports = style;
