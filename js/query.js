const gitHub_tok = 'f7e7445b4e412917408b25a9b8b156f0325c54ee';

fetch('https://api.github.com/graphql', {
  method: "POST",
  headers: {
    Authorization: `bearer ${gitHub_tok}`
  },
  body: JSON.stringify({
    query:`
      query { 
        viewer{
          name
          bio
          twitterUsername
          avatarUrl
          email
          status{
            message
            emoji
          }
          repositories(first: 10, orderBy: {field:NAME, direction:ASC}){
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
`
  })
})
.then(res => {
  if(!res.ok){
    throw Error('Ooops something went wrong');
  }
  return res.json();
})
.then(data => {
  // console.log(data.data.viewer.repositories.nodes);

  const {name, twitterUsername, bio, avatarUrl} = data.data.viewer;

  document.getElementById('name').innerHTML = name;
  document.getElementById('twitter-username').innerHTML = twitterUsername;
  document.getElementById('bio').innerHTML = bio;
  let avatar = document.getElementById('avatar');
  avatar.setAttribute('src', avatarUrl);
  let thumbnail = document.getElementById('thumbnail');
  thumbnail.setAttribute('src', avatarUrl);

  const repos = data.data.viewer.repositories.nodes.map(repo => {

    let date = new Date(repo.updatedAt);

    return `
          <div class="repo-list">
            <div>
                <a href="${repo.url}">
                    <h2 class="heading pb-16">${repo.name}</h2>
                </a>
                <div>
                    <span class="small-text pr-12">
                        <i class="fa fa-circle fa fa-xs" style="color: ${repo.primaryLanguage.color}"></i> &nbsp;${repo.primaryLanguage.name}
                    </span>
                    <span class="small-text">Updated on ${date.getDate()} ${date.toLocaleString('en', {month:'short'})}</span>
                </div>
            </div>
            <span class="label">
                <i class="fa fa-star-o fa fa-xs"></i> &nbsp;Star
            </span>
          </div>
    `;
  }).join(' ');
  document.getElementById('repos').innerHTML = repos;
})
