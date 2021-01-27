var portName="youtubemusic",
lastPlaying=false,
lastTitle=""
refreshInfo=()=>{
	if(listening)
	{
		let playing=false,title=""	
		if(location.pathname=="/watch")
		{				
			if(document.querySelector(".html5-video-player")!=null)
			{
				playing=document.querySelector(".html5-video-player").classList.contains("playing-mode")
			}
			if(document.querySelector(".style-scope ytmusic-player-bar .title")!=null)
			{
				title=document.querySelector(".style-scope ytmusic-player-bar .title").textContent + "-" +  document.querySelector(".style-scope ytmusic-player-bar .subtitle").textContent.trim()
			}
			if(document.querySelector(".style-scope ytmusic-player-bar .image")!=null)
			{
				//TODO: Use the cover on activity
				cover=document.querySelector(".style-scope ytmusic-player-bar .image").src
			}
		}
		if(lastPlaying!=playing||lastTitle!=title)
		{
			lastPlaying=playing
			lastTitle=title
			if(playing)
			{
				data={
					dontSave:true,
					type:2,
					name:title,
					streamurl:"",
					details:chrome.i18n.getMessage("activitySource").replace("%","YouTube Music"),
					state:"youtu.be/"+location.search.substr(location.search.indexOf("v=")+2,11),
					partycur:"",
					partymax:""
				}
				chrome.runtime.sendMessage(data)
			}
			else
			{
				data=false
				chrome.runtime.sendMessage({action:"reset"})
			}
		}
	}
}
