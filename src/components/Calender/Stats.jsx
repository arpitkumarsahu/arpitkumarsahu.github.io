import React from "react";
const Stats = () => {
  return (
    // streak
    <div
      style={{
        paddingTop: "50px",
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <div style={{ width: "auto", margin: "auto" }}>
        <a href="https://github.com/arpitkumarsahu">
          <img
            align="left"
            alt="arpit"
            src="https://github-readme-streak-stats.herokuapp.com/?user=arpitkumarsahu"
          />
        </a>
      </div>

      <div
        style={{
          width: "60%",
          height: "300px",
          display: "flex",
          margin: "auto",
          gap: "40px",
          padding: "50px",
        }}
      >
        <a href="https://github.com/arpitkumarsahu">
          <img
            align="center"
            alt="arpit"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=arpitkumarsahu" //launguages
          />
        </a>
        <a href="https://github.com/arpitkumarsahu">
          <img
            align="left"
            alt="arpit"
            src="https://github-readme-stats.vercel.app/api?username=arpitkumarsahu&count_private=true&show_icons=true" //stats
          />
        </a>
      </div>
    </div>
  );
};

export default Stats;
