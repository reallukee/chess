function generateUsername()
{
    var username = document.getElementById('username');

    var temp = "";

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 10; i++)
    {
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    username.value = temp;
}
        
function copyId()
{
    var id = document.getElementById('id');

    navigator.clipboard.writeText(id.value);
}



function createGame()
{
    var usernameControl = document.getElementById('username');
    var idControl = document.getElementById('id');

    let url = 'https://classe5ID.altervista.org/games/partita/chess_' + usernameControl.value;
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };

    fetch(url, { headers : auth, method : "POST" })
        .then(response => response.json())
        .then(result => {
            idControl.value = result.data.id;

            getGames();
        })
        .catch(error => alert(error))
}

function joinGame()
{
    var usernameControl = document.getElementById('username');
    var idControl = document.getElementById('id');

    let url = 'https://classe5ID.altervista.org/games/join/' + id.value + '/' + username.value;
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };
                
    fetch(url, { headers : auth, method : "POST" })
        .then(response => response.json())
        .then(result => {
            if (result != null)
            {
                window.location.href = 'play.html?id=' + idControl.value + '&username=' + usernameControl.value;
            }
        })
        .catch(error => alert(error))
}



function getGames()
{
    let url = 'https://classe5ID.altervista.org/games/partita';
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };

    fetch(url, { headers : auth })
        .then(response => response.json())
        .then(result => {
            var gamesControls = document.getElementById('games');

            gamesControls.innerHTML = "";

            for (var i = 0; i < result.data.length; i++)
            {
                if (result.data[i].PLAYER1.startsWith("chess_"))
                {
                    gamesControls.innerHTML =
                        '<li class="list-group-item"' +
                        ' data-id=' + result.data[i].ID +
                        ' data-username=' + result.data[i].PLAYER1.replace("chess_", "") +
                        ' onClick="selectGame(this)">' +
                        result.data[i].ID + ' ' + result.data[i].PLAYER1.replace("chess_", "") +
                        '</li>' + gamesControls.innerHTML;
                }
            }

            if (gamesControls.innerHTML == "")
            {
                gamesControls.innerHTML +=
                    '<li class="list-group-item">' +
                    '<div class="alert alert-danger mt-3">' +
                    'Nessuna Partita Disponibile! Crea una Nuova Partita!' +
                    '</div>' +
                    '</li>';
            }
        })
        .catch(error => alert(error))
}



function selectGame(control)
{
    var idControl = document.getElementById('id');

    idControl.value = control.dataset.id;
}



function getMoves()
{
    var movesControl = document.getElementById('moves');
            
    let url = 'https://classe5ID.altervista.org/games/mosse/' + id;
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };
            
    fetch(url, { headers : auth })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            
            movesControl.innerHTML = "";
            
            for (var i = 0; i < result.data.moves.length; i++)
            {
                if (result.data.moves[i])
                {
                    movesControl.innerHTML +=
                        '<li class="list-group-item">' +
                        result.data.moves[i].MOSSA + ' ' + result.data.moves[i].PLAYER +
                        '</li>';
                }
            }

            if (movesControl.innerHTML == "")
            {
                movesControl.innerHTML +=
                    '<li class="list-group-item"' +
                    '<div class="alert alert-danger mt-3">' +
                    'Nessuna Mossa Disponibile!' +
                    '</div>' +
                    '</li>';
            }
        })
        .catch(error => alert(error))
}
                    
function getLastMove()
{
    var lastMoveControl = document.getElementById('lastMove');
            
    let url = 'https://classe5ID.altervista.org/games/mossa/' + id;
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };
            
    fetch(url, { headers : auth })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            
            lastMoveControl.innerHTML =
                '<li class="list-group-item"' +
                ' data-id=' + '' + 
                ' data-username=' + '' +
                ' onClick="">' +
                result.data.play.MOSSA + ' ' + result.data.play.PLAYER +
                '</li>';

            result.data.play.MOSSA.replaceAll('_', '/');
        })
        .catch(error => console.log(error))
}

function update()
{
    let url = 'https://classe5ID.altervista.org/games/mossa/' + id;
    var auth = { "Authorization" : `Basic ${btoa("4ID:Grena")}` };
            
    fetch(url, { headers : auth })
        .then(response => response.json())
        .then(result => {
            console.log(result);

            return result.data.play.MOSSA.replaceAll('_', '/');
        })
        .catch(error => console.log(error))
}
