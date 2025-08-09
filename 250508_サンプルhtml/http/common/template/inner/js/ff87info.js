function ClickSpreload(){
    window.location.reload(true);
}
var userAgent = window.navigator.userAgent.toLowerCase();
if(userAgent.indexOf('firefox') != -1) {
    elem = document.getElementById('ff87info');
    elem.style.display = 'block';
} else {
}