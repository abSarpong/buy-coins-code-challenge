// provide github generated token here
// const gitHub_token = 'f0c6c5ee629950da446a9c375cfcf2403084e2c9';

const options = {
  method: "POST",
  headers: {
    // Authorization: `bearer ${gitHub_token}`
    authorization: "token f0c6c5ee629950da446a9c375cfcf2403084e2c9",
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
`
  })
}

fetch('https://api.github.com/graphql', options)
.then(res => {
  if(!res.ok){
    throw Error('Ooops something went wrong');
  }
  return res.json();
})
.then(data => {

  if(!data){
    console.log('loading')
  }

  const {name, twitterUsername, bio, avatarUrl} = data.data.viewer;
  const {totalCount} = data.data.viewer.repositories;

  document.getElementById('name').innerHTML = name;
  document.getElementById('twitter-username').innerHTML = twitterUsername;
  document.getElementById('bio').innerHTML = bio;

  let avatar = document.getElementById('avatar');
  avatar.setAttribute('src', avatarUrl);

  let thumbnail = document.getElementById('thumbnail');
  thumbnail.setAttribute('src', avatarUrl);

  document.getElementById('total-count').innerHTML = totalCount + " results for public repositories";
  
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
