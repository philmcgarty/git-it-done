var issueContainerEl = document.querySelector("#issues-container");

var displayIssues = function(issues){
    if (issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (i=0;i<issues.length;i++){
        // create link element to take users to issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // span to hold title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);

        // create type element
        var typeEl = document.createElement("span");

        // check if actual issue or pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}


var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // console.log(repo);
    fetch(apiUrl)
        .then(function(response){
            // success
            if (response.ok){
                response.json()
                .then(function(data){
                    console.log(data);
                    // pass response to dom function
                    displayIssues(data);
                });
            }
            else {
                alert("There was a problem with your request!");
            }
        });
};

getRepoIssues("philmcgarty/organizer");