
/**
 * @description fetches all data that Autographa needs.
 * @param {object} props - props coming down from the core.
 * @return {*} returns a promise that handles multiple data fetching.
 */
export default function fetchAllData(props) {
  const projectDetails = props.projectDetailsReducer;
  const bibles = props.resourcesReducer.bibles;
  const actions = props.actions;
  const totalProgress = actions.progress;
  const groupsDataLoaded = props.groupsDataReducer.loadedFromFileSystem;
  const groupsIndexLoaded = props.groupsIndexReducer.loadedFromFileSystem;

  return new Promise(function(resolve, reject) {
    const { addNewBible, setModuleSettings, addGroupData, setGroupsIndex, setProjectDetail } = actions;
    let chapterNumbers = [1,2,3,4,5,6]; // Object.keys(bibles.targetLanguage);
    let groupsIndex = chapterNumbers.map( chapterNumber => {
      let id = 'ch'+ chapterNumber;
      let name = 'Chapter ' + chapterNumber;
      return { id: id, name: name };
    });
    setGroupsIndex(groupsIndex);
    groupsIndex.forEach( (group, index) => {
      let chapterNumber = index+1;
      let verseNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]; //Object.keys(bibles.targetLanguage[chapterNumber]);
      let groupData = verseNumbers.map( verseNumber => {
        return {
          contextId: {
            reference: {
              bookId: projectDetails.manifest.project.id,
              chapter: chapterNumber,
              verse: verseNumber
            },
            tool: 'Autographa',
            groupId: group.id
          }
        };
      });
      addGroupData(group.id, groupData);
    })
    resolve();
  });
}
