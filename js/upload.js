
sessionStorage.active = 0;
var feedback = function(res) {
	console.log(res)
    if (res.success === true) {
    	var dem = sessionStorage.getItem("active");
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
		//url = document.getElementById("urlImg").value+""+get_link+"\n";
		//document.getElementById("urlImg").value = url;
		document.getElementById("icon-picture-o-"+dem+"").style.display = "none";
		document.getElementById("icon-check-square-o-"+dem+"").style.display = "block";
		document.getElementById("link"+dem+"").value = get_link;
		document.getElementById("loading"+dem+"").style.display = "none";
		document.getElementById("link"+dem+"").style.display = "block";
		sessionStorage.active = Number(sessionStorage.active)+1;
		console.log(dem);

		GenerateCartoonFace(res.data.link);

    }
};

new Imgur({
    clientid: 'ca75e9957047e0d', //You can change this ClientID
    callback: feedback
});

async function GenerateCartoonFace(imagePath){
	const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '84a6aa8c9fmshe0a661a151ee6d8p17c966jsnf4f1f85635dd',
            'X-RapidAPI-Host': '3d-cartoon-face.p.rapidapi.com'
        },
        body: `{"image":"${imagePath}","render_mode":"3d","output_mode":"url"}`
    };
    
    const resp = await fetch('https://3d-cartoon-face.p.rapidapi.com/run', options)
        .then(response => response.json())
        .then(response => {
			if (response.msg){
				strHTML= `<h2 class="output-error" style="color:red">Error: ${response.msg}</h2>`
				$('#solution-container').html(strHTML);
			}
			else{
				console.log(response)
				strHTML = `<h3>Result</h3>`;
				strHTML+= `<img src="${response.output_url}" class="inline_image_full" alt="Data."/>`
				$('#solution-container').html(strHTML);
			}
			

        })
        .catch(err =>{
			console.error(err);	
		})
}
