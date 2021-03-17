const dateConverter = (timeStamp) => {
    let timeString = ''
    const timeParts = ['year', 'month', 'day', 'hour', 'minuet', 'seconde']
    const currentDate = new Date().toISOString().split(/-|T|:/)
    console.log(new Date().toISOString())
    timeStamp.toISOString().split(/-|T|:/).forEach((part, i) => {
        const convertedPart1 = parseInt(part)
        const convertedPart2 = parseInt(currentDate[i])
        console.log(convertedPart1)
        console.log(convertedPart2)
        if (convertedPart1 < convertedPart2 && !timeString) {
            const difference = convertedPart2 - convertedPart1
            timeString = ` ${difference} ${timeParts[i]} ago`
        } else if (i === 5 && convertedPart1 === convertedPart2) {
            timeString = '1 second ago'
        }
    })
    return timeString
}
module.exports = dateConverter