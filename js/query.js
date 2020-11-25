const gitHub_tok = '95f312e052631077ff7e556dfab85db36ad0a272';

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
.then(res => res.json())
.then(data => {
  console.log(data.data.viewer.repositories.nodes);

  const {name, twitterUsername, bio, avatarUrl} = data.data.viewer;

  document.getElementById('name').innerHTML = name;
  document.getElementById('twitter-username').innerHTML = twitterUsername;
  document.getElementById('bio').innerHTML = bio;
  let avatar = document.getElementById('avatar');
  avatar.setAttribute('src', avatarUrl);
  let thumbnail = document.getElementById('thumbnail');
  thumbnail.setAttribute('src', avatarUrl);

  let repos = data.data.viewer.repositories.nodes;
  
  repos.map(repo => {
    console.log(repo.primaryLanguage.name)
  })

  // let repos = data.data.viewer.repositories.nodes.map(repo => {

  //   return `
  //         <div class="repo-list">
  //           <div>
  //               <a href="${repo.url}">
  //                   <h2 class="pb-16">${repo.name}</h2>
  //               </a>
  //               <div>
  //                   <span class="small-text pr-12">
  //                       <i class="fa fa-circle fa fa-xs"></i> &nbsp;HTML
  //                   </span>
  //                   <span class="small-text">Updated on ${repo.updatedAt}</span>
  //               </div>
  //           </div>
  //           <span class="label">
  //               <i class="fa fa-star-o fa fa-xs"></i> &nbsp;Star
  //           </span>
  //         </div>
  //   `;
  // }).join(' ');
  // document.getElementById('repos').innerHTML = repos;
})