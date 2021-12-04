import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles.css";

export default function TransitionControl(props) {
  return (
    <>
      <div className="main">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={props.switch}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="button-container">
              {props.switch===true?props.outBoundSeatMap:props.inBoundSeatMap}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
