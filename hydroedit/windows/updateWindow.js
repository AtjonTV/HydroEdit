const {remote, shell} = require('electron');

let version = remote.app.getVersion();

if(version == "1.7.9")
document.getElementById('version').innerText = "[Electron 1.7.9]";
else
document.getElementById('version').innerText = version;

let git_uri = "http://gitlab.atvg-studios.at/api/v4/projects/8/repository/tags";

function doUpdateCheck()
{
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open( "GET", aUrl, true );
            anHttpRequest.send( null );
        }
    }

    var client = new HttpClient();
        client.get(git_uri, function(response) {
            git_res = JSON.parse(response);
            tag_url = "http://gitlab.atvg-studios.at/root/HydroCode/tags/"+git_res[0]["name"];
            let new_version = git_res[0]["name"].replace("v","");
            if(new_version.includes("-alpha."))
                new_version = new_version.split('-alpha.')[1]
            ver_1 = parseInt(new_version.replaceAll(".",""));
            ver_2 = parseInt(version.replaceAll(".",""));
            console.log(ver_1,ver_2, version.replaceAll(".",""))
            if(ver_1 > ver_2)
            {
                document.getElementById('new_version').innerText = git_res[0]["name"].replace("v","").split('-alpha.')[0];
                document.getElementById('ver_inf').innerHTML = '<a>NEW VERSION!</a>';
                document.getElementById('ver_inf').addEventListener('click', function(){
                    shell.openExternal(git_res[0]["html_url"]);
                });
            }
            else
            {
                document.getElementById('new_version').innerText = git_res[0]["name"].replace("v","").split('-alpha.')[0];
            }
    });
}
doUpdateCheck();