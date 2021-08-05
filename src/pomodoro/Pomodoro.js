import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import BreakDuration from "./BreakDuration";
import FocusDuration from "./FocusDuration";
import Captions from "./Captions";
import Timer from "./Timer";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  // console.log(focusDuration)
  const [breakDuration, setBreakDuration] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [aria, setAria] = useState(0);
  const [breakLeft, setBreakLeft] = useState(0);


 // ToDo: Allow the user to adjust the focus and break duration.
 //Default starting focusDuration = 25. Function to increase and decrease focusDuration by 5
 //Default starting breakDuration = 5. Function to increase and decrease breakDuration by 1
 

function increaseFocusDuration () {                             //If focusDuration is less than 60 minutes, increase focusDuration by 5
  if(focusDuration < 60) {
    setFocusDuration(focusDuration + 5);                    //setFocusDuration function, accepts focusDuration state and increments by 5
  }
}
function decreaseFocusDuration () {                           //If focusDuration is greater than 5 minutes, decrease focusDuration by 5
  if(focusDuration > 5) {
    setFocusDuration(focusDuration - 5);                  //setFocusDuration function, accepts focusDuration state and decrements by 5
  }
}
function increaseBreakDuration () {                        //If breakDuration is less than 15 minutes, increase breakDuration by 1
  if(breakDuration < 15) {
    setBreakDuration(breakDuration + 1);                  //setBreakDuration function, accepts breakDuration state and increments by 1
  }
}
function decreaseBreakDuration () {                      //If breakDuration is greater than 1 minute, decrease breakDuration by 1
  if(breakDuration > 1) {
    setBreakDuration(breakDuration - 1);                  //setBreakDuration function, accepts breakDuration state and decrements by 1
  }
}
function stopButtonHandler () {                         //When Stop Button is clicked, will reset everything to default.
  setSession(null);                                     // setSession to null, make setIsTimerRunning false, and setElapsedTime to 0. 
  setIsTimerRunning(false);
  setElapsedTime(0);
}

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
    setBreakLeft(breakLeft + 1)                             //setBreakLeft function, accepts breakLeft state and increments by 1
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);                               //given, this is the progress bar
      const timeLeft = session.timeRemaining                  //capturing the time remaining in the session in a variable called 'left'
      if(session.label === "Focusing") {                  //if the label of the session is deeply equal to "Focusing", then we setAria to 
        setAria(100*(focusDuration * 60 - timeLeft)/(focusDuration*60))
      }
      else {                                              //Else, then we setAria to 
        setAria(100*(breakDuration * 60 - timeLeft)/(breakDuration*60))
      }
    },
    isTimerRunning ? 1000 : null                          //If isTimerRunning true, then return 1000 so timer runs at normal speed (1 tick per second), else return null       
  );

  useInterval(()=> {                                      //useInterval function again. If a session is running and there is time remaining, then increment elapsedTime by 1.
    if(session && session.timeRemaining) {
      return setElapsedTime(elapsedTime + 1)
    }
   }, 1000)

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

//   console.log(session)
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          {/* embedding FocusDuration component.  */}
          <FocusDuration
          focusDuration={focusDuration}
          increaseFocusDuration={increaseFocusDuration}
          isTimerRunning={isTimerRunning}
          decreaseFocusDuration={decreaseFocusDuration}
          />
        </div>
        <div className="col">
          <div className="float-right">
            {/* embedding FocusDuration component.  */}
            <BreakDuration
            breakDuration={breakDuration}
            increaseBreakDuration={increaseBreakDuration}
            isTimerRunning={isTimerRunning}
            decreaseBreakDuration={decreaseBreakDuration}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* embedding Timer component.  */}
          <Timer
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            stopButtonHandler={stopButtonHandler}
          />
        </div>
      </div>
      {/* embedding FocusDuration component.  */}
        <Captions 
          aria={aria}
          breakDuration={breakDuration}
          focusDuration={focusDuration}
          session={session}
          isTimerRunning={isTimerRunning}
        />  
    </div>
  );
}

export default Pomodoro;





// return (
//   <div className="pomodoro">
//     <div className="row">
//       <div className="col">

// ------ FOCUSDURATION COMPONENT -------
//         <div className="input-group input-group-lg mb-2">
//           <span className="input-group-text" data-testid="duration-focus">
//             {/* TODO: Update this text to display the current focus session duration */}
//             Focus Duration: 25:00
//           </span>
//           <div className="input-group-append">
//             {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-testid="decrease-focus"
//             >
//               <span className="oi oi-minus" />
//             </button>
//             {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-testid="increase-focus"
//             >
//               <span className="oi oi-plus" />
//             </button>
//           </div>
//         </div>



//       </div>
//       <div className="col">
//         <div className="float-right">

// ----- BREAKDURATION COMPONENT -------
//           <div className="input-group input-group-lg mb-2">
//             <span className="input-group-text" data-testid="duration-break">
//               {/* TODO: Update this text to display the current break session duration */}
//               Break Duration: 05:00
//             </span>
//             <div className="input-group-append">
//               {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-testid="decrease-break"
//               >
//                 <span className="oi oi-minus" />
//               </button>
//               {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-testid="increase-break"
//               >
//                 <span className="oi oi-plus" />
//               </button>
//             </div>
//           </div>


//         </div>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col">

// --------------TIMER COMPONENT ---------------------------
//        <div
//           className="btn-group btn-group-lg mb-2"
//           role="group"
//           aria-label="Timer controls"
//         >
//           <button
//             type="button"
//             className="btn btn-primary"
//             data-testid="play-pause"
//             title="Start or pause timer"
//             onClick={playPause}
//           >
//             <span
//               className={classNames({
//                 oi: true,
//                 "oi-media-play": !isTimerRunning,
//                 "oi-media-pause": isTimerRunning,
//               })}
//             />
//           </button>
//           {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
//           {/* TODO: Disable the stop button when there is no active session */}
//           <button
//             type="button"
//             className="btn btn-secondary"
//             data-testid="stop"
//             title="Stop the session"
//           >
//             <span className="oi oi-media-stop" />
//           </button>
//         </div>
//       </div>
//     </div>

// --------- CAPTIONS COMPONENT ---------------------
//     <div>
//       {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
//       <div className="row mb-2">
//         <div className="col">
//           {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
//           <h2 data-testid="session-title">
//             {session?.label} for 25:00 minutes
//           </h2>
//           {/* TODO: Update message below correctly format the time remaining in the current session */}
//           <p className="lead" data-testid="session-sub-title">
//             {session?.timeRemaining} remaining
//           </p>
//         </div>
//       </div>
//       <div className="row mb-2">
//         <div className="col">
//           <div className="progress" style={{ height: "20px" }}>
//             <div
//               className="progress-bar"
//               role="progressbar"
//               aria-valuemin="0"
//               aria-valuemax="100"
//               aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
//               style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
//             />
//           </div>
//         </div>
//       </div>
//     </div>


//   </div>
// );
