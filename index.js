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
    main.innerHTML =cardHTML;

}

function addReposToCard(repos)
{
    const repos1 = document.getElementById("repos");
    repos
        .sort((a,b) => b.stargazers_count - a.stargazers_count)
        .slice(0,10)
        //The slice() method returns a shallow copy of a 
        //portion of an array into a new array object selected from
        // start to end (end not included) where start and 
        //end represent the index of items in that array.
        // The original array will not be modified.

        .forEach((repo) => {
            const repos1 = document.createElement("a");
            repos1.classList.add("repo");
            repos1.href = repo.html_url;
            repos1.target = "_blank";
            repos1.innerText = repo.name;
            repos1.appendChild(repos1);

        });


}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});