const booking = document.getElementById("submit");
booking.addEventListener('click', function (event){
    const signature = document.getElementById("signature");
    signature.innerHTML = '<h2>Signature</h2><canvas id="canvas"></canvas><p><span id="bt-clear">Recommencer</span></p>';
    var mySignature = new Signature();
    mySignature.evenements();
    event.preventDefault();
});