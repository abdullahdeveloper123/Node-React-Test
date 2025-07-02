import React from "react";
import "../../assets/main.css";

export default function Toast({ message, onClose }) {
  return (
    <div className="custom-toast">
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}
