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
  book: {
       borderBottomRightRadius: "0",
       borderTopRightRadius: "0",
       color: "#0b82ff",
       fontWeight: "bold",
       backgroundColor: "#fff"
  },
  chapter: {
       borderBottomLeftRadius: "0",
       borderTopLeftRadius: "0",
       color: "#0b82ff",
       fontWeight: "bold",
       backgroundColor: "#fff"
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
      fontWeight: "bold"
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
    }
};

module.exports = style;
