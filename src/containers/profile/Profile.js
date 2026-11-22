import React, {useState, useEffect, lazy,useContext, Suspense} from "react";
import ApolloClient, {gql} from "apollo-boost";
import {openSource} from "../../portfolio";
import Contact from "../contact/Contact";
import Loading from "../loading/Loading";
import StyleContext from "../../contexts/StyleContext";

const renderLoader = () => <Loading />;
const GithubProfileCard = lazy(() =>
  import("../../components/githubProfileCard/GithubProfileCard")
);



const GithubRepoCard = lazy(() =>
import("../../components/githubRepoCard/GithubRepoCard")
);
export default function Profile() {
  const [prof, setrepo] = useState([]);
  const {isDark} = useContext(StyleContext);
  function setProfileFunction(array) {
    setrepo(array);
  }
  function getProfileData() {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${openSource.githubConvertedToken}`
          }
        });
      }
    });

    client
      .query({
        query: gql`
      {
        user(login:"${openSource.githubUserName}") { 
          name
          bio
          isHireable
          avatarUrl
          location
        }
    }
      `
      })
      .then(result => {
        setProfileFunction(result.data.user);
      })
      .catch(function (error) {
        console.log(error);
        setProfileFunction("Error");
        console.log(
          "Because of this Error Contact Section is Showed instead of Profile"
        );
        openSource.showGithubProfile = "false";
      });
  }
  // Without a GitHub token the GraphQL call can only fail, so go straight to Contact.
  const canShowProfile =
    Boolean(openSource.githubConvertedToken) && openSource.showGithubProfile === "true";
  useEffect(() => {
    if (canShowProfile) {
      getProfileData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (
    openSource.display &&
    canShowProfile &&
    !(typeof prof === "string" || prof instanceof String)
  ) {
    return (
      <Suspense fallback={renderLoader()}>
        <GithubProfileCard prof={prof} key={prof.id} />
        {/* <GithubRepoCard repo={prof} isDark={isDark}/> */}
      </Suspense>
    );
  } else {
    return <Contact />;
  }
}
