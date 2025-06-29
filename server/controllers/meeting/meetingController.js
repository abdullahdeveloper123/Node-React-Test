// Import core dependancies
const { ensureDataFile, saveMeetings, getMeetings } = require('../../services/dataStore');

/**
 * For this test scenario, the data size is expected to be small.
 * Storing meetings in a JSON file is acceptable for now.
 * In production, this would be replaced by a proper database 
 * with indexing, pagination, and optimized query handling.
 */

/**
 * Create a new meeting and save it to ./data/meetings.json
 */
const createMeeting = (req, res) => {
    const { title, date } = req.body;

    // Data validation check
    if (!title || !date) {
        return res.status(400).json({ message: "Invalid data received" });
    }

    // Check if Directory and file ./data/meetings.json exists, if not make it
    ensureDataFile()

    // check last object's ID in allMeetings array and add up 1 to make new object's ID
    const meetings = getMeetings()
    const id = meetings.length > 0 ? meetings[meetings.length - 1].id + 1 : 0;
    const meetingData = { id, title, date };

    // Add new meeting to array and save updated data back to file
    meetings.push(meetingData)
    saveMeetings(meetings)

    return res.status(200).json({ message: "Meeting saved successfully", meeting: meetingData });
};


/**
 * Retrieve and return all meetings
 */
const readMeetings = (req, res) => {

    const allMeetings = getMeetings()

    // Check if any meetings exist
    if (allMeetings.length === 0) {
        return res.status(200).send({ message: "No meetings found" });
    }

    return res.status(200).json(allMeetings);
}



/**
 * Retrieve a single meeting by ID
 */
const readMeetingByID = (req, res) => {

    const id = req.params.id;
    const allMeetings = getMeetings()

    // Check if allMeetings is not empty
    if (allMeetings.length === 0) {
        return res.status(404).send({ message: "No Meetings Found" })
    }

    // finds specific object with ID
    const meeting = allMeetings.find(arr => arr.id === parseInt(id))
    if (!meeting) {
        return res.status(200).send({ message: "Requested Meeting Not Found" })
    }

    return res.status(200).json(meeting)
}

/**
 * Update a meeting by ID
 */
const updateMeeting = (req, res) => {
    const id = req.params.id
    const allMeetings = getMeetings()

    const { title, date } = req.body;

    if (!title && !date) {
        return res.status(400).json({ message: "At least one value is needed to update." });
    }

    // Check if allMeetings is not empty
    if (allMeetings.length === 0) {
        return res.status(200).json({ message: "No Meeting Found!" })
    }

    // Getting requested meeting with ID
    const meeting = allMeetings.find(arr => arr.id === parseInt(id))
    if (!meeting) {
        return res.status(404).json({ message: "Requested Meeting not Found!" })
    }


    // Updating retrived object
    meeting['title'] = title || meeting.title,
    meeting['date'] = date || meeting.date

    // Saving the updated object in file
    saveMeetings(allMeetings)

    return res.status(200).json({ message: "Successfully Updated Meeting" })

}


/**
 * Delete a meeting by ID
 */
const deleteMeeting = (req, res) => {

    const allMeetings = getMeetings()

    // Check if allMeetings is not empty
    if (allMeetings.length === 0) {
        return res.status(404).json({ message: "No Meeting Found!" })
    }

    // Getting Request ID from url and Finding Index of object with same ID in array
    const id = parseInt(req.params.id)
    const meetingIndex = allMeetings.findIndex(arr => arr.id === parseInt(id))

    // Break function if requested meeting is not found
    if (meetingIndex === -1) {
        return res.status(404).json({ message: "Requested Meeting not Found!" })
    }

    // Splice requested object from array and write updated array in file 
    allMeetings.splice(meetingIndex, 1)
    saveMeetings(allMeetings)

    return res.status(200).json({ message: "Meeting Has Been Deleted" })

}




module.exports = { createMeeting, readMeetings, readMeetingByID, updateMeeting, deleteMeeting }