






const timeConverter = (unixCode) => {
    /*const date = new Date(unixCode*1000);
    const days = date.getDay
    const hours = date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();

    const formattedTime = date + ' ' + hours + ':' + mins.substr(-2) + ':' + secs.substr(-2);
    console.log(formattedTime)
    return formattedTime */

    const dateTime = new Date(unixCode);
    /*console.log(
    ("0" + dateTime.getDate()).slice(-2) + '-' +
    ("0" + (dateTime.getMonth()+1)).slice(-2) + '-' + 
    dateTime.getFullYear() + ' ' +
    dateTime.getHours() + ':' +
    dateTime.getMinutes() */
    console.log(dateTime)

        
      
}


timeConverter(1542284514171)

module.exports = timeConverter;