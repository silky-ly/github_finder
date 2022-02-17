$(document).ready(function () {
    $('#search-user').on('keyup', function (e) {
        let username = e.target.value;

        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'bb8d373dd8303067dbdc',
                client_secret: '465d7bed3860b6b1ad63cf9424bc9d0c7f4b459e'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'bb8d373dd8303067dbdc',
                    client_secret: '465d7bed3860b6b1ad63cf9424bc9d0c7f4b459e',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                // console.log(repos)
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <div class='output'>
                            <div class='row'>
                                <div class='col col-a'>
                                    <strong>${repo.name}</strong> ${repo.description}
                                </div>

                                <div class='col col-b'>
                                    <span class='label'><strong>Forks:</strong> ${repo.forks_count}</span>
                                    <span class='label'><strong>Watchers:</strong> ${repo.watchers}</span>
                                    <span class='label'><strong>Stars:</strong> ${repo.stargazers_count}</span>
                                </div>

                                <div class='col col-c'>
                                    <a target='_blank' href='${repo.html_url}' class='repos-btn'>Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `)
                })
            });
            $('#profile-result').html(`
                <div class='card-panel'>
                    <div class='card-heading'>
                        <div class='card-title'>${user.name}</div>
                    </div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-1'>
                                <img src='${user.avatar_url}' class='avatar' />
                                <a target='_blank' href='${user.html_url}' class='btn'>View profile</a>
                            </div>
                            <div class='col-2'>
                                <div class='flex'>
                                    <span class='label-1'>Public Repos: ${user.public_repos}</span>
                                    <span class='label-2'>Public Gists: ${user.public_gists}</span>
                                    <span class='label-3'>Followers: ${user.followers}</span>
                                    <span class='label-4'>Following: ${user.following}</span>
                                </div>
                                <br><br>
                                <ul class='list-group'>
                                    <li class='list-item'><strong>Company:</strong> ${user.company}</li>
                                    <li class='list-item'><strong>Website/Blog:</strong> ${user.blog}</li>
                                    <li class='list-item'><strong>Location:</strong> ${user.location}</li>
                                    <li class='list-item'><strong>Member:</strong> ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class='page-header'>Latest Repos</h3>
                <div id='repos'></div>
            `)
        });
    })
});