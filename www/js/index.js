var sleepTimer = 0;

jQuery(function() {
		/*
		Initialisation
		*/
		//initialize score tickers
		jQuery('input.score').click(function(){
				//jQuery('#score_home').val(  jQuery('#score_home').val()+1 );
				var $target = jQuery('#' + jQuery(this).data('target') );
				var s =  $target.val();
				s=( isNaN(parseInt(s) ) )?0:parseInt(s); //get int val
				
				if( jQuery(this).data('direction') == 'less' ) //increment or decrement
				    {s--;}
				else
				    {s++;}
				if(s==10)alert('Really /(O_o)\\ ?');
				if(s==14)alert('At this point your opponent should rage quit...');
				if(s==16)alert('Ok, you are testing the system huh ?');
				s=(s>=0)?s:0;//minimum 0
				$target.val(s); // reaffect to field
		});
		
		//reload form datas
		resetBoard = true;
		if( resetBoard )
		{
		    jQuery('#board_id').val( retrieveCookie('boardbowl-boardid') );
		}
		else
		{
			recoverInputs(document.forms.main_board,retrieveCookie('boardbowl-form'),true);
		}
		
		//initialize datas
		jQuery('body').click(function(){
			sleepTimer = 0;
		    pushDatas();
		    
		});
		//push and launch auto push
		autoPushDatas();
		
});


function pushDatas()
{
    jQuery.ajax({
      type: "POST",
      url: "save.php",
      data: jQuery( "#main_board" ).serialize(),
      success: function(){ console.log('data sent'); }
    });
    
    //save form data in cookie
    setCookie('boardbowl-form',getFormString(document.forms.main_board,true));
    setCookie('boardbowl-boardid',jQuery('#board_id').val() );

}

function autoPushDatas()
{
	pushDatas();
	sleepTimer++;
	if(sleepTimer < 360 )//do not relaunch if no activity snce more than 1 hour
	{
		setTimeout(function(){autoPushDatas()},10000);
	}
}
