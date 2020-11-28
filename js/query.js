const options = {
  method: "POST",
  headers: {
    Authorization: `bearer ${atob(gitHub_token.token)}`,
  },
  body: JSON.stringify({
    query: `
    query{
      repositoryOwner(login: "abSarpong"){
        login
      }
      viewer{
              name
              bio
              avatarUrl
              email
              status{
                message
                emojiHTML
              }
              repositories(first: 10, privacy: PUBLIC, orderBy: {field:NAME, direction:ASC}){
                totalCount
                nodes{
                  name
                  updatedAt
                  url
                  primaryLanguage{
                    name
                    color
                  }
                }
              }
            }
    }
`,
  }),
};

const renderElement = (id, value) => {
  document.getElementById(id).innerHTML = value;
};

const renderImage = (id, value) => {
  let avatar = document.getElementById(id);
  avatar.setAttribute("src", value);
};

fetch("https://api.github.com/graphql", options)
  .then((res) => {
    if (!res.ok) {
      throw Error("Ooops something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    const { name, bio, avatarUrl } = data.data.viewer;
    const { login } = data.data.repositoryOwner;
    const { totalCount } = data.data.viewer.repositories;

    let portfolioInfo = {
      name: name,
      username: login,
      bio: bio,
      "total-count": totalCount + " results for public repositories",
    };

    let images = {
      avatar: avatarUrl,
      thumbnail: avatarUrl,
    };

    for (let key in portfolioInfo) {
      renderElement(key, portfolioInfo[key]);
    }

    for (let key in images) {
      renderImage(key, images[key]);
    }

    const repos = data.data.viewer.repositories.nodes
      .map((repo) => {
        let date = new Date(repo.updatedAt);
        return `
            <div class="repo-list">
              <div>
                  <a href="${repo.url}">
                      <h2 class="heading pb-16">${repo.name}</h2>
                  </a>
                  <div>
                      <span class="small-text pr-12">
                          <i class="fa fa-circle fa fa-xs" style="color: ${
                            repo.primaryLanguage.color
                          }"></i> &nbsp;${repo.primaryLanguage.name}
                      </span>
                      <span class="small-text">Updated on ${date.getDate()} ${date.toLocaleString(
          "en",
          { month: "short" }
        )}</span>
                  </div>
              </div>
              <span class="label">
                  <i class="fa fa-star-o fa fa-xs"></i> &nbsp;Star
              </span>
            </div>
      `;
      })
      .join(" ");
    document.getElementById("repos").innerHTML = repos;
  });
