import React from "react";
import "./stats.css";
const Stats = () => {
  return (
    // streak
    <div className="streak_ap">
      <div className="image_ap">
        <a href="https://github.com/arpitkumarsahu">
          <img
            align="left"
            alt="arpit"
            src="https://github-readme-streak-stats.herokuapp.com/?user=arpitkumarsahu"
          />
        </a>
      </div>

      <div className="github_ap">
        <div className="image_ap">
          <a href="https://github.com/arpitkumarsahu">
            <img
              align="center"
              alt="arpit"
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=arpitkumarsahu" //launguages
            />
          </a>
        </div>
        <div className="image_ap">
          <a href="https://github.com/arpitkumarsahu">
            <img
              align="left"
              alt="arpit"
              src="https://github-readme-stats.vercel.app/api?username=arpitkumarsahu&count_private=true&show_icons=true" //stats
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stats;
