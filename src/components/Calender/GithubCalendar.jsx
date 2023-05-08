import React from "react";
import GitHubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";
import "./stats.css";

function GithubCalendar() {
  return (
    <div className="githubcalander_ap" >
      <GitHubCalendar
        style={{ margin: "auto" }}
        username="arpitkumarsahu"
        // transformData={selectLastHalfYear}
        blockSize={20}
        fontSize={20}
      >
        <ReactTooltip delayShow={20} html />
      </GitHubCalendar>
    </div>
  );
}

export default GithubCalendar;
