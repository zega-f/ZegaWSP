const ApiKey = "1d2f686e5d2f4d1b950b398602151960";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const player = document.querySelector('#player-list');
const competition = document.querySelector('#comp-list');

const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#!" class="secondary-content" data-teamid="${team.id}"><i class="material-icons" data-teamid="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            player.innerHTML = '';
            competition.innerHTML = '';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick=(event)=>{
                    showTeamDetail(event.target.dataset.teamid);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
            player.innerHTML = '';
            competition.innerHTML = '';
        }).catch(err => {
            console.error(err);
        })
}

function showTeamDetail(teamid){
    let url = baseUrl+"teams/"+teamid;
    fetch(url, fetchHeader).then(response => response.json()).then(data => {
        let team_detail = "";
        let team_player = "";
        let team_comp = "";

        team_detail +=`
        <div class="col xl6">
            <img src="${data.crestUrl}" alt="" class="circle detail-thumb">
        </div>
        <div class="col xl6"> 
            <p style="font-size:20px;">
            Berdiri : ${data.founded} <br>
            Markas : ${data.venue} <br>
            Alamat : ${data.address} <br>
            Phone : ${data.phone} <br>
            Tahun berdiri : ${data.founded} <br>
            Website : ${data.Website}
            </p>
        </div>
        `;

        data.squad.forEach(player => {
            team_player+=`
            <tr>
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.nationality}</td>
              </tr>
            `;
        });

        data.activeCompetitions.forEach(comp => {
            team_comp += `
                <li class="collection-item">
                    <p>
                        Nama Liga : ${comp.name} <br>
                        Plan : ${comp.tier}
                    </p>
                </li>
            `
        });


        title.innerHTML = `${data.name}`;
        contents.innerHTML = '<ul class="collection">' + team_detail + '</ul>';
        competition.innerHTML = '<h4>Active Competitions</h4><ul class="collection">' + team_comp + '</ul>';
        player.innerHTML = '<h4>Squad</h4><table id="myTable"><thead><tr><th>Nama</th><th>Posisi</th><th>Kewarganegaraan</th></tr></thead><tbody>' + team_player + '</tbody></table>'
    }).catch(err => {
        console.error(err);
    });
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
            player.innerHTML = '';
            competition.innerHTML = '';
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});