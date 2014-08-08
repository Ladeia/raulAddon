// Addon para consultar o status do raul e exibir um ícone diferenciado para cada.


var buttons = require('sdk/ui/button/action');
var Request = require("sdk/request").Request;
var tmr = require('sdk/timers');

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "iniciando",
  icon: {
	"16": "./icon16.png",
	"32": "./icon32.png",
	"64": "./icon64.png"
  },
  onClick: handleClick
});

function getStatus(){	
		var status = Request
		({
	  		url: "http://www.raulhc.cc/bin/tem-gente?type=json",
		  	onComplete: function (response) 
			{
				console.log(response.text);
				foo = JSON.parse(response.text); 
			
				if((foo.numPess > 0)&&(foo.fechaEm != null))
				{
					button.state("window", 
					{
		  				label: "O Raul HC encontra-se aberto :-)",
						icon:
						{
							"16": "./icon16verde.png",
							"32": "./icon32verde.png",
							"64": "./icon64verde.png"
						}
					});
		  		}
				else
				{	
					button.state("window", 
					{
		  				label: "O Raul HC encontra-se fechado :-(",
						icon:
						{
							"16": "./icon16.png",
							"32": "./icon32.png",
							"64": "./icon64.png"
						}
					});
				}
			}
		}).get();}
function handleClick() 
{
	getStatus();
	tmr.setInterval(
		getStatus,120000);
}

handleClick();
