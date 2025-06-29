const {createMeeting, readMeetings,readMeetingByID, updateMeeting, deleteMeeting} = require('./meetingController')
const express = require('express')
const route = express.Router()
const {AuthenticateUser} = require('../../middlewares/authMiddleware')

route.post('/addMeeting', AuthenticateUser, createMeeting)
route.get('/Meetings', AuthenticateUser, readMeetings)
route.get('/Meeting/:id', AuthenticateUser, readMeetingByID)
route.post('/updateMeeting/:id', AuthenticateUser, updateMeeting)
route.delete('/deleteMeeting/:id', AuthenticateUser, deleteMeeting)






module.exports = route





 









