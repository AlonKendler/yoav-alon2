# Real-Time Coding Collaboration Web Application

This is a web application designed for real-time coding collaboration between a mentor and a student. The application allows the mentor, to share code blocks with the student, and observe changes in real time. The application consists of two main pages: the Lobby page and the Code block page.

## Features

### Lobby Page

The Lobby page provides an overview of available code blocks for selection. There is no need for authentication on this page.

- **Title**: "Choose code block"
- **Code Blocks List**: The page displays a list of code blocks, each represented by a name (e.g., "Async case").
- **Code Block Selection**: Clicking on a code block name will take the user to the corresponding Code block page.

### Code Block Page

On the Code block page, two users can collaborate in real time, with one acting as the mentor (read-only mode) and the other as the student (code editing mode). The first user to access the page will be designated as the mentor.

- **Mentor Mode**: The mentor will see the selected code block in read-only mode.
- **Student Mode**: The student will see the selected code block and have the ability to make changes to the code.
- **Real-Time Collaboration**: Any code changes made by the student will be displayed in real-time using Socket.io.

## Implementation Details

- The application is built using React for the client-side and Node.js with Express for the server-side.
- Real-time communication between the mentor and student is achieved using Socket.io.
- The application supports JavaScript code only.
- Clear comments have been added to the code for easy understanding and maintenance.

## Deployment

Please note that the project is not currently deployed due to some limitations:

- **Vercel**: The client and server have been deployed to Vercel. However, Vercel does not support direct WebSocket connections between the server and client, which are necessary for real-time communication via Socket.io. As a result, real-time collaboration features may not work in the deployed version.

- **Railway.app**: An attempt was made to deploy the server on Railway.app as a potential solution. However, there were challenges with configuring Railway.app for WebSocket support, which led to deployment difficulties.

## Local Development

To use the application with full real-time functionality, it is recommended to run the project locally following the steps mentioned in the "Getting Started" section of this README.
## Getting Started

Follow these steps to run the application locally:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Russo3007/CodePracticeWebApp/
   ```

2. Navigate to the project directory.

   ```bash
   cd CodePracticeWebApp
   ```

3. Install dependencies for both the client and server.

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Start the server.

   ```bash
   cd server
   node index.js
   ```

5. Start the client.

   ```bash
   cd client
   npm start
   ```

6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Lobby page.

## Usage

1. Access the Lobby page to choose a code block.
2. Click on a code block to enter the Code block page.
3. The first user to access the Code block page will be the mentor and see the code block in read-only mode.
4. Any subsequent user accessing the same Code block page will be designated as the student and can edit the code.
5. Real-time changes made by the student will be visible to both the mentor and student.

## Contributors

- [Yoav Russo](https://github.com/your-github-profile) - Full Stack Developer

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
