const dateConverter = (timeStamp) => {
    let timeString = ''
    const timeParts = ['year', 'month', 'day', 'hour', 'minute', 'second']
    const currentDate = new Date().toISOString().split(/-|T|:/)
    timeStamp.toISOString().split(/-|T|:/).forEach((part, i) => {
        const convertedPart1 = parseInt(part)
        const convertedPart2 = parseInt(currentDate[i])

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