$("#customInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#customSubmit").click();
    }
});

function hideButtons() {
	$("#logout").hide();
	$("#getPhotos").hide();
	$("#demo").hide();
	$("#demo2").hide();
	document.getElementById('flavortext').innerHTML = "Badge your profile photo or cover photo?";
	showPhotoOptions();
}

function showPhotoOptions() {
	document.getElementById("title").innerHTML = "Which Photo?";
	$("#coverSelect").show();
	$("#profileSelect").show();
}

function showSelect(type) {
	//$("#coverSelect").hide();
	//$("#profileSelect").show();
	//document.getElementById("title").innerHTML = "Choose one!";
	document.getElementsByTagName("img")[0].style.display = "none";
	if(type == 'cover') {
		findOptions('cover');
	} else {
		findOptions('profile');
	}
}

function findOptions(type) {
	document.getElementById("title").innerHTML = "Select a photo.";
	document.getElementById('flavortext').innerHTML = "From your cover or profile photos album.";
	$("#coverSelect").hide();
	$("#profileSelect").hide();
	$("#anothercover").hide();
	$("#anotherprof").hide();
	$("#yes").hide();
	//$("#yes").show();
	//document.getElementById("title").innerHTML = "Is This Correct?";
	if(type == "cover") {
		//$("#anothercover").show();
		window.profile2 = 0;
		getOptions("Cover Photos");
	} else {
		//$("#anotherprof").show();
		window.profile2 = 1;
		getOptions("Profile Pictures");
	}
}

function findImage(type, num) {
	document.getElementById('flavortext').innerHTML = "Pressing no will let you choose a different photo.";
	$("#coverSelect").hide();
	$("#profileSelect").hide();
	$("#yes").show();
	document.getElementById("title").innerHTML = "Is This Correct?";
	if(type == "cover") {
		$("#anothercover").show();
		window.profile2 = 0;
		getPhoto("Cover Photos");
	} else {
		$("#anotherprof").show();
		window.profile2 = 1;
		getPhoto("Profile Pictures");
	}
}

function pickTags(url) {
	window.badgeURL = url;
	window.badgeURL = encodeURIComponent(window.badgeURL);
	var gridDiv = document.getElementsByClassName("topWrapper");
	document.getElementById("title").innerHTML = "Pick Your Tags";
	document.getElementById('flavortext').innerHTML = "Select three tags you care about or enter your own!";
	for(var i = 0; i < gridDiv.length; i++) {
		gridDiv[i].style.display = "none";
	}
	$("#anothercover").hide();
	$("#anotherprof").hide();
	$("#yes").hide();
	$(".tag").show();
	var tagCategories = document.getElementsByClassName('hashCategory');
	for(var j = 0; j < tagCategories.length; j++) {
		tagCategories[j].style.display = "inline-block";
	}
}

function pickTagsSingle() {
	var url = document.getElementsByTagName('img')[0].src;
	window.badgeURL = url;
	window.badgeURL = encodeURIComponent(window.badgeURL);
	document.getElementsByTagName('img')[0].style.display="none";
	document.getElementById("title").innerHTML = "Pick Your Tags!";
	document.getElementById('flavortext').innerHTML = "Support the causes that matter most to you.";
	$("#anothercover").hide();
	$("#anotherprof").hide();
	$("#yes").hide();
	$(".tag").show();
	var tagCategories = document.getElementsByClassName('hashCategory');
	for(var j = 0; j < tagCategories.length; j++) {
		tagCategories[j].style.display = "inline-block";
	}
}

function viewTag(id) {
	var tagButtons = document.getElementsByClassName('hashCategory');
	for(var i = 0; i < tagButtons.length; i++) {
		tagButtons[i].style.display="none";
	}
	var hashTags = document.getElementsByClassName(id);
	for(var j = 0; j < hashTags.length; j++) {
		hashTags[j].style.display = "inline-block";
	}
	document.getElementById('backButton').style.display = "block";
	document.getElementById('submitButton').style.display = "block";
}

function backCategory() {
	var tagButtons = document.getElementsByClassName('hashCategory');
	for(var i = 0; i < tagButtons.length; i++) {
		tagButtons[i].style.display = "inline-block";
	}
	var categories = ["trending", "social", "politics", "sports", "entertainment", "custom"];
	for(var k =0; k < categories.length; k++) {
		var hashTags = document.getElementsByClassName(categories[k]);
		for(var j = 0; j < hashTags.length; j++) {
			hashTags[j].style.display = "none";
		}
	}
	document.getElementById('backButton').style.display = "none";
	document.getElementById('submitButton').style.display = "none";
}

window.tagCounter = 0;

function toggleTag(tag) {
	var categories = ["trending", "social", "politics", "sports", "entertainment", "custom"];
	for(var k =0; k < categories.length; k++) {
		var hashTags = document.getElementsByClassName(categories[k]);
		for(var j = 0; j < hashTags.length; j++) {
			if(hashTags[j].innerHTML == tag) {
				if(hashTags[j].style.border == "" && window.tagCounter < 3) {
					hashTags[j].style.border = "3px solid #222222";
					window.tagCounter += 1;
				} else if (hashTags[j].style.border != "") {
					hashTags[j].style.border = "";
					window.tagCounter -= 1;
				} else {
					hashTags[j].style.border = "";
					//$(hashTags[j]).addClass("shake");
					//swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });
				}
			}
		}
	}
}

function submitCustom() {
	var customText = document.getElementById('customInput').value;
	if(customText === "") {
		return null;
	} else if(customText.indexOf('#') === -1) {
		customText = "#" + customText;
	} 
	var container = document.getElementsByClassName('customAdder')[0];
	var tag = document.createElement('div');
	container.appendChild(tag);
	tag.className = tag.className + "custom";
	tag.innerHTML = customText;
	tag.style.backgroundColor = "#2c3e50";
	tag.addEventListener("click", function() {	
		toggleTag(customText);
	});
	viewTag('custom');
}