# Real-Time Messaging App

A real-time messaging application built using **Node.js**, **Express**, and **Socket.IO** for the backend, and **React** for the frontend. This app allows users to join chat rooms, send and receive messages instantly, and interact with others in real time.

## Features

- **Room Management**: Users can create and join rooms, and the list of available rooms is updated dynamically.
- **Real-Time Messaging**: Messages are broadcast to all users within the same room as soon as they are sent.
- **User Notifications**: When a user joins or leaves a room, all other users in the room are notified.
- **Available Rooms Display**: The frontend shows a list of available chat rooms, updating in real time.

## Technologies Used

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React
- **Real-Time Communication**: WebSockets (Socket.IO)
- **State Management**: React hooks (`useState`, `useEffect`)

## Usage

- On the frontend, users can enter their name and the room they want to join.
- They will be added to the room and can start chatting immediately.
- All messages sent in the room will be broadcast to other users in real-time.
