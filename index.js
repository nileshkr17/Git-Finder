const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("nileshkr17");

async function getUser(username)
{
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);


}
async function getElementById(username)
{
    const resp = await fetch(APIURL + username + "/repos");
    const resphData = await resp.json();
     
    addReposToCard(respData);

}
function createUserCard(user)
{
    const cardHTML = 
    `<div class = "card">
    <div>
        <img class="avatar" src ="${user.avatar_url}" alt="${user.name}"
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
    </div>
</div>
`;
    
}