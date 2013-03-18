/**
 * @author tianyun
 */
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");
dojo.require("dojo.dnd.Moveable");
dojo.addOnLoad(function() {
	    // Use CSS3 PIE PHP wrapper
    dojo.alert.setup({});
    
    
	dojo.query(".button.code").connect("onclick", function(evt) {
		dojo.stopEvent(evt);
		var obja = evt.target;
	
		var target = obja.nextElementSibling;
		if(target.localName=="pre"&&(target.style.display==""||target.style.display=="none")) {
			target.style.display="block";
		} else{
            target.style.display="none";
		}
	});
	
	dojo.query(".button[href^='#demo-']").connect("onclick",function(evt){
		
		switch(dojo.attr(this, "href").split('-')[1]){
			    // Predefined types
                case 'info':
                    dojo.alert.open('info', 'Lorem ipsum dolor sit amet');
                    break;
                case 'confirm':
                    dojo.alert.open('confirm', 'Lorem ipsum dolor sit amet');
                    break;
                case 'warning':
                    dojo.alert.open('warning', 'Lorem ipsum dolor sit amet');
                    break;
                case 'error':
                    dojo.alert.open('error', 'Lorem ipsum dolor sit amet');
                    break;
                case 'prompt':
                    dojo.alert.open('prompt', 'Lorem ipsum dolor sit amet');
                    break;

                // Title
                case 'title':
                    dojo.alert.open('My title', 'Lorem ipsum dolor sit amet');
                    break;

                // Icon
                case 'no_icon':
                    dojo.alert.open({
                        icon: false,
                        content: 'Lorem ipsum dolor sit amet'
                    });
                    break;
                case 'custom_icon':
                    dojo.alert.open({
                        content: 'Lorem ipsum dolor sit amet',
                        icon: 'hand'
                    });
                    break;

                // Content
                case 'text':
                    dojo.alert.open('Lorem ipsum dolor sit amet');
                    break;
                case 'html':
                    dojo.alert.open('<b>Lorem</b> <i>ipsum</i> <u>dolor</u><br /><a href="#">sit amet</a> consectetur.');
                    break;

                // Width
                case 'width':
                    dojo.alert.open({
                        content: 'Lorem ipsum dolor sit amet',
                        width: 400
                    });
                    break;

                // Content alignment
                case 'alignment':
                    dojo.alert.open({
                        content: 'Lorem ipsum dolor sit amet',
                        width: 400,
                        align: 'right'
                    });
                    break;

                // Custom buttons
                case 'buttons':
                    dojo.alert.open('Lorem ipsum dolor sit amet', {
                        someId: 'Abc',
                        someOtherId: 'Def'
                    });
                    break;

                // Callback
                case 'callback':
                    dojo.alert.open(
                        'Lorem ipsum dolor sit amet',
                        {
                            A: 'A',
                            B: 'B',
                            C: 'C'
                        },
                        function(button) {
                            if (!button)
                                dojo.alert.open('Alert was canceled.');
                            else
                                dojo.alert.open('You pressed the "' + button + '" button.');
                        }
                    );
                    break;

                // Scrollbar
                case 'scrollbar':
                    dojo.alert.open('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas ligula ut nunc porttitor dictum. Pellentesque sit amet massa sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus lectus, facilisis luctus consectetur dictum, posuere a urna. Curabitur bibendum nisi sem. Nam at lectus at ipsum suscipit consectetur vel at ante. Mauris risus metus, commodo vel volutpat vitae, eleifend nec diam. Nullam tempor tortor ut mi porttitor adipiscing. Curabitur vitae diam sem, sed mattis odio. Pellentesque pretium interdum odio ac tristique. Nunc accumsan mauris et lorem adipiscing vel pulvinar lacus auctor. Fusce euismod, turpis quis elementum interdum, lacus risus porta dui, ac viverra diam augue eu mi. Praesent id lacus sem, eget dictum dui. In scelerisque euismod tellus a tincidunt. Sed sodales ullamcorper viverra. Praesent semper ipsum ac tellus euismod semper bibendum libero lobortis. Vivamus placerat auctor congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere mi vitae arcu aliquet pretium suscipit libero sollicitudin. Vivamus et ligula nisl. Fusce adipiscing porttitor lacus, et luctus dui ornare quis. Pellentesque luctus velit varius turpis egestas posuere. Phasellus et velit metus, at bibendum ante. Vivamus vel enim id est dapibus vestibulum. Nullam tincidunt risus non erat scelerisque cursus ac sed.');
                    break;

                // Localization
                case 'localization':
                    var backup = dojo.alert.setup();
                    dojo.alert.setup({
                        types: {
                            error: {
                                title: 'Fehler'
                            },
                            warning: {
                                title: 'Warnung'
                            },
                            confirm: {
                                title: 'Konfirmieren',
                                buttons: {
                                    yes: 'Ja',
                                    no: 'Nein'
                                }
                            }
                        }
                    });
                    dojo.alert.open('confirm', 'Lorem ipsum dolor sit amet', function() {
                        dojo.alert.setup(backup);
                    });
                    break;

                // Custom type
                case 'custom_type':
                    dojo.alert.setup({
                        types: {
                            tip: {
                                title: 'Tip',
                                icon: 'tip',
                                buttons: {
                                    cancel: 'Close'
                                }
                            }
                        }
                    });
                    dojo.alert.open('tip', 'Lorem ipsum dolor sit amet');
            };
            return false;
			
	});


  
});


