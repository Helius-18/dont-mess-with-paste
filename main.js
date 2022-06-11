let url;
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  document.getElementById("title").innerHTML+='<p>'+url+'</p>';
});

document.getElementById("paste-btn").addEventListener("click",function () {
  var code=document.getElementById("code-area").value;
  if (code) {
    save(code);
    document.getElementById("code-area").value="";
  }
});

function save(code) {
  var http = new XMLHttpRequest();
  var send = new XMLHttpRequest();
  var purl = url.replace(".php",".json.php");
  http.open("GET",purl+"&action=load",true);
  http.send()
  send.onreadystatechange = function() {//Call a function when the state changes.
    if(send.readyState == 4 && send.status == 200) {
      document.getElementById("root").innerHTML='<div class="alert alert-success" role="alert">Paste successful! Reload the page without saving.</div>';  
    }
  }
  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      json=JSON.parse(http.response)
      json.response.files[1].contents=code;
      send.open("POST",purl+"&action=save",true);
      send.send(JSON.stringify({"files":json.response.files}));
    }
  }
  // alert(json);
  // alert("hai")
  //Send the proper header information along with the request
  // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // http.open("POST",purl+"&action=save",true);
  // xhr.send(JSON.stringify(json));
  // http.send(JSON.stringify(json));

}