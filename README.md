

# Pomodoro Timer

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.  
The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.

You will implement a Pomodoro timer that follows these steps (simplified from the original technique):

1.  Set the focus duration (default to 25 minutes, no less than 5 or more than 60).
2.  Set the break duration (default to 5 minutes, no less than 1 or more than 15).
3.  When the user clicks the "play" button, the timer starts.
4.  When the focus time expires, an alarm plays and then the break timer starts.
5.  When the break time expires, the alarm plays again and then the focus timer starts.

This application uses  [Bootstrap 4](https://getbootstrap.com/)  for styling and  [Open-Iconic icons](https://useiconic.com/open)  for icons.

This project is designed to test your ability to work with rendering and state management using React. Before taking on this module, you should be comfortable with the following:

-   Installing packages via NPM.
-   Running tests from the command line.
-   Writing React function components.
-   Using hooks like  `useState()`
-   Debugging React code through console output
- 
## Initial Screen
The initial screen lets the user set the length of the focus and break and break sessions.
![Initial Screen](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/06ddc6bb0f6b5add9db441447000e59c-o-initial-screen.png)

The "stop" button is disabled on the initial screen because the user has not yet started the timer.

When the user clicks the "play" button, the timer will always start a new focus session.
## Active Session Screen

After the user clicks the "play" button, the buttons to change the focus and break duration are disabled, and the session timer appears.
![Active Session Screen](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/517bceae35a5acf63fb3d20cb04733cf-ro-active-sesson.png)
The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.
## Paused Session Screen

If the user clicks the "pause" button, "paused" appears below the time remaining.
![Paused Session Screen](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/e179e707512486a110fbdb155a7897b4-o-paused-session.png)
The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.

## Stopping a session

Stopping a session returns the application to the initial screen and the user is able to change the focus and break duration.

Clicking the "play" button will always start a new focus session.
