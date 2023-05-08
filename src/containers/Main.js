import React, {Component} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import GithubProfileCard from "../components/githubProfileCard/GithubProfileCard";

import Footer from "../components/footer/Footer";

import Education from "./education/Education";
import Top from "./topbutton/Top";

import {StyleProvider} from "../contexts/StyleContext";
import "./Main.css";
import Profile from "./profile/Profile";
import Calendar from "../components/Calender/Calendar";
import Stats from "../components/Calender/Stats";
import GithubCalendar from "../components/Calender/GithubCalendar";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("isDark") === null) {
      const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
      localStorage.setItem("isDark", darkPref.matches);
    }
    this.setState({isDark: JSON.parse(localStorage.getItem("isDark"))});
  }
  changeTheme = () => {
    this.setState({isDark: !this.state.isDark}, () => {
      localStorage.setItem("isDark", this.state.isDark);
    });
  };

  render() {
    return (
      <div className={this.state.isDark ? "dark-mode" : null}>
        <StyleProvider
          value={{isDark: this.state.isDark, changeTheme: this.changeTheme}}
        >
          <Header />
          <Greeting />
          <Skills />
          {/* <StackProgress /> */}
          <Education />
          <WorkExperience />
          <Projects />
          <StartupProject />
          {/* <Calendar/> */}
          <GithubCalendar/>
          <Stats/>
          <Achievement />
          <Profile />
          <Footer />
          <Top />
        </StyleProvider>
      </div>
    );
  }
}
