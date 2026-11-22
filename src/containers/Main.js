import React, {Component} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import AppShowcase from "./appShowcase/AppShowcase";
import Skills from "./skills/Skills";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Footer from "../components/footer/Footer";
import Education from "./education/Education";
import Top from "./topbutton/Top";
import Profile from "./profile/Profile";
import PointerEffects from "../components/pointerEffects/PointerEffects";
import TabBar from "../components/tabBar/TabBar";

import {StyleProvider} from "../contexts/StyleContext";
import "./Main.css";

function readStoredTheme() {
  try {
    const stored = localStorage.getItem("isDark");
    // The site is designed dark-first, so dark is the default for new visitors.
    return stored === null ? true : JSON.parse(stored);
  } catch (e) {
    return true;
  }
}

function applyTheme(isDark) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#0a0a0b" : "#fafaf9");
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {isDark: readStoredTheme()};
  }

  componentDidMount() {
    applyTheme(this.state.isDark);
  }

  changeTheme = () => {
    this.setState(
      prev => ({isDark: !prev.isDark}),
      () => {
        applyTheme(this.state.isDark);
        try {
          localStorage.setItem("isDark", this.state.isDark);
        } catch (e) {
          // Storage can be unavailable (private mode); the toggle still works for this visit.
        }
      }
    );
  };

  render() {
    return (
      <StyleProvider value={{isDark: this.state.isDark, changeTheme: this.changeTheme}}>
        <div className="site">
          <Header />
          <main>
            <Greeting />
            <AppShowcase />
            <Skills />
            <Education />
            <WorkExperience />
            <Projects />
            <StartupProject />
            <Achievement />
            <Profile />
          </main>
          <Footer />
          <Top />
          <TabBar />
          <PointerEffects />
        </div>
      </StyleProvider>
    );
  }
}
