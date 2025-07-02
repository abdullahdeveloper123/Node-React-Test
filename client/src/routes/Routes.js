import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import AllMeetingsView from "../view/meetings/AllMeetingsView";
import CreateMeetingView from "../view/meetings/CreateMeetingView";
import UpdateMeetingView from '../view/meetings/updateMeetingView'
import LoginPage from '../view/auth/LoginPage'
import ProtectedRoute from "./ProtectedRoute";

function MeetingRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AllMeetingsView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-meeting"
          element={
            <ProtectedRoute>
              <CreateMeetingView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-meeting/:id"
          element={
            <ProtectedRoute>
              <UpdateMeetingView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MeetingRoutes;
