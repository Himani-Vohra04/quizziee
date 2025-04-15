This is an interactive quiz system developed using HTML, CSS, and JavaScript. It has two main roles: Teacher and Student.

For Teachers, the system provides a simple login interface where they can enter a password (the default password is admin123) to access the teacher panel. Once logged in, teachers can create multiple-choice questions (MCQs) and assign them to specific topics such as Coding, Aptitude, or Soft Skills. Teachers input the question, provide four possible options, and select the correct answer. All data is saved to localStorage, so questions remain available even after refreshing the page.

For Students, the system requires them to enter a valid email address before attempting any quiz. They can choose a topic (Coding, Aptitude, or Soft Skills) and begin answering the questions created by the teacher. Each quiz is presented with a simple, user-friendly layout and includes text-to-speech functionality to read out the questions, making it more engaging and accessible. After completing the quiz, students are shown their scorecard, displaying the number of correct answers and the total number of questions attempted. This feature allows students to track their progress.

The system features a smooth and visually appealing UI with animations and transitions, creating a pleasant user experience. All the data, including quiz questions and student scores, is stored in the browser’s localStorage, so there is no need for a backend database.

Key Features:
Teacher login with a password (admin123).

Teacher panel to create and save MCQs.

Student login with email to attempt quizzes.

Interactive, audio-enabled quiz experience.

Scorecard displaying performance after quiz completion.

Fully front-end-based, using HTML, CSS, and JavaScript.
