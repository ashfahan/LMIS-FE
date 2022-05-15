const objectArraySearch = (searchText, data, propertyToLookFor) => {
  let searchedText = searchText.toLowerCase()
  let filteredData = data

  if (searchedText) {
    filteredData = data.filter((eachEntryInData) =>
      eachEntryInData[propertyToLookFor].toLowerCase().includes(searchedText),
    )
  }
  return filteredData
}
export default objectArraySearch
